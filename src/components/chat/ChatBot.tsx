"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573158411069";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_CHIPS = [
  "¿Qué servicios ofrecen?",
  "¿Qué productos tienen?",
  "¿Cómo pido soporte técnico?",
  "¿Tienen envíos a todo Colombia?",
];

/* ── Typing indicator ─────────────────────────────────────────────── */
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-primary"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </div>
  );
}

/* ── Burbuja de mensaje ───────────────────────────────────────────── */
function Bubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex gap-2 items-end", isUser && "flex-row-reverse")}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mb-0.5",
          isUser ? "bg-primary/20" : "bg-primary/10"
        )}
      >
        {isUser ? (
          <User className="w-3.5 h-3.5 text-primary" />
        ) : (
          <Bot className="w-3.5 h-3.5 text-primary" />
        )}
      </div>

      {/* Texto */}
      <div
        className={cn(
          "max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-surface border border-border text-foreground rounded-bl-sm"
        )}
      >
        {msg.content}
      </div>
    </motion.div>
  );
}

/* ── Chat principal ───────────────────────────────────────────────── */
export function ChatBot() {
  const [open, setOpen]           = useState(false);
  const [messages, setMessages]   = useState<Message[]>([]);
  const [input, setInput]         = useState("");
  const [loading, setLoading]     = useState(false);
  const [streaming, setStreaming] = useState("");
  const [hasUnread, setHasUnread] = useState(false);
  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);

  // Mensaje de bienvenida
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content:
          "¡Hola! 👋 Soy el asistente de Duvcore Technology. ¿En qué te puedo ayudar hoy? Puedo orientarte sobre productos, servicios técnicos o cotizaciones.",
      },
    ]);
  }, []);

  // Scroll al último mensaje
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  // Focus input al abrir
  useEffect(() => {
    if (open) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMsg: Message = { role: "user", content: trimmed };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInput("");
      setLoading(true);
      setStreaming("");

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMessages }),
        });

        if (!res.ok || !res.body) throw new Error("Error del servidor");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          setStreaming(accumulated);
        }

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: accumulated },
        ]);
        setStreaming("");

        if (!open) setHasUnread(true);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Lo siento, hubo un error. Por favor escríbenos directamente por WhatsApp 😊",
          },
        ]);
        setStreaming("");
      } finally {
        setLoading(false);
      }
    },
    [messages, loading, open]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* ── Chat drawer ──────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[min(380px,calc(100vw-2rem))] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-border"
            style={{ height: "min(560px, calc(100svh - 120px))" }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #0e1420 0%, #0a0f1a 100%)",
                borderBottom: "1px solid rgba(34,211,238,0.15)",
              }}
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white leading-none">
                  Asistente Duvcore
                </p>
                <p className="text-[11px] text-emerald-400 mt-0.5">● En línea</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-background">
              {messages.map((msg, i) => (
                <Bubble key={i} msg={msg} />
              ))}

              {/* Streaming */}
              {streaming && (
                <Bubble msg={{ role: "assistant", content: streaming }} />
              )}

              {/* Typing */}
              {loading && !streaming && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-end gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="bg-surface border border-border rounded-2xl rounded-bl-sm">
                    <TypingDots />
                  </div>
                </motion.div>
              )}

              {/* Quick chips — solo si no hay mensajes del usuario aún */}
              {messages.length === 1 && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2 pt-1"
                >
                  {QUICK_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => sendMessage(chip)}
                      className="text-xs bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* WhatsApp CTA */}
            <div className="flex-shrink-0 px-4 py-2 bg-background border-t border-border">
              <a
                href={`https://wa.me/${WA}?text=Hola%20Duvcore%2C%20vengo%20desde%20la%20web`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 text-[11px] text-green-500 hover:text-green-400 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Hablar con Duvan por WhatsApp
              </a>
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex gap-2 px-3 py-3 bg-surface border-t border-border flex-shrink-0"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                disabled={loading}
                className="flex-1 bg-background border border-border rounded-xl px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 text-primary-foreground animate-spin" />
                ) : (
                  <Send className="w-4 h-4 text-primary-foreground" />
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating button ───────────────────────────────────────── */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: "linear-gradient(135deg, #06b6d4, #7c3aed)",
          boxShadow: "0 0 24px rgba(6,182,212,0.4), 0 0 48px rgba(124,58,237,0.2)",
        }}
        aria-label="Abrir chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Bot className="w-6 h-6 text-white" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Badge de no leído */}
        <AnimatePresence>
          {hasUnread && !open && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background"
            />
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
