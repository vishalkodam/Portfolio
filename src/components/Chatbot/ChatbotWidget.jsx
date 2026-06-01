import React, { useEffect, useMemo, useReducer, useRef } from "react";
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

const initialMessage = {
  id: nowId(),
  role: "assistant",
  content:
    "Hi — I'm Vishal's portfolio assistant. Ask me anything about Vishal (skills, projects, research, contact).",
};

const initialState = {
  isOpen: false,
  input: "",
  isSending: false,
  error: "",
  messages: [initialMessage],
};

function chatReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_OPEN":
      return { ...state, isOpen: !state.isOpen };
    case "SET_OPEN":
      return { ...state, isOpen: action.open };
    case "SET_INPUT":
      return { ...state, input: action.value };
    case "SET_SENDING":
      return { ...state, isSending: action.value };
    case "SET_ERROR":
      return { ...state, error: action.value };
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.message] };
    case "CLEAR_CHAT":
      return {
        ...state,
        error: "",
        messages: [action.message],
      };
    case "SEND_START":
      return {
        ...state,
        error: "",
        isSending: true,
        input: "",
        messages: [...state.messages, action.message],
      };
    default:
      return state;
  }
}

export default function ChatbotWidget() {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const { isOpen, input, isSending, error, messages } = state;

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

    const userMsg = { id: nowId(), role: "user", content };
    dispatch({ type: "SEND_START", message: userMsg });

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
            "Chatbot is installed, but the chat API isn't configured yet. Set `REACT_APP_CHAT_API_URL` to your deployed Worker URL (ending in `/chat`).",
        };
        dispatch({ type: "ADD_MESSAGE", message: assistantMsg });
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
        content: answer || "I couldn't generate an answer right now. Please try again.",
      };
      dispatch({ type: "ADD_MESSAGE", message: assistantMsg });
    } catch (e) {
      const msg =
        typeof e?.message === "string" && e.message.trim()
          ? e.message.trim().slice(0, 300)
          : "Something went wrong. Please try again.";
      dispatch({ type: "SET_ERROR", value: msg });
    } finally {
      dispatch({ type: "SET_SENDING", value: false });
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    send(input);
  }

  function clearChat() {
    dispatch({
      type: "CLEAR_CHAT",
      message: {
        id: nowId(),
        role: "assistant",
        content:
          "Cleared. Ask me anything about Vishal (skills, projects, research, contact).",
      },
    });
  }

  return (
    <div className="chatbot">
      <button
        type="button"
        className="chatbotFab"
        onClick={() => dispatch({ type: "TOGGLE_OPEN" })}
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
                onClick={() => dispatch({ type: "SET_OPEN", open: false })}
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
              onChange={(e) => dispatch({ type: "SET_INPUT", value: e.target.value })}
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
