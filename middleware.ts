import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const userAgent = request.headers.get('user-agent') || '';
  const isBadBot = /curl|wget|java-http|node-fetch|axios|go-http-client/i.test(userAgent);
  const isGoodBot = /googlebot|bingbot|yandex|baiduspider|twitterbot|facebookexternalhit|telegrambot|slackbot/i.test(userAgent);

  if (isBadBot && !isGoodBot) {
    return new NextResponse('Access Denied: Automated requests not allowed.', { status: 403 });
  }

  const isReturningUser = request.cookies.get('returning_user');
  if (!isReturningUser) {
    response.cookies.set('returning_user', 'true', {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      sameSite: 'lax'
    });
  } else {
    response.headers.set('x-returning-user', 'true');
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
