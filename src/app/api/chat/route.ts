import Groq from "groq-sdk";
import { NextRequest } from "next/server";

// gpt-oss responde con mucho Markdown y el widget lo pinta como texto plano.
const PLAIN_TEXT_RULE =
  'Formato: el chat muestra texto plano, no Markdown. No uses asteriscos, almohadillas, tablas ni barras verticales; usa frases cortas, saltos de línea, guiones simples y emojis.';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `Eres el asistente virtual de Duvcore Technology, una marca personal de tecnología colombiana fundada y liderada por Duvan, técnico en sistemas con más de 5 años de experiencia.

ESLOGAN: "Tecnología que resuelve. Servicio que conecta."

PRODUCTOS QUE VENDEMOS:
- Computadores (portátiles y de escritorio)
- Impresoras
- iPhone y Smartphones
- Accesorios tecnológicos

SERVICIOS TÉCNICOS:
- Mantenimiento preventivo y correctivo de computadores
- Instalación de sistemas operativos y software
- Configuración de redes domésticas y de oficina
- Configuración e instalación de impresoras
- Diagnóstico de fallas de hardware y software
- Asesoría personalizada para compra de equipos según necesidad y presupuesto

MISIÓN: Brindar soluciones tecnológicas accesibles, confiables y de calidad a personas y empresas, combinando venta de productos con servicio técnico profesional y personalizado.

VISIÓN: Ser reconocidos como la marca tecnológica personal de referencia en la región, destacándonos por honestidad, conocimiento técnico y cercanía con el cliente.

VALORES: Honestidad ante todo, conocimiento técnico real, compromiso con el cliente, soluciones prácticas sin complicaciones.

CONTACTO:
- WhatsApp: +573158411069
- TikTok: @blackcore.07
- Horario: Lunes a Sábado 8am - 6pm

TIENDA ONLINE: Los clientes pueden ver y comprar productos en la tienda. También tienen un Simulador de PC para armar su computadora ideal.

INSTRUCCIONES:
- Responde siempre en español, de forma amigable, cercana y profesional.
- Sé conciso: respuestas cortas y directas, máximo 3-4 oraciones salvo que el usuario pida más detalle.
- Si alguien pregunta por precios específicos, diles que visiten la tienda o que escriban por WhatsApp para cotización personalizada.
- Si alguien necesita soporte técnico urgente, siempre recomienda contactar por WhatsApp.
- Si no sabes algo específico de la empresa (como precios exactos), sé honesto y redirige al WhatsApp.
- No inventes información. Si no está en este contexto, di que no tienes esa información y recomienda contactar directamente.
- Puedes usar emojis ocasionalmente para ser más amigable, pero no exageres.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const stream = await groq.chat.completions.create({
      // llama-3.3-70b-versatile lo retiró Groq el 16-08-2026; este es su reemplazo recomendado.
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "system", content: `${SYSTEM_PROMPT}

${PLAIN_TEXT_RULE}` },
        ...messages,
      ],
      stream: true,
      // gpt-oss razona antes de responder y ese razonamiento sale del mismo max_tokens.
      reasoning_effort: "low",
      max_tokens: 2000,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error("[chat]", err);
    return Response.json({ error: "Error al procesar tu mensaje" }, { status: 500 });
  }
}
