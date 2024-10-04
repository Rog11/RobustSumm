import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
  const currentUrl = req.nextUrl.pathname;

  // Allow access to the maintenance page and API routes
  if (isMaintenanceMode && currentUrl !== '/maintenance' && !currentUrl.startsWith('/api')) {
    return NextResponse.redirect(new URL('/maintenance', req.url));
  }

  return NextResponse.next(); // Allow access to other pages if not in maintenance mode
}

// Apply middleware to all routes
export const config = {
  matcher: '/:path*',
};
