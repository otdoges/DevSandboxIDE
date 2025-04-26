import React, { useState } from "react";
import { 
  X, 
  Send,
  Bot
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  code?: string;
  codeLanguage?: string;
}

interface AIChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const AIChatAssistant: React.FC<AIChatAssistantProps> = ({
  isOpen,
  onClose,
  className
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Welcome to DevSandbox! I'm your AI assistant. How can I help you with your code today?"
    },
    {
      id: '2',
      type: 'user',
      content: "How do I import Vue Router in my project?"
    },
    {
      id: '3',
      type: 'assistant',
      content: "To import Vue Router, first install it:",
      code: "npm install vue-router",
      codeLanguage: "bash"
    },
    {
      id: '4',
      type: 'assistant',
      content: "Then in your main.js or index.js file:",
      code: "import Vue from 'vue'\nimport VueRouter from 'vue-router'\n\nVue.use(VueRouter)",
      codeLanguage: "javascript"
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim()) {
      // Add user message
      const userMessageId = `user-${Date.now()}`;
      setMessages(prev => [
        ...prev,
        {
          id: userMessageId,
          type: 'user',
          content: newMessage
        }
      ]);
      
      // Clear input
      setNewMessage("");
      
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            type: 'assistant',
            content: "I've analyzed your question. Here's what I found:",
            code: `// Example code for: ${newMessage}\nfunction processQuery() {\n  console.log("Processing your request");\n  return "Result";\n}`,
            codeLanguage: "javascript"
          }
        ]);
      }, 1000);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className={cn(
        "w-72 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300",
        className
      )}
    >
      <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot size={16} className="gradient-icon" />
          <h2 className="font-inter font-semibold text-sm text-textPrimary dark:text-white">AI ASSISTANT</h2>
        </div>
        <button 
          onClick={onClose}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label="Close AI assistant"
        >
          <X size={14} className="text-textSecondary dark:text-gray-300" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={cn(
              "p-3 rounded-lg",
              message.type === 'assistant' 
                ? "bg-primary dark:bg-gray-700" 
                : "bg-secondary dark:bg-gray-600 ml-auto max-w-[85%]"
            )}
          >
            <p className="text-sm text-textPrimary dark:text-white mb-2">{message.content}</p>
            {message.code && (
              <div className="bg-gray-800 dark:bg-gray-900 p-2 rounded text-white text-xs font-mono">
                {message.code}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSendMessage} className="relative">
          <textarea
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 pr-10 text-sm text-textPrimary dark:text-white bg-white dark:bg-gray-700 outline-none focus:border-accent dark:focus:border-accent resize-none"
            placeholder="Ask a question about your code..."
            rows={2}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
          <button 
            type="submit"
            className="absolute right-2 bottom-2 text-accent dark:text-accent hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200"
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChatAssistant;
