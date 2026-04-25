import { headers as getHeaders } from 'next/headers' // Removed .js

import Link from 'next/link' // Added for navigation
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import config from '@/payload.config'
import { Box, Button, Image} from '@mantine/core'
import "@mantine/core/styles.css"

export default async function RojflowPage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <Box>
      <Box>
        
        <Image src="/icons/rojflow-favicon.ico" alt="Descriptive Alt Text" fit="cover" fallbackSrc="Backup Image URL" sizes='xs'/>
        <Box>
          <Button 
  component="a" 
  href="/rojflow-manage"
>
  Go to Rojflow Manage
</Button>
         </Box>
      </Box>
    </Box>
  )
}