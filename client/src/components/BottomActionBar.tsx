import React from "react";
import { 
  TerminalSquare, 
  Bot, 
  Users,
  ActivitySquare 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomActionBarProps {
  onToggleTerminal: () => void;
  onToggleAI: () => void;
  isTerminalOpen: boolean;
  isAIOpen: boolean;
  className?: string;
}

const BottomActionBar: React.FC<BottomActionBarProps> = ({
  onToggleTerminal,
  onToggleAI,
  isTerminalOpen,
  isAIOpen,
  className
}) => {
  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center justify-between transition-colors duration-300",
      className
    )}>
      <div className="flex items-center space-x-4">
        <button 
          onClick={onToggleTerminal}
          className={cn(
            "flex items-center space-x-1 text-sm hover:text-accent dark:hover:text-blue-400 transition-colors duration-200",
            isTerminalOpen ? "text-accent dark:text-blue-400" : "text-textSecondary dark:text-gray-300"
          )}
          aria-label="Toggle terminal"
        >
          <TerminalSquare size={16} />
          <span>Terminal</span>
        </button>
        <button 
          onClick={onToggleAI}
          className={cn(
            "flex items-center space-x-1 text-sm hover:text-accent dark:hover:text-blue-400 transition-colors duration-200",
            isAIOpen ? "text-accent dark:text-blue-400" : "text-textSecondary dark:text-gray-300"
          )}
          aria-label="Toggle AI assistant"
        >
          <Bot size={16} />
          <span>AI Assistant</span>
        </button>
        <button 
          className="flex items-center space-x-1 text-sm text-textSecondary dark:text-gray-300 hover:text-accent dark:hover:text-blue-400 transition-colors duration-200"
          aria-label="Collaborate"
        >
          <Users size={16} />
          <span>Collaborate</span>
        </button>
        <button 
          className="flex items-center space-x-1 text-sm text-textSecondary dark:text-gray-300 hover:text-accent dark:hover:text-blue-400 transition-colors duration-200"
          aria-label="Analytics"
        >
          <ActivitySquare size={16} />
          <span>Analytics</span>
        </button>
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-xs text-textSecondary dark:text-gray-300">Connected</span>
        <span className="h-2 w-2 rounded-full bg-green-500"></span>
      </div>
    </div>
  );
};

export default BottomActionBar;
