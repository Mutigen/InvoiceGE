import createIntlMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'
import { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  // Skip auth routes from i18n
  if (request.nextUrl.pathname.startsWith('/auth')) {
    return
  }
  
  return createIntlMiddleware(routing)(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
