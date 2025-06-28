import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { FiSend } from "react-icons/fi";
import { sendAgentQuery } from "../services/services";
import "./AgentChatFullPage.css";
import Navbarr from "../../components/navbar2/navbarr";

export default function AgentChatFullPage({ userName = "User" }) {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");
  const chatEndRef = useRef(null);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("chatTheme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Load chat history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("chatHistory");
    if (stored) {
      setChat(JSON.parse(stored));
    } else {
      const welcomeMessage = {
        role: "ai",
        content: `👋 Hello ${userName}, how can I help you with your expenses today?`,
      };
      setChat([welcomeMessage]);
    }
  }, [userName]);

  // Scroll to bottom on chat update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  // Save chat to localStorage
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chat));
  }, [chat]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedChat = [...chat, userMessage];

    setChat(updatedChat);
    setInput("");
    setLoading(true);

    try {
      const data = await sendAgentQuery({
        query: input,
        chat_history: updatedChat,
      });

      const aiMessage = { role: "ai", content: data.response };
      setChat((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("API error:", error);
      const fallback = {
        role: "ai",
        content: "⚠️ Sorry, I couldn't process that. Please try again.",
      };
      setChat((prev) => [...prev, fallback]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };



  return (
    <div className={`expensewise-fullpage-chat ${theme}`}>
      <header>
        <Navbarr />
      </header>

      <div className="expensewise-chat-body">
        {chat.map((msg, idx) => (
          <div key={idx} className={`expensewise-chat-msg ${msg.role}`}>
            {msg.role === "ai" ? (
              <>
                <div className="expensewise-avatar">🤖</div>
                <div className="expensewise-bubble ai">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </>
            ) : (
              <>
                <div className="expensewise-bubble user">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
                <div className="expensewise-avataruser">🧑</div>
              </>
            )}
          </div>
        ))}
        {loading && (
          <div className="expensewise-chat-msg ai">
            <div className="expensewise-avatar">🤖</div>
            <div className="expensewise-bubble typing">
              Typing<span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="expensewise-chat-footer">
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSend} disabled={loading}>
          <FiSend />
        </button>
      </div>
    </div>
  );
}
