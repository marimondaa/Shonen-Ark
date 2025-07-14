import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  if (url.pathname.startsWith('/account/creator')) {
    const session = request.cookies.get('next-auth.session-token')
    const accountType = request.cookies.get('shonen-account-type')
    if (!session || accountType !== 'creator') {
      url.pathname = '/account/onboarding'
      return NextResponse.redirect(url)
    }
  }
  return NextResponse.next()
}
