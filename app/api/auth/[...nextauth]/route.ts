import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import type { AuthOptions } from 'next-auth'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'

const usersFile = path.join(process.cwd(), 'data', 'users.json')

async function readUsers() {
  try {
    const raw = await fs.promises.readFile(usersFile, 'utf-8')
    return JSON.parse(raw || '[]')
  } catch (e) {
    return []
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials) return null
        const email = (credentials.email || '').toLowerCase()
        const password = credentials.password || ''

        const users = await readUsers()
        const user = users.find((u: any) => u.email === email)
        if (!user) return null

        const ok = await bcrypt.compare(password, user.passwordHash)
        if (!ok) return null

        // include role if present
        return { id: user.id, name: user.name || email.split('@')[0], email, role: user.role || 'customer' }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // attach role from authorize to token
        // @ts-ignore
        token.role = (user as any).role || token.role
      }
      return token
    },
    async session({ session, token }) {
      // @ts-ignore
      if (token?.role) session.user = { ...(session.user || {}), role: token.role }
      return session
    }
  },
  session: { strategy: 'jwt' as const },
  pages: {
    signIn: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET || 'dev-secret'
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
