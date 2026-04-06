import type { Payload } from 'payload'

const findPrompts = async (payload: Payload) => {
  const prompts = await payload.find({
    collection: 'prompts',
    where: {
      prefix: {
        equals: 'testApi',
      },
    },
    select: {
      systemMessage: true,
    },
    depth: 0,
    limit: 1,
  })

  return prompts
}
