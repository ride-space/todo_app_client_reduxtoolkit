import { Inter } from '@next/font/google';
import type { ReactNode } from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const GoogleFontProvider = ({ children }: { children: ReactNode }) => {
  return <div className={inter.className}>{children}</div>;
};
