// src/components/AppShellClient/AppShellClient.tsx
'use client'

import { AppShell, Burger, NavLink } from '@mantine/core' // Added NavLink here
import { useDisclosure } from '@mantine/hooks'
import { HouseIcon, RobotIcon } from '@phosphor-icons/react'
import Link from 'next/link' // Import Next.js Link
import { usePathname } from 'next/navigation' // For active state tracking

type Props = {
  children: React.ReactNode
}

export function AppShellClient({ children }: Props) {
  const [opened, { toggle }] = useDisclosure(false)
  const pathname = usePathname() // Get current URL to highlight active tab

  return (
    <AppShell
      padding="md"
      header={{ height: 35 }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !opened, desktop: !opened },
      }}
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} size="sm" />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink
          component={Link}
          href="/rojflow"
          label="HOME"
          leftSection={<HouseIcon size={32} />}
          active={pathname === '/rojflow'}
        />
        <NavLink
          component={Link}
          href="/rojflow/ai"
          label="AI"
          leftSection={<RobotIcon size={32} />}
          active={pathname === '/rojflow/ai'}
        />
      </AppShell.Navbar>

      <AppShell.Main h="100%">
        {children}
      </AppShell.Main>
    </AppShell>
  )
}