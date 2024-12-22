import { env } from 'next-runtime-env';
import i18nConfig from '../.i18nrc.json';

export const locales = i18nConfig.outputLocales;

export const NEXT_PUBLIC_DEFAULT_LANGUAGE = env('NEXT_PUBLIC_DEFAULT_LANGUAGE') || locales[0];

export const NEXT_PUBLIC_SITE_URL = env('NEXT_PUBLIC_SITE_URL');
export const NEXT_PUBLIC_API_URL = env('NEXT_PUBLIC_API_URL');

export const NEXT_PUBLIC_DEFAULT_USER_EMAIL = env('NEXT_PUBLIC_DEFAULT_USER_EMAIL');
export const NEXT_PUBLIC_DEFAULT_USER_PASSWORD = env('NEXT_PUBLIC_DEFAULT_USER_PASSWORD');
