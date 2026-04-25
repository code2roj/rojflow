// @file AiCompletionCardClient.tsx
"use client";

import React, { useState, useTransition } from "react";
import {
  Stack,
  Paper,
  Grid,
  GridCol,
  Button,
  CopyButton,
  Text,
} from "@mantine/core";
import { testOpenRouterInteraction } from "./testOpenRouterInteraction";

type Props = {
  text: string;
};

export function AiCompletionCardClient({ text }: Props) {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleGenerate = () => {
    setError("");
    setResult("");

    startTransition(async () => {
      try {
        const response = await testOpenRouterInteraction(text);
        setResult(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  };

  const copyValue = result;

  return (
    <Grid w="100%">
      <GridCol span={10}>
        <Stack>
          <Paper mih="90vh" p="md">
            {result ? (
              <Text style={{ whiteSpace: "pre-wrap" }}>{result}</Text>
            ) : (
              <Text c="dimmed" style={{ whiteSpace: "pre-wrap" }}>
                {isPending
                  ? "Generating response..."
                  : "AI response will appear here."}
              </Text>
            )}

            {error ? (
              <Text c="red" mt="md">
                {error}
              </Text>
            ) : null}
          </Paper>
        </Stack>
      </GridCol>

      <GridCol span={2}>
        <Stack>
          <Paper mih="90vh" p="md">
            <Stack justify="space-evenly" align="stretch" gap="xl">
              <Button onClick={handleGenerate} loading={isPending}>
                Generate
              </Button>

              <CopyButton value={copyValue}>
                {({ copied, copy }) => (
                  <Button
                    color={copied ? "green" : "cyan"}
                    onClick={copy}
                    disabled={!result}
                  >
                    {copied ? "Copied" : "Copy"}
                  </Button>
                )}
              </CopyButton>

              <Button variant="default">Button</Button>
            </Stack>
          </Paper>
        </Stack>
      </GridCol>
    </Grid>
  );
}
