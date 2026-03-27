import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageSquare } from "lucide-react";

type ChatMsg = { role: "user" | "assistant" | "system"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const SECTION_MAP: Record<string, string[]> = {
  inicio: ["inicio", "portada", "home", "arriba", "principal"],
  "our-services": ["servicios", "servicio", "qué hacen", "que hacen", "oferta"],
  procesos: ["procesos", "proceso", "cómo trabajan", "como trabajan", "producción"],
  materiales: ["materiales", "material", "acero", "metal", "insumos", "tecnologías"],
  instalaciones: ["instalaciones", "planta", "fábrica", "fabrica", "facilities", "cifras"],
  clientes: ["clientes", "proyectos", "casos", "ejemplos", "trabajos", "sectores"],
  contacto: ["contacto", "contactar", "email", "teléfono", "ubicación", "dirección"],
};

const SECTION_LABELS: Record<string, string> = {
  inicio: "Inicio",
  "our-services": "Servicios",
  procesos: "Procesos",
  materiales: "Materiales",
  instalaciones: "Instalaciones",
  clientes: "Clientes",
  contacto: "Contacto",
};

function scrollToSection(sectionId: string): boolean {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }
  return false;
}

function parseNavigation(text: string): { cleanText: string; sectionId: string | null } {
  const match = text.match(/\{"navigate"\s*:\s*"(\w+)"\}/);
  if (match) {
    return {
      cleanText: text.replace(match[0], "").trim(),
      sectionId: match[1],
    };
  }
  return { cleanText: text, sectionId: null };
}

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: { role: string; content: string }[];
  onDelta: (t: string) => void;
  onDone: (full: string) => void;
  onError: (msg: string) => void;
}) {
  let resp: Response;
  try {
    resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages }),
    });
  } catch {
    onError("Error de conexión. Inténtalo de nuevo.");
    return;
  }

  if (!resp.ok) {
    try {
      const j = await resp.json();
      onError(j.error || "Error del servidor.");
    } catch {
      onError("Error del servidor.");
    }
    return;
  }

  if (!resp.body) {
    onError("Sin respuesta.");
    return;
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  let full = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buf.indexOf("\n")) !== -1) {
      let line = buf.slice(0, idx);
      buf = buf.slice(idx + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (!line.startsWith("data: ")) continue;
      const json = line.slice(6).trim();
      if (json === "[DONE]") {
        onDone(full);
        return;
      }
      try {
        const p = JSON.parse(json);
        const c = p.choices?.[0]?.delta?.content;
        if (c) {
          full += c;
          onDelta(c);
        }
      } catch {
        buf = line + "\n" + buf;
        break;
      }
    }
  }
  onDone(full);
}

const WELCOME_MSG: ChatMsg = {
  role: "assistant",
  content: "Hola, soy el asistente de Metagra ⚙️ Puedo responder tus preguntas sobre nuestros servicios, procesos y más. ¿En qué te ayudo?",
};

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      if (!hasOpened) {
        setMessages([WELCOME_MSG]);
        setHasOpened(true);
      }
    }
  }, [open, hasOpened]);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: ChatMsg = { role: "user", content: text };
    const allMsgs = [...messages, userMsg];
    setMessages(allMsgs);
    setInput("");
    setLoading(true);

    let assistantSoFar = "";
    const apiMessages = allMsgs
      .filter((m) => m.role !== "system")
      .map((m) => ({ role: m.role, content: m.content }));

    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length > 1 && prev[prev.length - 2]?.role === "user") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    await streamChat({
      messages: apiMessages,
      onDelta: upsert,
      onDone: (fullText) => {
        setLoading(false);
        const { cleanText, sectionId } = parseNavigation(fullText);
        if (sectionId) {
          // Update last message with clean text and add nav bubble
          setMessages((prev) => {
            const updated = [...prev];
            const lastIdx = updated.length - 1;
            if (updated[lastIdx]?.role === "assistant") {
              updated[lastIdx] = { ...updated[lastIdx], content: cleanText };
            }
            updated.push({
              role: "system",
              content: `↓ Te llevo a la sección de ${SECTION_LABELS[sectionId] || sectionId}`,
            });
            return updated;
          });
          setTimeout(() => scrollToSection(sectionId), 400);
        }
      },
      onError: (msg) => {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `⚠️ ${msg}` },
        ]);
        setLoading(false);
      },
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-[360px] h-[500px] flex flex-col overflow-hidden"
            style={{
              background: "#0f0f0f",
              border: "1px solid #2a2a2a",
              boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 1px rgba(224,123,57,0.3)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 shrink-0"
              style={{
                background: "linear-gradient(135deg, #1a1a1e 0%, #0f0f0f 100%)",
                borderBottom: "1px solid #2a2a2a",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-7 h-7 flex items-center justify-center"
                  style={{ background: "rgba(224,123,57,0.12)" }}
                >
                  <span className="text-sm" style={{ color: "#e07b39" }}>⚒</span>
                </div>
                <span
                  className="font-head font-bold text-sm tracking-[0.12em] uppercase"
                  style={{ color: "#e5e5e5" }}
                >
                  Asistente Metagra
                </span>
              </div>
              <button
                onClick={handleClose}
                className="w-7 h-7 flex items-center justify-center transition-colors hover:bg-white/10"
                style={{ color: "#888" }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ background: "#0a0a0c" }}>
              {messages.map((m, i) => {
                if (m.role === "system") {
                  return (
                    <div key={i} className="flex justify-center">
                      <div
                        className="px-3 py-1.5 text-xs font-mono tracking-wider"
                        style={{
                          background: "rgba(224,123,57,0.15)",
                          color: "#e07b39",
                          border: "1px solid rgba(224,123,57,0.25)",
                        }}
                      >
                        {m.content}
                      </div>
                    </div>
                  );
                }
                return (
                  <div
                    key={i}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className="max-w-[85%] px-3 py-2 text-[0.82rem] leading-relaxed"
                      style={
                        m.role === "user"
                          ? {
                              background: "#e07b39",
                              color: "#111",
                              fontWeight: 500,
                            }
                          : {
                              background: "#1c1c1c",
                              color: "#e5e5e5",
                              border: "1px solid #2a2a2a",
                            }
                      }
                    >
                      {m.content}
                    </div>
                  </div>
                );
              })}
              {loading && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex justify-start">
                  <div
                    className="px-4 py-2.5 flex gap-1.5"
                    style={{ background: "#1c1c1c", border: "1px solid #2a2a2a" }}
                  >
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="w-1.5 h-1.5 rounded-full inline-block"
                        style={{
                          background: "#e07b39",
                          animation: `pulse 1.2s ease-in-out ${d * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              className="shrink-0 flex items-center gap-2 px-3 py-3"
              style={{ borderTop: "1px solid #2a2a2a", background: "#0f0f0f" }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "#e5e5e5" }}
                disabled={loading}
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                className="w-8 h-8 flex items-center justify-center transition-all disabled:opacity-30"
                style={{ background: "#e07b39", color: "#111" }}
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB button */}
      {!open && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpen}
          className="w-14 h-14 flex items-center justify-center group relative"
          style={{
            background: "#111",
            border: "1px solid #2a2a2a",
            borderRadius: "50%",
            boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 20px rgba(224,123,57,0.15)",
          }}
          title="Pregúntame sobre Metagra"
        >
          <MessageSquare size={22} style={{ color: "#e07b39" }} />
          <span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              border: "2px solid rgba(224,123,57,0.3)",
              animation: "ringPulse 2.5s ease-in-out infinite",
            }}
          />
        </motion.button>
      )}
    </div>
  );
};
