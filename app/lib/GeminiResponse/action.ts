"use server"

import { queryG } from "@/types/qGem";
import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI( { apiKey:process.env.GEMINI_API_KEY } );


export async function queryGemini( query : queryG ) {

  try {
    // 1. Preparamos el array de contenidos (Parts)
    const promptParts = [];

    promptParts.push({ 
      text: "Eres un experto en hardware y soporte técnico. Responde siempre en español. Sé claro, técnico y útil, se muy conciso, solo di fecha de creación, datos importantes y ¿Cuanto se puede potenciar?." 
    });

    // A. Agregamos el texto (Siempre va)
    if (query) {
      promptParts.push({ text: query.query });
    } else {
      // Si el usuario no escribió nada pero mandó foto, ponemos un texto default
      promptParts.push({ text: "Dime todo lo relacionado a este componente o laptop, dime toda la información, fecha de lanzamiento, con que es compatible y las mejores recomendaciones " });
    }

    // B. Agregamos la imagen (Si existe)
    if (query.image64) {
      // Truco: Separar el encabezado "data:image/png;base64," del contenido real
      // Si image64 no tiene coma, asumimos que ya es data pura.
      const base64Data = query.image64.includes(",") 
        ? query.image64.split(",")[1] 
        : query.image64;

      // Importante: Intentar deducir el mimeType o usar 'image/jpeg' por defecto
      // Si tu fileName tiene extensión, podrías mejorar esto, pero jpeg suele funcionar genérico.
      promptParts.push({
        inlineData: {
          mimeType: "image/jpeg", // Puedes hacerlo dinámico si quieres ser estricto
          data: base64Data
        }
      });
    }

    const response = await ai.models.generateContent( {
      model: "gemini-2.5-flash",
      contents: [
          {
            role: "user",
            parts: promptParts 
          }
        ],
    } );
    return response.text
  } catch (error) {
    console.error("Error detallado en Gemini:", error);
    throw new Error("Fallo al conectar con la IA");
  }
}