import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

function isPublicRoute(path: string) {
  const publicRoutes = ['/sign-in', '/sign-up'];
  return publicRoutes.some(route => path.startsWith(route));
}

function isApiRoute(path: string) {
  const apiRoutes = ['/api/translate', '/api/translate-image', '/api/translate-document'];
  return apiRoutes.some(route => path.startsWith(route));
}

export default authMiddleware({
  publicRoutes: ['/sign-in', '/sign-up'],
  afterAuth(auth, req) {
    if (isApiRoute(req.nextUrl.pathname)) {
      return NextResponse.next();
    }

    if (!isPublicRoute(req.nextUrl.pathname)) {
      if (!auth.userId) {
        const signInUrl = new URL('https://app.notas.ai/sign-in', req.url);
        signInUrl.searchParams.set('redirect_url', req.url);
        return NextResponse.redirect(signInUrl);
      }
    }
  },
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)',
    '/',
    '/(api|trpc)(.*)',
    '/api/translate/:path*',
    '/api/translate-image/:path*',
    '/api/translate-document/:path*',
  ],
};