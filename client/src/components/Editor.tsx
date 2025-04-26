import React, { useState } from "react";
import { 
  X,
  Ampersands,
  Code
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SyntaxHighlighter } from "@/components/ui/syntax-highlighter";

interface EditorFile {
  id: string;
  name: string;
  language: string;
  content: string;
}

interface EditorProps {
  files: EditorFile[];
  activeFileId: string;
  onFileSelect: (fileId: string) => void;
  onFileClose: (fileId: string) => void;
  className?: string;
}

const Editor: React.FC<EditorProps> = ({
  files,
  activeFileId,
  onFileSelect,
  onFileClose,
  className
}) => {
  const activeFile = files.find(file => file.id === activeFileId);
  const openFiles = files.filter(file => file.id === activeFileId || file.pinned);
  
  return (
    <div className={cn(
      "flex-1 flex flex-col overflow-hidden",
      className
    )}>
      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex overflow-x-auto transition-colors duration-300">
        {openFiles.map((file) => (
          <div 
            key={file.id}
            className={cn(
              "px-4 py-2 flex items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200",
              file.id === activeFileId && "active-tab"
            )}
            onClick={() => onFileSelect(file.id)}
          >
            {getFileIcon(file.language)}
            <span className="text-sm text-textPrimary dark:text-white">{file.name}</span>
            <button 
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                onFileClose(file.id);
              }}
              aria-label={`Close ${file.name}`}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      
      {/* Code Editor Content */}
      <div className="flex-1 overflow-auto bg-white dark:bg-gray-900 p-4 font-mono text-sm transition-colors duration-300">
        {activeFile ? (
          <SyntaxHighlighter
            code={activeFile.content}
            language={activeFile.language}
            lineNumbers={true}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No file selected
          </div>
        )}
      </div>
    </div>
  );
};

// Helper to get appropriate file icon
const getFileIcon = (language: string) => {
  const iconSize = 16;
  
  switch (language) {
    case "javascript":
      return <Ampersands size={iconSize} className="text-yellow-500" />;
    case "css":
      return <Code size={iconSize} className="text-blue-500" />;
    case "vue":
      return (
        <svg viewBox="0 0 24 24" width={iconSize} height={iconSize} className="text-green-500">
          <path fill="currentColor" d="M19.197 1.608l.003-.006h-4.425L12 6.4v.002l-2.772-4.8H4.803v.005H0l12 20.786L24 1.608h-4.803zM3.04 3.01h2.995L12 15.978 17.965 3.01h2.995L12 18.591 3.04 3.01z" />
        </svg>
      );
    default:
      return null;
  }
};

export default Editor;
