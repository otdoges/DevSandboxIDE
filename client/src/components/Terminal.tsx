import React, { useState } from "react";
import { 
  Plus, 
  Minus, 
  X,
  TerminalSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Terminal as TerminalUI } from "@/components/ui/terminal";

interface TerminalContainerProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  className?: string;
}

const TerminalContainer: React.FC<TerminalContainerProps> = ({
  isOpen,
  onToggle,
  onClose,
  className
}) => {
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    '$ npm install',
    '> Installing dependencies...',
    '> Success!',
    '$ '
  ]);
  
  const handleCommand = (command: string) => {
    // Example command handling
    if (command.startsWith("npm")) {
      setTerminalHistory(prev => [
        ...prev, 
        `> Running ${command}...`, 
        '> Done',
        '$ '
      ]);
    } else if (command.startsWith("git")) {
      setTerminalHistory(prev => [
        ...prev, 
        `> Git operation: ${command}`, 
        '> Completed successfully',
        '$ '
      ]);
    } else {
      setTerminalHistory(prev => [
        ...prev, 
        `> Command not recognized: ${command}`, 
        '$ '
      ]);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className={cn(
        "h-56 border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex flex-col transition-all duration-300",
        className
      )}
    >
      <div className="p-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <TerminalSquare size={16} className="text-textSecondary dark:text-gray-300" />
          <span className="text-sm font-medium text-textPrimary dark:text-white">Terminal</span>
        </div>
        <div className="flex items-center space-x-1">
          <button 
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="New terminal"
          >
            <Plus size={14} className="text-textSecondary dark:text-gray-300" />
          </button>
          <button 
            onClick={onToggle}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Minimize terminal"
          >
            <Minus size={14} className="text-textSecondary dark:text-gray-300" />
          </button>
          <button 
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Close terminal"
          >
            <X size={14} className="text-textSecondary dark:text-gray-300" />
          </button>
        </div>
      </div>
      
      <TerminalUI 
        initialHistory={terminalHistory}
        onCommand={handleCommand}
      />
    </div>
  );
};

export default TerminalContainer;
