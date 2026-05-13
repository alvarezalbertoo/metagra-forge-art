import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CVApplication {
  nombre: string;
  email: string;
  telefono?: string;
  puesto?: string;
  mensaje?: string;
  cv_path: string;
  cv_filename?: string;
}

const RECIPIENT = "info@metagra.com";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: CVApplication = await req.json();

    if (!data.nombre || !data.email || !data.cv_path) {
      return new Response(JSON.stringify({ error: "Faltan datos obligatorios" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Guardar candidatura
    const { error: insertErr } = await supabase.from("job_applications").insert({
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono || null,
      puesto: data.puesto || null,
      mensaje: data.mensaje || null,
      cv_path: data.cv_path,
    });
    if (insertErr) throw insertErr;

    // Enlace firmado del CV (7 días)
    const { data: signed } = await supabase.storage
      .from("cvs")
      .createSignedUrl(data.cv_path, 60 * 60 * 24 * 7);

    const cvUrl = signed?.signedUrl || "";

    const html = `
      <h2>Nueva candidatura — Bolsa de empleo</h2>
      <table style="border-collapse:collapse;width:100%;max-width:720px;">
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Nombre</strong></td><td style="padding:8px;border:1px solid #ddd;">${esc(data.nombre)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd;">${esc(data.email)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Teléfono</strong></td><td style="padding:8px;border:1px solid #ddd;">${esc(data.telefono || "—")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Puesto de interés</strong></td><td style="padding:8px;border:1px solid #ddd;">${esc(data.puesto || "—")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Mensaje</strong></td><td style="padding:8px;border:1px solid #ddd;white-space:pre-wrap;">${esc(data.mensaje || "—")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>CV</strong></td><td style="padding:8px;border:1px solid #ddd;"><a href="${cvUrl}">${esc(data.cv_filename || "Descargar CV")}</a><br/><small>Enlace válido 7 días</small></td></tr>
      </table>
    `;

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Metagra Web <onboarding@resend.dev>",
          to: [RECIPIENT],
          reply_to: data.email,
          subject: `Nueva candidatura · ${data.nombre}${data.puesto ? ` · ${data.puesto}` : ""}`,
          html,
        }),
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("send-cv-application error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

function esc(v: string) {
  return v
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}