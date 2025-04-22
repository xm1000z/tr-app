import { z } from "zod";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const RequestSchema = z.object({
  prompt: z.string(),
  fromLanguage: z.string(),
  toLanguage: z.string(),
});

export async function POST(req: Request) {
  // Validate the request body
  const body = await req.json();

  const { success: successSchema, data, error } = RequestSchema.safeParse(body);

  if (!successSchema) {
    return Response.json(
      {
        success: false,
        message: "Texto de la solicitud inválido.",
        data: error.format(),
      },
      { status: 400 }
    );
  }

  // Controller for the translation
  const { fromLanguage, toLanguage, prompt } = data;

  const openai = createOpenAI({
    compatibility: "strict",
    apiKey: process.env.OPENAI_API_KEY,
  });

  const model = openai("gpt-4o");

  try {
    const result = await streamText({
      model,
      prompt,
      system: `Traduce el siguiente texto de ${fromLanguage} a ${toLanguage}. Devuelve directamente el texto traducido. No incluyas el mensaje o prompt en la respuesta NUNCA. Eres un Traductor no devuelvas ningun texto que no se te ha pedido traducir.`,
      temperature: 0.7,
    });

    return result.toAIStreamResponse();
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Necesitas la API Key",
      },
      { status: 401 }
    );
  }
}
