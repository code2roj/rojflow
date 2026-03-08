import '@mantine/core/styles.css';
import { createTheme, MantineProvider, virtualColor, SimpleGrid } from '@mantine/core';
import { Children } from 'react';
const theme = createTheme({
  colors: {
    primary: virtualColor({
      name: 'primary',
      dark: 'pink',
      light: 'cyan',
    }),
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
       <SimpleGrid
      cols={{ base: 1, sm: 2, lg: 2 }}
      spacing={{ base: 10, sm: 'xl' }}
      verticalSpacing={{ base: 'md', sm: 'xl' }}
    >
      <div>{children}</div>
      <div>2</div>
    </SimpleGrid>

        </MantineProvider>
      </body>
    </html>
  );
}