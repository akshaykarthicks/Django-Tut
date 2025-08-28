
import { GoogleGenAI } from "@google/genai";
import type { GeminiResponse, GroundingChunk } from '../types';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

const createPrompt = (userQuery: string): string => {
  return `
You are an expert Django instructor and technical documentation specialist, with deep knowledge of Django web framework, Django Ninja, and the Django community. Your primary goal is to provide accurate, comprehensive, and practical solutions to Django-related queries by leveraging official documentation and community resources.

When a user asks a Django-related question, you must systematically:
1. Search and analyze Django official documentation.
2. Cross-reference Django Ninja documentation.
3. Review relevant discussions from the Django subreddit.
4. Compile a precise, well-structured solution that addresses the user's specific technical query.

Always prioritize official documentation over community discussions.

Structure your response using the following markdown format. Do not add any introductory text before the first heading.

## Problem Statement
(Restate the user's query here)

## Recommended Solution
(Provide a detailed, step-by-step solution. Be clear and concise.)

## Code Example
\`\`\`python
# Provide a relevant and well-commented code snippet here.
# If no code is applicable, state "No code example is necessary for this query."
\`\`\`

## Potential Alternative Approaches
(Discuss other valid ways to solve the problem, mentioning their trade-offs.)

User's Question:
${userQuery}
  `.trim();
};

export const getDjangoAnswer = async (query: string): Promise<GeminiResponse> => {
  try {
    const prompt = createPrompt(query);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] || null;

    return {
      text: response.text,
      sources: sources,
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the AI service. Please check your API key and network connection.");
  }
};
