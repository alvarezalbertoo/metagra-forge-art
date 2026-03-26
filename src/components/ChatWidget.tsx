import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Msg[];
  onDelta: (t: string) => void;
  onDone: () => void;
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

  // eslint-disable-next-line no-constant-condition
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
        onDone();
        return;
      }
      try {
        const p = JSON.parse(json);
        const c = p.choices?.[0]?.delta?.content;
        if (c) onDelta(c);
      } catch {
        buf = line + "\n" + buf;
        break;
      }
    }
  }
  onDone();
}

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Msg = { role: "user", content: text };
    const allMsgs = [...messages, userMsg];
    setMessages(allMsgs);
    setInput("");
    setLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    await streamChat({
      messages: allMsgs,
      onDelta: upsert,
      onDone: () => setLoading(false),
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
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-[360px] h-[480px] flex flex-col overflow-hidden shadow-2xl"
            style={{
              background: "#111113",
              border: "1px solid #2a2a2e",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 1px rgba(232,98,10,0.3)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 shrink-0"
              style={{
                background: "linear-gradient(135deg, #1a1a1e 0%, #111113 100%)",
                borderBottom: "1px solid #2a2a2e",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-7 h-7 flex items-center justify-center rounded-sm"
                  style={{ background: "#e8620a20" }}
                >
                  <span className="text-sm" style={{ color: "#e8620a" }}>⚒</span>
                </div>
                <span
                  className="font-head font-bold text-sm tracking-[0.12em] uppercase"
                  style={{ color: "#e0e0e0" }}
                >
                  Asistente Metagra
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 flex items-center justify-center transition-colors hover:bg-white/10 rounded-sm"
                style={{ color: "#888" }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ background: "#0d0d0f" }}>
              {messages.length === 0 && (
                <p className="text-center text-xs mt-8" style={{ color: "#555" }}>
                  {t("chat.welcome", "¿En qué puedo ayudarte sobre Metagra?")}
                </p>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[85%] px-3 py-2 text-[0.82rem] leading-relaxed"
                    style={
                      m.role === "user"
                        ? {
                            background: "linear-gradient(135deg, #e8620a, #c45208)",
                            color: "#fff",
                            borderRadius: "2px 2px 0 2px",
                          }
                        : {
                            background: "#1a1a1e",
                            color: "#ccc",
                            border: "1px solid #2a2a2e",
                            borderRadius: "2px 2px 2px 0",
                          }
                    }
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex justify-start">
                  <div
                    className="px-4 py-2.5 flex gap-1"
                    style={{ background: "#1a1a1e", border: "1px solid #2a2a2e" }}
                  >
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="w-1.5 h-1.5 rounded-full inline-block"
                        style={{
                          background: "#e8620a",
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
              style={{ borderTop: "1px solid #2a2a2e", background: "#111113" }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder={t("chat.placeholder", "Escribe tu mensaje...")}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-[#555]"
                style={{ color: "#ddd" }}
                disabled={loading}
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                className="w-8 h-8 flex items-center justify-center transition-all rounded-sm disabled:opacity-30"
                style={{ background: "#e8620a", color: "#fff" }}
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      {!open && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(true)}
          className="w-14 h-14 flex items-center justify-center shadow-2xl group relative"
          style={{
            background: "linear-gradient(145deg, #1e1e22, #141416)",
            border: "1px solid #2a2a2e",
            borderRadius: "50%",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(232,98,10,0.15)",
          }}
          title="Pregúntame sobre Metagra"
        >
          <MessageSquare size={22} style={{ color: "#e8620a" }} />
          {/* Glow pulse */}
          <span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              border: "2px solid rgba(232,98,10,0.3)",
              animation: "ringPulse 2.5s ease-in-out infinite",
            }}
          />
        </motion.button>
      )}
    </div>
  );
};
