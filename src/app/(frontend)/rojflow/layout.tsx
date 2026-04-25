// src/app/(frontend)/layout.tsx
import {
  mantineHtmlProps,
  Center
} from '@mantine/core';
import { AppShellClient } from '@/components/AppShellClient/AppShellClient';
import '@mantine/core/styles.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>

      </head>
      <body>
          <AppShellClient>
            <Center>{children}</Center>
          </AppShellClient>
      </body>
    </html>
  );
}