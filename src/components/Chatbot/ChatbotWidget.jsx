import React, { useEffect, useMemo, useRef, useState } from "react";
import "./chatbot.css";
import { knowledgeText } from "../../chatbot/knowledgeText.js";
import { retrieveTopChunks } from "../../chatbot/retrieval.js";

const DEFAULT_SUGGESTIONS = [
  "What are your strongest skills?",
  "Tell me about your IEEE paper.",
  "Which projects are you most proud of?",
  "How can I contact you?",
];

function nowId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState(() => [
    {
      id: nowId(),
      role: "assistant",
      content:
        "Hi — I’m Vishal’s portfolio assistant. Ask me anything about Vishal (skills, projects, research, contact).",
    },
  ]);

  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isOpen]);

  const suggestions = useMemo(() => DEFAULT_SUGGESTIONS, []);

  async function send(text) {
    const content = text.trim();
    if (!content || isSending) return;

    setError("");
    setIsSending(true);

    const userMsg = { id: nowId(), role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const chunks = retrieveTopChunks({
        question: content,
        knowledgeMarkdown: knowledgeText,
        maxChunks: 6,
      });

      const context = chunks
        .map((c) => `### ${c.title}\n${c.text}`.trim())
        .join("\n\n---\n\n")
        .slice(0, 8000);

      const apiUrl = (process.env.REACT_APP_CHAT_API_URL || "").trim();
      if (!apiUrl) {
        const assistantMsg = {
          id: nowId(),
          role: "assistant",
          content:
            "Chatbot is installed, but the chat API isn’t configured yet. Set `REACT_APP_CHAT_API_URL` to your deployed Worker URL (ending in `/chat`).",
        };
        setMessages((prev) => [...prev, assistantMsg]);
        return;
      }

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          question: content,
          context,
          maxTokens: 450,
          temperature: 0.3,
        }),
      });

      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(t || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const answer = typeof data?.answer === "string" ? data.answer.trim() : "";
      const assistantMsg = {
        id: nowId(),
        role: "assistant",
        content: answer || "I couldn’t generate an answer right now. Please try again.",
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (e) {
      const msg =
        typeof e?.message === "string" && e.message.trim()
          ? e.message.trim().slice(0, 300)
          : "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setIsSending(false);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    send(input);
  }

  function clearChat() {
    setError("");
    setMessages([
      {
        id: nowId(),
        role: "assistant",
        content:
          "Cleared. Ask me anything about Vishal (skills, projects, research, contact).",
      },
    ]);
  }

  return (
    <div className="chatbot">
      <button
        type="button"
        className="chatbotFab"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
      >
        {isOpen ? "×" : "Ask"}
      </button>

      {isOpen && (
        <div className="chatbotPanel" role="dialog" aria-label="Portfolio chatbot">
          <div className="chatbotHeader">
            <div className="chatbotTitle">Ask about Vishal</div>
            <div className="chatbotHeaderActions">
              <button type="button" className="chatbotHeaderBtn" onClick={clearChat}>
                Clear
              </button>
              <button
                type="button"
                className="chatbotHeaderBtn"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                Close
              </button>
            </div>
          </div>

          <div className="chatbotMessages" ref={listRef}>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`chatbotMsg ${m.role === "user" ? "is-user" : "is-assistant"}`}
              >
                <div className="chatbotBubble">{m.content}</div>
              </div>
            ))}
          </div>

          {error && <div className="chatbotError">{error}</div>}

          <div className="chatbotSuggestions">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                className="chatbotChip"
                onClick={() => send(s)}
                disabled={isSending}
              >
                {s}
              </button>
            ))}
          </div>

          <form className="chatbotComposer" onSubmit={onSubmit}>
            <input
              ref={inputRef}
              className="chatbotInput"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              maxLength={400}
              disabled={isSending}
            />
            <button type="submit" className="chatbotSend" disabled={isSending || !input.trim()}>
              {isSending ? "…" : "Send"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

