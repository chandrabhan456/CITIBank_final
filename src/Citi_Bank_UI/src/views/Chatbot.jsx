import React, { useState, useEffect, useRef } from "react";
import { useStateContext } from "../contexts/ContextProvider";
const Chatbot = () => {
  const { setChatbot, selectedRole,mode } = useStateContext();
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // Separate state for chat window
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleOpenChat = () => {
      setIsChatOpen(true);
      setHasNewMessage(false);
    };
    window.addEventListener("openFloatingChat", handleOpenChat);
    return () => {
      window.removeEventListener("openFloatingChat", handleOpenChat);
    };
  }, []);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          type: "ai",
          message:
            "👋 Hello! I'm your AI Credit Card Recommendation Assistant. How can I assist you today?",
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (!isChatOpen) {
      const timer = setTimeout(() => {
        setHasNewMessage(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isChatOpen]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    setHasNewMessage(false);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const handleMouseDown = (e) => {
    if (e.target.closest(".chat-input") || e.target.closest(".chat-messages")) {
      return; // Don't drag when clicking on input or messages
    }

    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    const maxX = window.innerWidth - 384; // 384px = w-96
    const maxY = window.innerHeight - 480; // 480px = height

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // ADD useEffect for mouse events
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      message: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = inputMessage; // Store current message
    setInputMessage("");
    setIsTyping(true);

    try {
      // Call the API
      const aiResponseText = await getAIResponse(currentMessage);

      const aiResponse = {
        id: messages.length + 2,
        type: "ai",
        message: aiResponseText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorResponse = {
        id: messages.length + 2,
        type: "ai",
        message:
          "I'm sorry, I encountered an error while processing your request. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const getAIResponse = async (userInput) => {
    let url;
      if (selectedRole === "employee") {
      url = "http://127.0.0.1:5000/chatbot_endpoint";
    } else {
      url = "http://127.0.0.1:5000/customer_chatbot_endpoint"; // Replace with the actual URL you want to use
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_question: userInput }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return (
        data.response ||
        "I apologize, but I'm having trouble processing your request right now. Please try again."
      );
    } catch (error) {
      console.error("Error calling API:", error);
      return "I'm sorry, I'm currently experiencing technical difficulties. Please try again in a moment.";
    }
  };

  return (
    <>
      {/* Always Visible Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className={`relative group flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${
            mode==="dark"
              ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          }`}
          style={{
            boxShadow: "0 8px 32px rgba(59, 130, 246, 0.4)",
          }}
        >
          {/* Pulse Animation Ring */}
          <div className="absolute inset-0 rounded-full bg-blue-500 opacity-20 animate-ping"></div>

          {/* Chat Icon */}
          <div className="relative z-10 text-white">
            {isChatOpen ? (
              // Close icon when chat is open
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Chat icon when chat is closed
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-2.697-.413l-3.178 1.589a.75.75 0 01-1.073-.757l.458-2.292A8 8 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"
                />
              </svg>
            )}
          </div>

          {/* Notification Badge */}
          {hasNewMessage && !isChatOpen && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
          )}

          {/* Tooltip */}
          <div className="absolute right-full mr-4 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            {isChatOpen ? "Close Chat" : "AI Assistant"}
            <div className="absolute top-1/2 -right-1 w-2 h-2 bg-gray-900 transform rotate-45 -translate-y-1/2"></div>
          </div>
        </button>
      </div>

      {/* Chat Window - Only shows when isChatOpen is true */}
      {isChatOpen && (
        <div
          className="fixed z-40"
          style={{
            left: position.x || "auto",
            top: position.y || "auto",
            right: position.x ? "auto" : "24px",
            bottom: position.y ? "auto" : "96px",
          }}
        >
          <div
            className={`w-96 h-[480px] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform animate-in slide-in-from-bottom-4 flex flex-col ${
              mode==="dark"
                ? "bg-slate-800 border border-slate-700"
                : "bg-white border border-slate-200"
            } ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
            onMouseDown={handleMouseDown}
          >
            {/* Chat Header */}
            <div
              className={`px-4 py-3 border-b cursor-grab active:cursor-grabbing ${
                mode==="dark"
                  ? "border-slate-700 bg-slate-900"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🤖</span>
                  </div>
                  <div>
                    <h3
                      className={`font-semibold text-sm ${
                        mode==="dark" ? "text-white" : "text-slate-900"
                      }`}
                    >
                      AI Assistant
                    </h3>
                    <div className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                      <p
                        className={`text-xs ${
                          mode==="dark" ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        Online • Ready to help
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeChat}
                  className={`p-1.5 rounded-lg transition-colors ${
                    mode==="dark"
                      ? "hover:bg-slate-700 text-slate-400 hover:text-slate-300"
                      : "hover:bg-slate-200 text-slate-600 hover:text-slate-700"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div
              className={`flex-1 p-3 overflow-y-auto chat-messages ${
                mode==="dark" ? "bg-slate-800" : "bg-white"
              }`}
              style={{ height: "280px" }}
            >
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[300px] px-3 py-2 rounded-2xl text-sm break-words ${
                        message.type === "user"
                          ? "bg-blue-500 text-white rounded-br-md"
                          : mode==="dark"
                          ? "bg-slate-700 text-slate-200 rounded-bl-md"
                          : "bg-slate-100 text-slate-800 rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.message}
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          message.type === "user"
                            ? "text-blue-100"
                            : mode==="dark"
                            ? "text-slate-400"
                            : "text-slate-500"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl rounded-bl-md ${
                        mode==="dark" ? "bg-slate-700" : "bg-slate-100"
                      }`}
                    >
                      <div className="flex space-x-1">
                        <div
                          className={`w-2 h-2 rounded-full animate-bounce ${
                            mode==="dark" ? "bg-slate-400" : "bg-slate-500"
                          }`}
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className={`w-2 h-2 rounded-full animate-bounce ${
                            mode==="dark" ? "bg-slate-400" : "bg-slate-500"
                          }`}
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className={`w-2 h-2 rounded-full animate-bounce ${
                            mode==="dark" ? "bg-slate-400" : "bg-slate-500"
                          }`}
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Chat Input */}
            <div
              className={`p-3 border-t chat-input ${
                mode==="dark"
                  ? "border-slate-700 bg-slate-900"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className={`flex-1 px-3 py-2 text-sm rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    mode==="dark"
                      ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500"
                      : "bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500"
                  }`}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim()}
                  className={`p-2 rounded-xl transition-all duration-200 ${
                    inputMessage.trim()
                      ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                      : mode==="dark"
                      ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>

              {/* Character count info */}
              <div className="flex justify-between items-center mt-2">
                <p
                  className={`text-xs ${
                    mode==="dark" ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  Press Enter to send
                </p>
                <p
                  className={`text-xs ${
                    mode==="dark" ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  {inputMessage.length}/500
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
