import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import React from 'react'
import { AiCompletionCard } from '@/components/ai/AiCompletionCard/AiCompletionCard'
import config from '@/payload.config'
  
export default async function AiPage () {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })
  
  return (
      <AiCompletionCard />
)
}