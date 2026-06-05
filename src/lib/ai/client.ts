import { createGoogleGenerativeAI } from '@ai-sdk/google';

// PRIMARY: Gemini 2.0 Flash — FREE tier
export const ai = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_AI_API_KEY!,
});
export const model = ai('gemini-2.0-flash');

// To switch to OpenAI (paid, minimal change):
// import { createOpenAI } from '@ai-sdk/openai'
// export const ai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY! })
// export const model = ai('gpt-4o-mini')
