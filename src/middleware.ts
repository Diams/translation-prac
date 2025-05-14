import { NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import { i18nConfig } from '../i18nConfig';

const getNegotiatedLanguage = (
  headers: Negotiator.Headers,
): string | undefined => {
  return new Negotiator({ headers }).language([...i18nConfig.locales]);
};

export function middleware(request: NextRequest): NextResponse {
  const headers = {
    'accept-language': request.headers.get('accept-language') ?? '',
  };
  const preferredLanguage = getNegotiatedLanguage(headers) || i18nConfig.defaultLocale;

  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = i18nConfig.locales.every(
    (lang) => !pathname.startsWith(`/${lang}/`) && pathname !== `/${lang}`,
  );

  if (pathnameIsMissingLocale) {
    if (preferredLanguage !== i18nConfig.defaultLocale) {
      return NextResponse.redirect(
        new URL(`/${preferredLanguage}${pathname}`, request.url),
      );
    } else {
      const newPathname = `/${i18nConfig.defaultLocale}${pathname}`;
      return NextResponse.rewrite(new URL(newPathname, request.url));
    }
  }

  return NextResponse.next();
}

// このmiddlewareを適用する範囲を指定
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
