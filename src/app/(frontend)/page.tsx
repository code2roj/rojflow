import { headers as getHeaders } from 'next/headers' // Removed .js
import Image from 'next/image'
import Link from 'next/link' // Added for navigation
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import config from '@/payload.config'
import { Box, Button } from '@mantine/core'
import "@mantine/core/styles.css"

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <Box>
      <Box>
        <picture>
          <source srcSet="/icons/rojflow-favicon.ico" />
          <Image alt="Rojflow Logo" height={120} src="/icons/rojflow-favicon.ico" width={65} />
        </picture>
        <Box>
          <Button 
            component="a" 
            href="/flow-manage"
          >
            Go to Rojflow Manage
          </Button>
           <Button 
            component="a" 
            href="/rojflow"
          >
            Go to Rojflow
          </Button>
        </Box>
      </Box>
    </Box>
  )
}