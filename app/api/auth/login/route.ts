import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = (body.email || '').toLowerCase()

  // Configure admin emails from environment variable ADMIN_EMAILS (comma-separated)
  // e.g. ADMIN_EMAILS=admin1@example.com,admin2@example.com
  const rawAdmins = process.env.ADMIN_EMAILS || ''
  const adminEmails = rawAdmins.split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
  const defaultAdmins = ['logesh@example.com','logesh2@example.com']
    const effectiveAdmins = adminEmails.length ? adminEmails : defaultAdmins
    const isAdmin = effectiveAdmins.includes(email)

    // Debug logging to server console to help trace during development
    // (remove for production)
    try {
      console.log('[auth/login] effectiveAdmins=', effectiveAdmins)
      console.log('[auth/login] login email=', email, 'isAdmin=', isAdmin)
    } catch (e) {
      // ignore
    }

    const user = {
      name: email.split('@')[0] || 'User',
      email,
      role: isAdmin ? 'admin' : 'customer',
    }

    const res = NextResponse.json({ ok: true, user })
    // Set a server-readable cookie containing the user JSON (mock session)
    res.cookies.set('session', JSON.stringify(user), {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return res
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'invalid request' }, { status: 400 })
  }
}
