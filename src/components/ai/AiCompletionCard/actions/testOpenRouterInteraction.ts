// @file testOpenRouterInteraction.ts
"use server";

import config from "@payload-config";
import { getPayload } from "payload";
import { queryOpenRouter } from "@/utils/openRouterService";

const SYSTEM_PROMPT_ID = 1;
const MODEL = "openai/gpt-oss-20b";
const MAX_TOKENS = 4000;

const dummyInputText =
  "Say the api call received in three different languages: English, Spanish, and French.";

const serializeError = (error: unknown): string => {
  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    const plainError: Record<string, unknown> = {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };

    const errorWithExtras = error as Error & {
      cause?: unknown;
      status?: unknown;
      statusCode?: unknown;
      code?: unknown;
      response?: unknown;
      data?: unknown;
      details?: unknown;
    };

    if (errorWithExtras.cause !== undefined) {
      plainError.cause = errorWithExtras.cause;
    }

    if (errorWithExtras.status !== undefined) {
      plainError.status = errorWithExtras.status;
    }

    if (errorWithExtras.statusCode !== undefined) {
      plainError.statusCode = errorWithExtras.statusCode;
    }

    if (errorWithExtras.code !== undefined) {
      plainError.code = errorWithExtras.code;
    }

    if (errorWithExtras.response !== undefined) {
      plainError.response = errorWithExtras.response;
    }

    if (errorWithExtras.data !== undefined) {
      plainError.data = errorWithExtras.data;
    }

    if (errorWithExtras.details !== undefined) {
      plainError.details = errorWithExtras.details;
    }

    return JSON.stringify(plainError, null, 2);
  }

  try {
    return JSON.stringify(error, null, 2);
  } catch {
    return String(error);
  }
};

export const testOpenRouterInteraction = async (
  inputText: string,
): Promise<string> => {
  const payload = await getPayload({ config });

  const userMessage = inputText?.trim() || dummyInputText;

  if (!userMessage) {
    throw new Error("inputText is required.");
  }

  const promptDoc = await payload.findByID({
    collection: "prompts",
    id: SYSTEM_PROMPT_ID,
    depth: 0,
  });

  if (
    !promptDoc ||
    typeof promptDoc.systemMessage !== "string" ||
    !promptDoc.systemMessage.trim()
  ) {
    throw new Error(
      `System prompt with ID "${SYSTEM_PROMPT_ID}" not found or has no valid systemMessage field.`,
    );
  }

  const systemInstruction = promptDoc.systemMessage.trim();

  let aiResponse: string | null = null;
  let errorMessage: string | null = null;

  try {
    aiResponse = await queryOpenRouter(
      userMessage,
      MAX_TOKENS,
      MODEL,
      systemInstruction,
      false,
    );

    if (typeof aiResponse === "string") {
      aiResponse = aiResponse.trim();
    }

    if (!aiResponse) {
      aiResponse = null;
      errorMessage = "OpenRouter returned no content.";
    }
  } catch (error) {
    errorMessage = serializeError(error);
    console.error("[testOpenRouterInteraction] OpenRouter full error:", error);
  }

  try {
    await payload.create({
      collection: "ai-interactions",
      depth: 0,
      data: {
        userMessage,
        aiResponse: aiResponse ?? undefined,
        source: "Test Function",
        systemMessage: SYSTEM_PROMPT_ID,
        model: MODEL,
        provider: "OpenRouter",
        reasoning: false,
        ...(errorMessage ? { error: errorMessage } : {}),
        metadata: {
          promptId: SYSTEM_PROMPT_ID,
          maxTokens: MAX_TOKENS,
          executedAt: new Date().toISOString(),
        },
      },
    });
  } catch (logError) {
    const loggingErrorMessage = serializeError(logError);

    console.error(
      "[testOpenRouterInteraction] Failed to log AI interaction:",
      logError,
    );

    throw new Error(
      errorMessage
        ? `${errorMessage}\n\nAdditionally, logging the interaction failed:\n${loggingErrorMessage}`
        : `AI call succeeded, but logging the interaction failed:\n${loggingErrorMessage}`,
    );
  }

  if (errorMessage || aiResponse === null) {
    throw new Error(errorMessage ?? "OpenRouter returned no content.");
  }

  return aiResponse;
};
