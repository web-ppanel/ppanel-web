import { Avatar, AvatarFallback, AvatarImage } from '@shadcn/ui/avatar';
import { Card, CardDescription, CardHeader, CardTitle } from '@shadcn/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@shadcn/ui/tooltip';
import { getTranslations } from 'next-intl/server';
import Image from 'next/legacy/image';
import Link from 'next/link';

const BASE_URL = 'https://cdn.jsdelivr.net/gh/perfect-panel/ppanel-assets/billing/index.json';

interface BillingProps {
  type: 'dashboard' | 'payment';
}

interface ItemType {
  logo: string;
  title: string;
  description: string;
  poster: string;
  expiryDate: string;
  href: string;
}

export default async function Billing({ type }: BillingProps) {
  const t = await getTranslations('common.billing');
  let list: ItemType[] = [];
  try {
    const response = await fetch(BASE_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    const now = new Date().getTime();
    list = data[type].filter((item) => {
      const expiryDate = Date.parse(item.expiryDate);
      return !isNaN(expiryDate) && expiryDate > now;
    });
  } catch (error) {
    return null;
  }
  if (list && list.length === 0) return null;
  return (
    <TooltipProvider>
      <h1 className='text mt-2 font-bold'>
        <span>{t('title')}</span>
        <span className='text-muted-foreground ml-2 text-xs'>{t('description')}</span>
      </h1>
      <div className='grid gap-3 md:grid-cols-3 lg:grid-cols-6'>
        {list.map((item, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Link href={item.href} target='_blank'>
                <Card className='cursor-pointer'>
                  <CardHeader className='flex flex-row items-center gap-2 p-3'>
                    <Avatar>
                      <AvatarImage src={item.logo} />
                      <AvatarFallback>{item.title}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription className='line-clamp-3'>{item.description}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </TooltipTrigger>
            <TooltipContent className='bg-muted text-muted-foreground'>
              <p className='mb-1'>{item.description}</p>
              <Image src={item.poster} width={400} height={300} unoptimized objectFit='cover' />
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}