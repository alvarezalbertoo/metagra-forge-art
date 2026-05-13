import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Briefcase, Upload, FileText } from "lucide-react";
import { revealVariants } from "@/lib/animations";
import { SectionLabel } from "@/components/SectionLabel";
import { supabase } from "@/integrations/supabase/client";

type CareersFormData = {
  nombre: string;
  email: string;
  telefono?: string;
  puesto?: string;
  mensaje?: string;
};

const MAX_SIZE = 8 * 1024 * 1024; // 8 MB
const ACCEPTED = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const CareersSection = () => {
  const { t } = useTranslation();
  const [sending, setSending] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const schema = z.object({
    nombre: z.string().trim().min(1, t("careers.nombreReq", "El nombre es obligatorio")).max(100),
    email: z.string().trim().email(t("careers.emailReq", "Email no válido")).max(255),
    telefono: z.string().trim().max(30).optional(),
    puesto: z.string().trim().max(120).optional(),
    mensaje: z.string().trim().max(2000).optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CareersFormData>({ resolver: zodResolver(schema) });

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!ACCEPTED.includes(f.type)) {
      toast.error(t("careers.fileType", "Solo se aceptan PDF o Word"));
      return;
    }
    if (f.size > MAX_SIZE) {
      toast.error(t("careers.fileSize", "El archivo supera 8 MB"));
      return;
    }
    setFile(f);
  };

  const onSubmit = async (data: CareersFormData) => {
    if (!file) {
      toast.error(t("careers.fileReq", "Adjunta tu CV"));
      return;
    }
    setSending(true);
    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${Date.now()}-${crypto.randomUUID()}-${safeName}`;

      const { error: upErr } = await supabase.storage
        .from("cvs")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (upErr) throw upErr;

      const { error: fnErr } = await supabase.functions.invoke("send-cv-application", {
        body: { ...data, cv_path: path, cv_filename: file.name },
      });
      if (fnErr) throw fnErr;

      toast.success(t("careers.success", "¡Gracias! Hemos recibido tu candidatura."));
      reset();
      setFile(null);
    } catch (err) {
      console.error(err);
      toast.error(t("careers.error", "No se pudo enviar la candidatura. Inténtalo de nuevo."));
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "bg-mgsurface border border-border text-foreground px-4 py-3.5 font-body text-[0.9rem] font-light outline-none focus:border-mgaccent transition-colors w-full";

  return (
    <section
      id="empleo"
      className="bg-mgbg2 px-6 lg:px-[60px] py-[140px] relative z-[2] border-t border-border"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start max-w-[1400px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <SectionLabel number="11">{t("careers.label", "Bolsa de empleo")}</SectionLabel>

          <h2
            className="font-head font-extrabold uppercase leading-[0.9] tracking-tight text-foreground mb-7"
            style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
          >
            {t("careers.title1", "Únete al")}
            <br />
            <span className="text-outline">{t("careers.title2", "equipo Metagra")}</span>
          </h2>

          <p className="text-mgsteel text-[1rem] leading-relaxed font-light max-w-[480px] mb-10">
            {t(
              "careers.intro",
              "Buscamos talento que comparta nuestra pasión por la precisión y la mejora continua. Envíanos tu CV y nos pondremos en contacto cuando surja una vacante que encaje con tu perfil."
            )}
          </p>

          <div className="space-y-0">
            {[
              {
                icon: Briefcase,
                label: t("careers.benefit1Label", "Desarrollo"),
                value: t("careers.benefit1", "Plan de carrera y formación continua"),
              },
              {
                icon: FileText,
                label: t("careers.benefit2Label", "Procesos"),
                value: t("careers.benefit2", "Selección transparente y feedback claro"),
              },
              {
                icon: Upload,
                label: t("careers.benefit3Label", "Candidatura"),
                value: t("careers.benefit3", "Adjunta tu CV en PDF o Word (máx. 8 MB)"),
              },
            ].map((b) => (
              <div key={b.label} className="flex gap-5 py-6 border-t border-border last:border-b">
                <div className="w-10 h-10 shrink-0 border border-border flex items-center justify-center">
                  <b.icon className="w-4 h-4 text-mgaccent" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-mgmuted block mb-1">
                    {b.label}
                  </span>
                  <p className="text-[0.95rem] text-foreground">{b.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
          variants={revealVariants}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-mgmuted">
                  {t("careers.nombre", "Nombre completo")}
                </label>
                <input {...register("nombre")} className={inputClass} placeholder="Nombre y apellidos" />
                {errors.nombre && (
                  <span className="text-[0.7rem] text-destructive">{errors.nombre.message}</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-mgmuted">
                  {t("careers.email", "Email")}
                </label>
                <input {...register("email")} type="email" className={inputClass} placeholder="tu@email.com" />
                {errors.email && (
                  <span className="text-[0.7rem] text-destructive">{errors.email.message}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-mgmuted">
                  {t("careers.telefono", "Teléfono")}
                </label>
                <input {...register("telefono")} type="tel" className={inputClass} placeholder="+34 ..." />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-mgmuted">
                  {t("careers.puesto", "Puesto de interés")}
                </label>
                <input
                  {...register("puesto")}
                  className={inputClass}
                  placeholder={t("careers.puestoPh", "Ingeniería, producción, calidad...") as string}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-mgmuted">
                {t("careers.mensaje", "Carta de presentación (opcional)")}
              </label>
              <textarea
                {...register("mensaje")}
                className={inputClass + " resize-y min-h-[120px]"}
                placeholder={t("careers.mensajePh", "Cuéntanos brevemente qué te motiva...") as string}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-mgmuted">
                {t("careers.cv", "CV (PDF o Word, máx. 8 MB)")}
              </label>
              <label
                htmlFor="cv-upload"
                className="bg-mgsurface border border-dashed border-border px-4 py-6 flex items-center gap-4 cursor-pointer hover:border-mgaccent transition-colors"
              >
                <Upload className="w-5 h-5 text-mgaccent shrink-0" strokeWidth={1.5} />
                <span className="font-body text-[0.9rem] text-foreground truncate">
                  {file
                    ? file.name
                    : t("careers.cvPh", "Haz clic para seleccionar tu archivo")}
                </span>
              </label>
              <input
                id="cv-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={onFileChange}
                className="sr-only"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="self-start relative overflow-hidden font-head font-bold text-[0.85rem] tracking-[0.2em] uppercase px-12 py-4 bg-mgaccent text-white hover:-translate-y-0.5 transition-transform group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-0 bg-mgaccent2 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <span className="relative z-[1]">
                {sending
                  ? t("careers.sending", "Enviando...")
                  : t("careers.submit", "Enviar candidatura")}
              </span>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};