import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RECIPIENT_EMAIL = "albertoalvarez1026@icloud.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactForm {
  nombre: string;
  empresa?: string;
  email: string;
  telefono?: string;
  area?: string;
  mensaje: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactForm = await req.json();

    const emailHtml = `
      <h2>Nueva solicitud de contacto — Metagra Group</h2>
      <table style="border-collapse:collapse;font-family:Arial,sans-serif;">
        <tr><td style="padding:8px;font-weight:bold;">Nombre:</td><td style="padding:8px;">${escapeHtml(data.nombre)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Empresa:</td><td style="padding:8px;">${escapeHtml(data.empresa || "—")}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Email:</td><td style="padding:8px;">${escapeHtml(data.email)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Teléfono:</td><td style="padding:8px;">${escapeHtml(data.telefono || "—")}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Área de interés:</td><td style="padding:8px;">${escapeHtml(data.area || "—")}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;vertical-align:top;">Mensaje:</td><td style="padding:8px;">${escapeHtml(data.mensaje)}</td></tr>
      </table>
    `;

    const resendKey = Deno.env.get("RESEND_API_KEY");
    console.log("RESEND_API_KEY present:", !!resendKey);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "Metagra Web <onboarding@resend.dev>",
        to: [RECIPIENT_EMAIL],
        subject: `Contacto Web: ${data.nombre} — ${data.area || "General"}`,
        html: emailHtml,
        reply_to: data.email,
      }),
    });

    const responseText = await res.text();
    console.log("Resend response:", res.status, responseText);

    if (!res.ok) {
      return new Response(JSON.stringify({ error: "Error al enviar email", details: responseText }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
