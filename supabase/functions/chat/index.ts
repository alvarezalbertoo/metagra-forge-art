import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content:
              "Eres el asistente virtual de Metagra, empresa especializada en estampación en frío, forja, mecanizado y fabricación de piezas metálicas con instalaciones en Bergara, Gipuzkoa, España. Fundada en 1970, Metagra es un referente en el sector del metal. Responde siempre en el idioma del usuario, de forma profesional y concisa. Ayuda a los visitantes con información sobre los servicios de Metagra (estampación en frío, forja, mecanizado, recubrimientos, ensamblaje), procesos productivos, materiales, certificaciones de calidad (IATF 16949, ISO 14001, premios de calidad de PSA, Bosch, Renault), sectores que atiende (automoción, electrodoméstico, construcción, electricidad, ferretería) y cómo contactar a la empresa (teléfono: +34 943 769 030, email: info@metagra.com, dirección: Pol. Ind. San Lorenzo, Bergara, Gipuzkoa). Si no sabes algo específico, invita al usuario a contactar directamente a Metagra para más detalles.",
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Demasiadas solicitudes, inténtalo de nuevo en unos momentos." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos agotados." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Error del servicio de IA" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Error desconocido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
