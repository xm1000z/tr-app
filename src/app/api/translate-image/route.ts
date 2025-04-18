import { z } from "zod";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { base64ToUint8Array } from "@/lib/utils";

// Permitir respuestas en streaming de hasta 30 segundos
export const maxDuration = 30;

const RequestSchema = z.object({
  fromLanguage: z.string(),
  toLanguage: z.string(),
  image: z.string(),
});

export async function POST(req: Request) {
  // Validar el cuerpo de la solicitud
  const body = await req.json();

  const { success: successSchema, data, error } = RequestSchema.safeParse(body);

  if (!successSchema) {
    return Response.json(
      {
        success: false,
        message: "Cuerpo de la solicitud inválido.",
        data: error.format(),
      },
      { status: 400 }
    );
  }

  // Controlador para la traducción
  const { fromLanguage, toLanguage, image } = data;

  const formattedImage = base64ToUint8Array(image);

  const openai = createOpenAI({
    compatibility: "strict",
    apiKey: process.env.OPENAI_API_KEY,
  });

  const model = openai("gpt-4o");

  try {
    const result = await streamText({
      model,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Traduce el siguiente texto de ${fromLanguage} a ${toLanguage}. Si no se detecta texto en la imagen, devuelve una cadena vacía. Siempre devuelve directamente el texto traducido. No incluyas el prompt en la respuesta.`,
            },
            { type: "image", image: formattedImage },
          ],
        },
      ],
      temperature: 0.7,
    });

    return result.toAIStreamResponse();
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Necesitas proporcionar tu clave API",
      },
      { status: 401 }
    );
  }
}
