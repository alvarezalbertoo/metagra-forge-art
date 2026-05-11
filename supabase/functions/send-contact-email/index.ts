import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactForm {
  nombre: string;
  empresa?: string;
  email: string;
  telefono?: string;
  area?: string;
  mensaje: string;
  sedeSeleccionada?: "España" | "México";
}

const RECIPIENT_EMAIL_ES = "info@metagra.com";
const RECIPIENT_EMAIL_MX = "info@metagra.mx";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactForm = await req.json();

    const recipientEmail =
      data.sedeSeleccionada === "México"
        ? RECIPIENT_EMAIL_MX
        : RECIPIENT_EMAIL_ES;

    const emailHtml = `
      <h2>Nuevo mensaje desde la web de Metagra</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 720px;">
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Sede seleccionada</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(data.sedeSeleccionada || "España")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Nombre</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(data.nombre)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Empresa</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(data.empresa || "—")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(data.email)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Teléfono</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(data.telefono || "—")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Área de interés</strong></td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(data.area || "—")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Mensaje</strong></td><td style="padding:8px;border:1px solid #ddd; white-space: pre-wrap;">${escapeHtml(data.mensaje)}</td></tr>
      </table>
    `;

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY no está configurada");
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Metagra Web <onboarding@resend.dev>",
        to: [recipientEmail],
        reply_to: data.email,
        subject: `Nuevo contacto web · ${data.sedeSeleccionada || "España"} · ${data.nombre}`,
        html: emailHtml,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend error:", resendData);
      throw new Error(resendData?.message || "No se pudo enviar el correo");
    }

    return new Response(JSON.stringify({ success: true, recipientEmail, resendData }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("send-contact-email error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}