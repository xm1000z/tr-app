import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)']);
const isApiRoute = createRouteMatcher(['/api/chat(.*)', '/api/search(.*)', '/api/app(.*)']);

export default clerkMiddleware((auth, req) => {
  if (isApiRoute(req)) {
    // Permite que las rutas API se procesen sin interferencia del middleware de Clerk
    return NextResponse.next();
  }

  if (!isPublicRoute(req)) {
    const { userId } = auth();
    if (!userId) {
      const signInUrl = new URL('https://app.notas.ai/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)',
    '/',
    '/(api|trpc)(.*)', // Esto manejará las rutas /api/ y /trpc/
    // Asegúrate de que las rutas de API específicas también estén incluidas
    '/api/:path*',
  ],
};
