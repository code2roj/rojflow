/**
 * @file openRouterService.ts
 * @description A utility wrapper for the OpenRouter SDK to execute chat completions.
 .
 *
 * @param {string} text - The user's input or prompt to be processed.
 * @param {number} [maxCompletionTokens=1000] - Optional limit for the response length.
 * @param {string} [openRouterModel='openai/gpt-5.2'] - The specific OpenRouter model ID to use.
 * @param {boolean} [reasoning=false] - Flag to indicate if the response should include reasoning steps (not currently implemented).
 * @param {string} systemInstruction - The mandatory system prompt defining the AI's persona.
 * @returns {Promise<string>} The trimmed text content of the AI's response.
 * @throws {Error} If OPENROUTER_API_KEY is missing, systemInstruction is missing, or the API fails.
 */

import { OpenRouter } from "@openrouter/sdk";

declare module "@openrouter/sdk" {
  interface ChatRequest {
    reasoning?: {
      effort?: "low" | "medium" | "high";
      exclude?: boolean;
    };
    include_reasoning?: boolean;
  }
}
// ---------------------------------Initialize OpenRouter client
const openRouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY || "",
  httpReferer: process.env.SITE_URL || "",
  appTitle: process.env.SITE_NAME || "",
});

//----------------------------------------------- Main function
export const queryOpenRouter = async (
  text: string,
  maxCompletionTokens?: number,
  openRouterModel?: string,
  systemInstruction?: string,
  reasoning: boolean = false,
): Promise<string> => {
  if (!text) return "";
  if (!process.env.OPENROUTER_API_KEY)
    throw new Error("OPENROUTER_API_KEY missing.");
  if (!systemInstruction) throw new Error("System instruction missing.");

  try {
    const completion = await openRouter.chat.send({
      chatRequest: {
        model: openRouterModel || "gpt-oss-20b",
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: text },
        ],
        maxTokens: maxCompletionTokens || 4000,
        temperature: 1,
        stream: false,
        reasoning: reasoning ? { effort: "none" } : undefined,
      },
    });

    const message = completion.choices?.[0]?.message as any;
    const reasoningText =
      reasoning && message?.reasoning
        ? `### THOUGHT PROCESS\n${message.reasoning}\n\n---\n\n`
        : "";

    const finalContent = message?.content || "";

    return (reasoningText + finalContent).trim();
  } catch (error: unknown) {
    const fullError =
      error instanceof Error
        ? JSON.stringify(
            {
              name: error.name,
              message: error.message,
              stack: error.stack,
              ...Object.getOwnPropertyNames(error).reduce<
                Record<string, unknown>
              >((acc, key) => {
                acc[key] = (error as unknown as Record<string, unknown>)[key];
                return acc;
              }, {}),
            },
            null,
            2,
          )
        : JSON.stringify(error, null, 2);

    console.error("--- OPENROUTER API ERROR ---", fullError);
    throw new Error(fullError);
  }
};
