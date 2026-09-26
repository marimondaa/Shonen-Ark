import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Keep unfinished historical integrations from accepting writes or reporting fake success.
// Their source remains available for integration work; the MVP has one API boundary.
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path.startsWith('/api/community/') || path === '/api/catalog' || path === '/api/schedule' || path === '/api/health') return NextResponse.next();
  return NextResponse.json({ error: 'This legacy integration is not available in the MVP. Use the current community API.', code: 'INTEGRATION_UNAVAILABLE' }, { status: 503 });
}
export const config = { matcher: ['/api/:path*'] };
