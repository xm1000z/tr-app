import { z } from "zod";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import pdf from "pdf-parse";

import { validPrefixes } from "@/lib/constants";


// Permitir respuestas en streaming de hasta 30 segundos
export const maxDuration = 30;


const RequestSchema = z.object({
  fromLanguage: z.string(),
  toLanguage: z.string(),
  document: z.string(),
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

  const matchedPrefix = validPrefixes.find((prefix) =>
    image.startsWith(prefix)
  );
  
  if (!matchedPrefix) {
    return Response.json(
      {
        success: false,
        message: "El formato de Data URI es inválido",
      },
      { status: 401 }
    );
  }

  const base64Data = document.slice(matchedPrefix.length);

  const pdfBuffer = Buffer.from(base64Data, "base64");

  let textToTranslate = "";

  try {
    const data = await pdf(pdfBuffer);
    textToTranslate = data.text;
  } catch (error) {    
    return Response.json(
      {
        success: false,
        message: "Error al analizar el documento PDF",
      },
      { status: 500 }
    );
  }

  // Servicio para la traducción
  const openai = createOpenAI({
    compatibility: "strict",
    apiKey: process.env.OPENAI_API_KEY,
  });

  const model = openai("gpt-4o");

  try {
    const result = await streamText({
      model,
      system: `Traduce el siguiente texto de ${fromLanguage} a ${toLanguage}. Si el idioma de origen es "Auto", intenta detectar el idioma original automáticamente después de leer el texto. Devuelve directamente el texto traducido. No incluyas el prompt en la respuesta.`,
      prompt: textToTranslate.toString(),
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
