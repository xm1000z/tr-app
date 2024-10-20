import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs';

// Función para verificar si la ruta es pública
function isPublicRoute(path: string) {
  const publicRoutes = ['/sign-in', '/sign-up', '/api/public'];
  return publicRoutes.some(route => path.startsWith(route));
}

export function middleware(req: NextRequest) {
  if (!isPublicRoute(req.nextUrl.pathname)) {
    const { userId } = auth();
    if (!userId) {
      const signInUrl = new URL('https://app.notas.ai/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

