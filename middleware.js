// middleware.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request) {
  const authCookie = request.cookies.get('auth')?.value;
  const user = authCookie ? JSON.parse(authCookie) : null;
  const pathname = request.nextUrl.pathname;

  if (!user && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (user?.rol !== 'ADMIN' && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|.*\\..*).*)'],
};