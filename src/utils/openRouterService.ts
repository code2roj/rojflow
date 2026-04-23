/**
 * @file openRouterService.ts
 * @description A utility wrapper for the OpenRouter SDK to execute chat completions.
 * This version uses the correct camelCase properties (maxTokens) required by the SDK.
 *
 * @param {string} text - The user's input or prompt to be processed.
 * @param {number} [maxCompletionTokens=1000] - Optional limit for the response length.
 * @param {string} [openRouterModel='openai/gpt-5.2'] - The specific OpenRouter model ID to use.
 * @param {boolean} [reasoning=false] - Flag to indicate if the response should include reasoning steps (not currently implemented).
 * @param {string} systemInstruction - The mandatory system prompt defining the AI's persona.
 * @returns {Promise<string>} The trimmed text content of the AI's response.
 * @throws {Error} If OPENROUTER_API_KEY is missing, systemInstruction is missing, or the API fails.
 */


import { OpenRouter } from '@openrouter/sdk';

// 1. Module Augmentation to match the 2026 schema precisely.
// This adds the 'reasoning' object to the request and the 'reasoning' string to the response.
declare module '@openrouter/sdk' {
  interface ChatRequest {
    reasoning?: {
      effort?: 'low' | 'medium' | 'high';
      exclude?: boolean;
    };
    include_reasoning?: boolean; // Legacy but supported for DeepSeek R1
  }
}

const openRouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY || '',
  // SDK 2026 uses camelCase for constructor options
  httpReferer: process.env.SITE_URL || '',
  appTitle: process.env.SITE_NAME || '',
});

export const queryOpenRouter = async (
  text: string,
  maxCompletionTokens?: number,
  openRouterModel?: string,
  systemInstruction?: string,
  reasoning: boolean = false,
): Promise<string> => {
  if (!text) return '';
  if (!process.env.OPENROUTER_API_KEY) throw new Error('OPENROUTER_API_KEY missing.');
  if (!systemInstruction) throw new Error('System instruction missing.');

  try {
    const completion = await openRouter.chat.send({
      chatRequest: {
        model: openRouterModel || 'openai/gpt-5.2',
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: text },
        ],
        maxTokens: maxCompletionTokens || 1000,
        temperature: 1,
        stream: false,
        // The reasoning property is now an object for effort control.
        // If false, we explicitly exclude to ensure no hidden token costs.
        reasoning: reasoning ? { effort: 'medium' } : { exclude: true },
        include_reasoning: reasoning, // Redundancy for older model support
      },
    });

    const message = completion.choices?.[0]?.message as any;
    
    // OpenRouter 2026 returns reasoning in the 'reasoning' field of the message
    const reasoningText = reasoning && message?.reasoning 
      ? `### THOUGHT PROCESS\n${message.reasoning}\n\n---\n\n` 
      : '';
      
    const finalContent = message?.content || '';

    return (reasoningText + finalContent).trim();
  } catch (error: any) {
    console.error('--- OPENROUTER API ERROR ---', error?.message || error);
    throw new Error(error.message || 'API error occurred.');
  }
};