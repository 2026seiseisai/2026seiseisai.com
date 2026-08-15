import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Keep the published top page, News pages, and destination page reachable.
  if (
    pathname === '/' ||
    pathname === '/news' ||
    pathname.startsWith('/news/') ||
    pathname === '/404dummy'
  ) {
    return NextResponse.next();
  }

  // Skip framework internals and direct file requests.
  if (pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  if (/\.[^/]+$/.test(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/404dummy', request.url));
}

export const config = {
  matcher: '/:path*',
};
