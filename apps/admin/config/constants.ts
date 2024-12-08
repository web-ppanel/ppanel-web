import { env } from 'next-runtime-env';

export const locales = ['en-US', 'zh-CN'];

export const NEXT_PUBLIC_DEFAULT_LANGUAGE =
  env('NEXT_PUBLIC_DEFAULT_LANGUAGE') || process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE || locales[0];

export const NEXT_PUBLIC_SITE_URL = env('NEXT_PUBLIC_SITE_URL') || process.env.NEXT_PUBLIC_SITE_URL;
export const NEXT_PUBLIC_API_URL = env('NEXT_PUBLIC_API_URL') || process.env.NEXT_PUBLIC_API_URL;

export const NEXT_PUBLIC_DEFAULT_USER_EMAIL =
  env('NEXT_PUBLIC_DEFAULT_USER_EMAIL') || process.env.NEXT_PUBLIC_DEFAULT_USER_EMAIL;
export const NEXT_PUBLIC_DEFAULT_USER_PASSWORD =
  env('NEXT_PUBLIC_DEFAULT_USER_PASSWORD') || process.env.NEXT_PUBLIC_DEFAULT_USER_PASSWORD;
