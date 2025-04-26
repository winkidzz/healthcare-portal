import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  try {
    // Log request details
    console.log('[Request]', {
      method: request.method,
      url: request.url,
      headers: Object.fromEntries(request.headers.entries())
    });
    
    const response = NextResponse.next();
    
    // Log response details
    console.log('[Response]', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });
    
    return response;
  } catch (error) {
    // Log any errors that occur during middleware execution
    console.error('[Error]', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      url: request.url
    });
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 