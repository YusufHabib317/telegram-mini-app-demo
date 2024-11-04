/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import type { PropsWithChildren } from 'react';
import Script from 'next/script';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Providers } from '@/components/providers';
import './global.css';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="https://telegram.org/js/telegram-web-app.js" as="script" />
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
