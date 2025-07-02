'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import ThemeToaster from './themeToaster';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider refetchInterval={5 * 60}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange
        >
          {children}
          <ThemeToaster/>
        </NextThemesProvider>
    </SessionProvider>
  );
}