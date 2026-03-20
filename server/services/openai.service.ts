import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL ?? "gpt-5";

const client = apiKey ? new OpenAI({ apiKey }) : null;

function extractOutputText(response: any): string | null {
  if (response?.output_text) return response.output_text;
  if (!Array.isArray(response?.output)) return null;

  const textChunks: string[] = [];
  for (const item of response.output) {
    if (!Array.isArray(item?.content)) continue;
    for (const content of item.content) {
      if (typeof content?.text === "string") textChunks.push(content.text);
    }
  }

  const joined = textChunks.join("\n").trim();
  return joined.length ? joined : null;
}

export async function askOpenAI(prompt: string, context?: { name?: string }) {
  if (!client) return null;

  try {
    const response = await client.responses.create({
      model,
      input: prompt,
      instructions: `You are Campus Assistant. Be concise and helpful. If you don't have the requested campus data, say so clearly.`,
      metadata: {
        source: "campusconnect-chatbot",
        user: context?.name ?? "student",
      },
    });

    return extractOutputText(response);
  } catch (error) {
    console.error("[openai] fallback failed", error);
    return null;
  }
}
