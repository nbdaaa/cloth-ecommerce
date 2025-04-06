import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export { auth as middleware } from "@/auth"

// Optionally, you can configure middleware to only run on specific paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 