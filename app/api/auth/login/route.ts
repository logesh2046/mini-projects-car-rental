import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

const usersFile = path.join(process.cwd(), 'data', 'users.json')

async function readUsers() {
  try {
    const raw = await fs.promises.readFile(usersFile, 'utf-8')
    return JSON.parse(raw || '[]')
  } catch (e) {
    return []
  }
}

async function writeUsers(users: any[]) {
  await fs.promises.writeFile(usersFile, JSON.stringify(users, null, 2), 'utf-8')
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = (body.email || '').toLowerCase()
    const password = body.password || ''

    if (!email || !password) {
      return NextResponse.json({ ok: false, error: 'email and password required' }, { status: 400 })
    }

    const users = await readUsers()
    const found = users.find((u: any) => u.email === email)

    if (!found) {
      return NextResponse.json({ ok: false, error: 'user not found' }, { status: 401 })
    }

    const match = await bcrypt.compare(password, found.passwordHash)
    if (!match) return NextResponse.json({ ok: false, error: 'invalid credentials' }, { status: 401 })

    const rawAdmins = process.env.ADMIN_EMAILS || ''
    const adminEmails = rawAdmins.split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
    const defaultAdmins = ['logesh@example.com','logesh2@example.com']
    const effectiveAdmins = adminEmails.length ? adminEmails : defaultAdmins
    const isAdmin = effectiveAdmins.includes(email)

    const user = { name: found.name || email.split('@')[0], email, role: isAdmin ? 'admin' : 'customer' }

    const res = NextResponse.json({ ok: true, user })
    res.cookies.set('session', JSON.stringify(user), { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7 })
    return res
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'invalid request' }, { status: 400 })
  }
}
