import { z } from "zod";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const RequestSchema = z.object({
  code: z.string(),
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

  // Controller for the code translation
  const { fromLanguage, toLanguage, code } = data;

  const openai = createOpenAI({
    compatibility: "strict",
    apiKey: process.env.OPENAI_API_KEY,
  });

  const model = openai("gpt-4o");

  try {
    const result = await streamText({
      model,
      prompt: code,
      system: `Traduce las partes de texto en ${fromLanguage} del siguiente código a ${toLanguage}. Devuelve directamente el código completo con las partes de texto traducidas. No incluyas el mensaje en la respuesta ni modifiques nada en el código que no sea texto a traducir.`,
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
