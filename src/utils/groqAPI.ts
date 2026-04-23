'use server'
/**
 * @file groqService.ts
 * @description A utility wrapper for the Groq SDK to execute chat completions.
 * This function validates environment variables, handles system instructions, 
 * and provides standardized error logging for API failures.
 *
 * @param {string} text - The user's input or prompt to be processed.
 * @param {number} [maxCompletionTokens=1000] - Optional limit for the response length.
 * @param {string} [groqModel='llama-3.3-70b-versatile'] - The specific Groq model ID to use.
 * @param {string} systemInstruction - The mandatory system prompt defining the AI's persona or constraints.
 * * @returns {Promise<string>} The trimmed text content of the AI's response.
 * @throws {Error} If GROQ_API_KEY is missing, systemInstruction is null, or the API request fails.
 */


import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
})

export const queryGroq = async (
  text: string,
  maxCompletionTokens?: number,
  groqModel?: string,
  systemInstruction?: string,
): Promise<string> => {
  if (!text) return ''

  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is missing from environment variables.')
  }

  if (!systemInstruction) {
    throw new Error('System instruction is missing; check the Prompts collection.')
  }

  try {
    const completion = await groq.chat.completions.create({
      model: groqModel || 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: text },
      ],
      temperature: 1,
      max_completion_tokens: maxCompletionTokens || 1000,
      top_p: 1,
      stream: false,
    })

    return completion.choices?.[0]?.message?.content?.trim() || ''
  } catch (error: any) {
    console.error('--- GROQ API ERROR ---', error?.message || error)
    throw new Error('API error occurred while fetching response from GROQ.')
  }
}
