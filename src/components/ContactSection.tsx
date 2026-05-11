import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { revealVariants } from "@/lib/animations";
import { SectionLabel } from "@/components/SectionLabel";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { MapPin, Phone, Globe } from "lucide-react";

type ContactFormData = {
  nombre: string;
  empresa?: string;
  email: string;
  telefono?: string;
  area?: string;
  mensaje: string;
};

export const ContactSection = () => {
  const [sending, setSending] = useState(false);
  const { t } = useTranslation();

  const contactSchema = z.object({
    nombre: z.string().trim().min(1, t("contact.nombreReq")).max(100),
    empresa: z.string().trim().max(100).optional(),
    email: z.string().trim().email(t("contact.emailReq")).max(255),
    telefono: z.string().trim().max(30).optional(),
    area: z.string().optional(),
    mensaje: z.string().trim().min(1, t("contact.mensajeReq")).max(2000),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const contactDetails = [
    { icon: MapPin, label: t("contact.address"), value: "Amilaga, 22 — 20570 Bergara, Gipuzkoa" },
    { icon: Phone, label: t("contact.phone"), value: "+34 943 761 348", href: "tel:+34943761348" },
    { icon: Phone, label: "México", value: "+52 461 202 75 00", href: "tel:+524612027500" },
    { icon: Globe, label: t("contact.international"), value: t("contact.internationalValue") },
  ];

  const onSubmit = async (data: ContactFormData) => {
    setSending(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: data,
      });
      if (error) throw error;
      toast.success(t("contact.success"));
      reset();
    } catch (err) {
      console.error(err);
      toast.error(t("contact.error"));
    } finally {
      setSending(false);
    }
  };

  const inputClass = "bg-mgsurface border border-border text-foreground px-4 py-3.5 font-body text-[0.9rem] font-light outline-none focus:border-mgaccent transition-colors w-full";

  return (
    <section id="contacto" className="bg-mgbg px-6 lg:px-[60px] py-[140px] relative z-[2]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariants}>
          <SectionLabel number="10">{t("contact.label")}</SectionLabel>
          <h2 className="font-head font-extrabold uppercase leading-[0.9] tracking-tight text-foreground mb-7" style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}>
            {t("contact.title1")}<br /><span className="text-outline">{t("contact.title2")}</span>
          </h2>

          <div className="mt-12 space-y-0">
            {contactDetails.map((detail) => (
              <div key={detail.label + detail.value} className="flex gap-5 py-6 border-t border-border last:border-b">
                <div className="w-10 h-10 shrink-0 border border-border flex items-center justify-center">
                  <detail.icon className="w-4 h-4 text-mgaccent" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-mgmuted block mb-1">
                    {detail.label}
                  </span>
                  {detail.href ? (
                    <a href={detail.href} className="text-[0.95rem] text-foreground hover:text-mgaccent transition-colors">
                      {detail.value}
                    </a>
                  ) : (
                    <p className="text-[0.95rem] text-foreground">{detail.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={revealVariants}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-mgmuted">{t("contact.nombre")}</label>
                <input {...register("nombre")} placeholder={t("contact.nombrePh")} className={inputClass} />
                {errors.nombre && <span className="text-[0.7rem] text-destructive">{errors.nombre.message}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-mgmuted">{t("contact.empresa")}</label>
                <input {...register("empresa")} placeholder={t("contact.empresaPh")} className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-mgmuted">{t("contact.email")}</label>
                <input {...register("email")} type="email" placeholder={t("contact.emailPh")} className={inputClass} />
                {errors.email && <span className="text-[0.7rem] text-destructive">{errors.email.message}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-mgmuted">{t("contact.telefono")}</label>
                <input {...register("telefono")} type="tel" placeholder={t("contact.telefonoPh")} className={inputClass} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-mgmuted">{t("contact.area")}</label>
              <select {...register("area")} className={inputClass + " appearance-none"}>
                <option value="">{t("contact.areaDefault")}</option>
                <option>{t("contact.areaOpt1")}</option>
                <option>{t("contact.areaOpt2")}</option>
                <option>{t("contact.areaOpt3")}</option>
                <option>{t("contact.areaOpt4")}</option>
                <option>{t("contact.areaOpt5")}</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-mgmuted">{t("contact.mensaje")}</label>
              <textarea {...register("mensaje")} placeholder={t("contact.mensajePh")} className={inputClass + " resize-y min-h-[130px]"} />
              {errors.mensaje && <span className="text-[0.7rem] text-destructive">{errors.mensaje.message}</span>}
            </div>

            <button
              type="submit"
              disabled={sending}
              className="self-start relative overflow-hidden font-head font-bold text-[0.85rem] tracking-[0.2em] uppercase px-12 py-4 bg-mgaccent text-white hover:-translate-y-0.5 transition-transform group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-0 bg-mgaccent2 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <span className="relative z-[1]">{sending ? t("contact.sending") : t("contact.submit")}</span>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};