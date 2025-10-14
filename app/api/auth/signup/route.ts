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
  const name = body.name || email.split('@')[0]
  const role = (body.userType || body.role || 'customer')

  if (!email || !password) return NextResponse.json({ ok: false, error: 'email and password required' }, { status: 400 })

  // Strong password policy server-side (same as client):
  // - first character uppercase, at least one lowercase, one digit, one symbol, min length 8
  if (password.length < 8) return NextResponse.json({ ok: false, error: 'Password must be at least 8 characters' }, { status: 400 })
  if (!/^[A-Z]/.test(password)) return NextResponse.json({ ok: false, error: 'Password must start with an uppercase letter' }, { status: 400 })
  if (!/[a-z]/.test(password)) return NextResponse.json({ ok: false, error: 'Password must contain a lowercase letter' }, { status: 400 })
  if (!/[0-9]/.test(password)) return NextResponse.json({ ok: false, error: 'Password must contain a digit' }, { status: 400 })
  if (!/[^A-Za-z0-9]/.test(password)) return NextResponse.json({ ok: false, error: 'Password must contain a special character' }, { status: 400 })

    const users = await readUsers()
    const existing = users.find((u: any) => u.email === email)
    if (existing) return NextResponse.json({ ok: false, error: 'user already exists' }, { status: 409 })

    const passwordHash = await bcrypt.hash(password, 10)
  const user = { id: Date.now().toString(), email, name, passwordHash, role }
    users.push(user)
    await writeUsers(users)

  return NextResponse.json({ ok: true, user: { email, name, role } }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'invalid request' }, { status: 400 })
  }
}
