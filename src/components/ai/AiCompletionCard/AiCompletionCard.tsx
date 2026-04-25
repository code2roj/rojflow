// @file AiCompletionCard.tsx
import React from "react";
import { Grid, GridCol } from "@mantine/core";
import { AiCompletionCardClient } from "./AiCompletionCardClient";

type Props = {
  text: string;
};

export const AiCompletionCard = ({ text }: Props) => {
  return (
    <Grid w="100%">
      <GridCol span={12}>
        <AiCompletionCardClient text={text} />
      </GridCol>
    </Grid>
  );
};
