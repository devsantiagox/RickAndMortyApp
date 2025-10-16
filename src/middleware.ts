import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/jwt';

// Rutas que requieren autenticación
const protectedRoutes = ['/profile', '/favorites', '/dashboard'];

// Rutas de autenticación (no accesibles si ya estás autenticado)
const authRoutes = ['/auth'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Obtener token de las cookies o del header
  const token = request.cookies.get('token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');

  // Verificar si la ruta está protegida
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // Si es una ruta protegida y no hay token válido
  if (isProtectedRoute) {
    if (!token) {
      // Redirigir a login
      const url = new URL('/auth', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }

    // Verificar que el token sea válido
    const decoded = verifyToken(token);
    if (!decoded) {
      // Token inválido, redirigir a login
      const url = new URL('/auth', request.url);
      url.searchParams.set('redirect', pathname);
      const response = NextResponse.redirect(url);
      response.cookies.delete('token');
      return response;
    }
  }

  // Si es una ruta de autenticación y el usuario ya está autenticado
  if (isAuthRoute && token) {
    const decoded = verifyToken(token);
    if (decoded) {
      // Usuario autenticado, redirigir al inicio
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// Configurar qué rutas usar el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (svg, png, jpg, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

