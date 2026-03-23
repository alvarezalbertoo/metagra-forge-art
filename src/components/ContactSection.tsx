import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { revealVariants } from "@/lib/animations";

const contactSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio").max(100),
  empresa: z.string().trim().max(100).optional(),
  email: z.string().trim().email("Email no válido").max(255),
  telefono: z.string().trim().max(30).optional(),
  area: z.string().optional(),
  mensaje: z.string().trim().min(1, "El mensaje es obligatorio").max(2000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactDetails = [
  { icon: "📍", label: "Dirección", value: "Amilaga, 22 — 20570 Bergara, Gipuzkoa" },
  { icon: "📞", label: "Teléfono", value: "+34 943 761 348", href: "tel:+34943761348" },
  { icon: "🌐", label: "Presencia Internacional", value: "España · México" },
];

export const ContactSection = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Form submitted:", data);
    toast.success("Consulta enviada correctamente. Nos pondremos en contacto contigo pronto.");
    reset();
  };

  const inputClass = "bg-mgsurface border border-[rgba(255,255,255,0.07)] text-foreground px-4 py-3.5 font-body text-[0.9rem] font-light outline-none focus:border-mgaccent transition-colors w-full";

  return (
    <section className="bg-mgbg px-6 lg:px-[60px] py-[120px] relative z-[2]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariants}>
          <div className="section-label">Hablemos</div>
          <h2 className="font-head font-extrabold uppercase leading-none tracking-tight text-foreground mb-7" style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}>
            Solicita<br /><span className="text-outline">Información</span>
          </h2>
          <div className="mt-12 space-y-0">
            {contactDetails.map((detail) => (
              <div key={detail.label} className="flex gap-5 py-6 border-t border-[rgba(255,255,255,0.07)] last:border-b">
                <div className="w-10 h-10 shrink-0 border border-[rgba(255,255,255,0.07)] flex items-center justify-center text-sm text-mgaccent">{detail.icon}</div>
                <div>
                  <span className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-mgmuted block mb-1">{detail.label}</span>
                  {detail.href ? (
                    <a href={detail.href} className="text-[0.95rem] text-foreground hover:text-mgaccent transition-colors">{detail.value}</a>
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
                <label className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-mgmuted">Nombre</label>
                <input {...register("nombre")} placeholder="Tu nombre" className={inputClass} />
                {errors.nombre && <span className="text-[0.7rem] text-destructive">{errors.nombre.message}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-mgmuted">Empresa</label>
                <input {...register("empresa")} placeholder="Nombre de empresa" className={inputClass} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-mgmuted">Email</label>
                <input {...register("email")} type="email" placeholder="correo@empresa.com" className={inputClass} />
                {errors.email && <span className="text-[0.7rem] text-destructive">{errors.email.message}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-mgmuted">Teléfono</label>
                <input {...register("telefono")} type="tel" placeholder="+34 ..." className={inputClass} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-mgmuted">Área de interés</label>
              <select {...register("area")} className={inputClass + " appearance-none"}>
                <option value="">Seleccionar...</option>
                <option>Estampación en frío</option>
                <option>Mecanizado</option>
                <option>Roscado</option>
                <option>Servicio integral</option>
                <option>I+D Colaborativo</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-mgmuted">Mensaje</label>
              <textarea {...register("mensaje")} placeholder="Describe tu necesidad o proyecto..." className={inputClass + " resize-y min-h-[130px]"} />
              {errors.mensaje && <span className="text-[0.7rem] text-destructive">{errors.mensaje.message}</span>}
            </div>
            <button type="submit" className="self-start relative overflow-hidden font-head font-bold text-[0.85rem] tracking-[0.2em] uppercase px-12 py-4 bg-mgaccent text-foreground hover:-translate-y-0.5 transition-transform group">
              <span className="absolute inset-0 bg-mgaccent2 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <span className="relative z-[1]">Enviar Consulta →</span>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
