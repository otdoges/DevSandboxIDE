import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TerminalProps {
  className?: string;
  initialHistory?: string[];
  onCommand?: (command: string) => void;
}

export const Terminal: React.FC<TerminalProps> = ({
  className,
  initialHistory = [],
  onCommand,
}) => {
  const [history, setHistory] = useState<string[]>(initialHistory);
  const [command, setCommand] = useState<string>("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Handle command submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (command.trim()) {
      // Add command to history
      const fullCommand = `$ ${command}`;
      setHistory((prev) => [...prev, fullCommand]);
      setCommandHistory((prev) => [...prev, command]);
      
      // Execute command if callback provided
      if (onCommand) {
        onCommand(command);
      } else {
        // Add mock response if no callback
        setHistory((prev) => [...prev, `> Command executed: ${command}`, '$']);
      }
      
      // Reset command and history index
      setCommand("");
      setHistoryIndex(-1);
    }
  };

  // Handle key navigation (up/down arrows for command history)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      if (newIndex >= 0 && commandHistory.length > 0) {
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      if (newIndex >= 0) {
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setCommand("");
      }
    }
  };

  // Scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when clicked anywhere in the terminal
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      className={cn("flex-1 p-3 font-mono text-sm overflow-auto bg-gray-900 text-gray-200", className)}
      onClick={handleTerminalClick}
      ref={terminalRef}
    >
      {history.map((line, index) => (
        <div key={index} className="mb-1 terminal-text">{line}</div>
      ))}
      <form onSubmit={handleSubmit} className="flex items-center terminal-prompt">
        <span className="terminal-prompt-symbol">$ </span>
        <input
          ref={inputRef}
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none text-gray-200 flex-1 ml-1 focus:ring-0 terminal-input"
          type="text"
          autoFocus
        />
      </form>
    </div>
  );
};
