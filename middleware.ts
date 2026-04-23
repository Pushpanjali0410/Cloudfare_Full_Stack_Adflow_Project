import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard', '/api/campaigns', '/api/platforms', '/api/analytics', '/api/ai', '/api/ab-testing', '/api/auth/update-profile'];
const publicRoutes = ['/login', '/register', '/', '/testing'];
const authRoutes = ['/api/auth/register', '/api/auth/login'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const pathname = request.nextUrl.pathname;

  // Allow auth endpoints without token
  if (authRoutes.some(route => pathname === route)) {
    return NextResponse.next();
  }

  // Check if it's a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route));

  // If trying to access protected route without token, redirect to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If logged in and trying to access auth pages, redirect to dashboard
  if ((pathname === '/login' || pathname === '/register') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
