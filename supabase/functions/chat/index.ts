import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Eres el asistente virtual de Metagra, empresa especializada en estampación en frío, forja, mecanizado y fabricación de piezas metálicas con instalaciones en Bergara, Gipuzkoa, España. Fundada en 1970, Metagra es un referente en el sector del metal.

REGLAS ESTRICTAS:
1. Responde SIEMPRE en el idioma del usuario. Si escribe en español, responde en español; si escribe en inglés, responde en inglés, etc.
2. Sé directo y conciso: máximo 3 oraciones por respuesta.
3. No uses listas largas ni relleno. Ve al punto.
4. Si el usuario pregunta por una sección de la página (servicios, procesos, materiales, instalaciones, clientes, contacto, inicio), DEBES incluir al final de tu respuesta exactamente este JSON en una línea separada:
   {"navigate":"ID_DE_LA_SECCIÓN"}
   Donde ID_DE_LA_SECCIÓN es uno de: inicio, servicios, procesos, materiales, instalaciones, clientes, contacto.
5. Conocimiento de Metagra:
   - Servicios: estampación en frío, forja, mecanizado CNC, recubrimientos, ensamblaje de componentes.
   - Materiales: acero al carbono, acero inoxidable, aluminio, cobre, aleaciones especiales.
   - Capacidades: producción en serie, piezas a medida, tolerancias estrechas, más de 300 empleados, 2 plantas de fabricación.
   - Certificaciones: IATF 16949, ISO 9001, ISO 14001, Mathread. Premios de calidad de PSA, Bosch, Renault.
   - Sectores: automoción, electrodoméstico, construcción, electricidad, ferretería.
   - Contacto: teléfono +34 943 769 030, email info@metagra.com, Pol. Ind. San Lorenzo, Bergara, Gipuzkoa.
6. Si no sabes algo específico, di en una oración: "Para más detalles, contáctanos directamente." y navega a contacto con {"navigate":"contacto"}`;

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Demasiadas solicitudes, inténtalo de nuevo en unos momentos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos agotados." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Error del servicio de IA" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Error desconocido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
