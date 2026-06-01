import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize the Google GenAI SDK server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export async function POST(req: NextRequest) {
  try {
    const { title, category, status } = await req.json();

    if (!title) {
      return NextResponse.json(
        { error: "Se requiere al menos un título para generar la descripción." },
        { status: 400 }
      );
    }

    const prompt = `Actúa como un aficionado apasionado del fútbol que redacta un anuncio de venta en un marketplace de segunda mano tipo Wallapop llamado "Segunda División". 
Por favor, genera una descripción atractiva, concisa, amigable y futbolera en castellano para el siguiente artículo:
- Artículo: "${title}"
- Categoría: "${category || 'General'}"
- Estado: "${status || 'Bueno'}"

La descripción debe:
1. Resaltar la calidad, la nostalgia o la utilidad deportiva del artículo.
2. Usar un tono entusiasta, cercano a otros hinchas del fútbol, pero directo.
3. Incluir de 3 a 4 oraciones bien redactadas terminando con una invitación a comprar o preguntar.
4. No incluir placeholders generados, ni saludos falsos extensos. Redáctalo listo para copiar y pegar.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const text = response.text || "";

    return NextResponse.json({ description: text.trim() });
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    return NextResponse.json(
      { error: "No se pudo generar la descripción deportiva usando IA. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
