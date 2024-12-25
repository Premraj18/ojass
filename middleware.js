import { NextResponse } from 'next/server';

export function middleware(request) {
  // Add a custom header for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-is-admin-route', 'true');

    // Check for dashboard access
    if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
      const adminToken = request.cookies.get('adminToken');
      if (!adminToken) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*'
}; 