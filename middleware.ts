import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, verifyAdminSession } from 'lib/admin-auth';
import { USER_COOKIE_NAME, verifyUserSession } from 'lib/user-auth';

export const config = {
  matcher: ['/admin/:path*']
};

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  const secret = process.env.ADMIN_SESSION_SECRET;

  const adminToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const hasAdminSession = secret ? await verifyAdminSession(adminToken, secret) : false;

  if (hasAdminSession) {
    return NextResponse.next();
  }

  const userToken = request.cookies.get(USER_COOKIE_NAME)?.value;
  const userSession = secret ? await verifyUserSession(userToken, secret) : null;

  if (userSession?.role === 'ADMIN') {
    return NextResponse.next();
  }

  if (userSession?.role === 'SELLER') {
    if (request.nextUrl.pathname.startsWith('/admin/products')) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/admin/products', request.url));
  }

  const loginUrl = new URL('/admin/login', request.url);
  loginUrl.searchParams.set('from', request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}
