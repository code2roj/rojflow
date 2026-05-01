import type { CollectionConfig } from "payload";

export const Prompts: CollectionConfig = {
  slug: "prompts",
  access: {
    create: ({ req: { user } }) => Boolean(user),
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    useAsTitle: "prefix",
    defaultColumns: ["title", "prefix", "description"],
  },
  labels: {},
  hooks: {
    beforeChange: [],
    afterChange: [],
    beforeValidate: [],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "prefix",
      label: "Prefix",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "systemMessage",
      type: "textarea",
    },
    {
      name: "defaultProvider",
      label: "Default Provider",
      type: "select",
      defaultValue: "Groq",
      options: [
        "Groq",
        "OpenRouter",
        "OpenAi",
        "Gemini",
        "Grok",
        "Ollama",
        "Othe",
      ],
    },
    {
      name: "bestSuitableModels",
      label: "Best Suitable Models",
      type: "text",
    },
    {
      name: "maxCompletionTokens",
      label: "Max Completion Tokens",
      type: "number",
      defaultValue: "1024",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      defaultValue: "Created",
      required: true,
      options: ["Created", "Testing", "Ready", "Suspended", "Archived"],
    },
  ],
};
