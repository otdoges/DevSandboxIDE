import React from "react";
import { cn } from "@/lib/utils";

type SyntaxHighlighterProps = {
  code: string;
  language: string;
  lineNumbers?: boolean;
  className?: string;
};

// Simple syntax highlighter component that highlights keywords in different languages
const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({
  code,
  language,
  lineNumbers = true,
  className,
}) => {
  // Parse the code into lines
  const lines = code.split("\n");
  
  // Get language-specific patterns for highlighting
  const patterns = getSyntaxPatterns(language);

  // Apply syntax highlighting
  const highlightedLines = lines.map((line, index) => {
    let highlightedLine = line;
    
    // Apply each pattern to highlight the line
    patterns.forEach((pattern) => {
      highlightedLine = highlightedLine.replace(
        pattern.regex,
        (match) => `<span class="${pattern.className}">${match}</span>`
      );
    });

    return (
      <div key={index} className="editor-line flex">
        {lineNumbers && (
          <div className="text-gray-400 dark:text-gray-500 pr-4 select-none text-right w-8">
            {index + 1}
          </div>
        )}
        <div 
          className="flex-1 text-textPrimary dark:text-darkTextPrimary overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: highlightedLine }}
        />
      </div>
    );
  });

  return (
    <div className={cn("font-mono text-sm", className)}>
      {highlightedLines}
    </div>
  );
};

// Define syntax highlighting patterns for different languages
const getSyntaxPatterns = (language: string) => {
  const patterns = [];

  // Common patterns for most languages
  patterns.push({ 
    regex: /(\/\/.*|\/\*[\s\S]*?\*\/|#.*)/g, 
    className: "text-purple-600 dark:text-purple-400" 
  }); // Comments
  patterns.push({ 
    regex: /(['"])(?:\\.|[^\\])*?\1/g, 
    className: "text-green-600 dark:text-green-400" 
  }); // Strings

  // Language-specific patterns
  switch (language.toLowerCase()) {
    case "javascript":
    case "js":
    case "typescript":
    case "ts":
      patterns.push({ 
        regex: /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|default|async|await)\b/g, 
        className: "text-blue-600 dark:text-blue-400" 
      }); // Keywords
      patterns.push({ 
        regex: /\b(true|false|null|undefined|NaN)\b/g, 
        className: "text-orange-600 dark:text-orange-400" 
      }); // Literals
      patterns.push({ 
        regex: /\b(new|this)\b/g, 
        className: "text-blue-600 dark:text-blue-400" 
      }); // Special keywords
      patterns.push({ 
        regex: /\b(console|Math|Object|Array|String|Number|Boolean|Date|RegExp)\b/g, 
        className: "text-textPrimary dark:text-darkTextPrimary" 
      }); // Built-in objects
      patterns.push({ 
        regex: /\b([A-Za-z_$][A-Za-z0-9_$]*)\s*\(/g, 
        className: "text-yellow-600 dark:text-yellow-400" 
      }); // Function calls
      break;
      
    case "css":
      patterns.push({ 
        regex: /([a-z-]+)\s*:/g, 
        className: "text-blue-600 dark:text-blue-400" 
      }); // Properties
      patterns.push({ 
        regex: /([\.\#][a-zA-Z-_0-9]+)/g, 
        className: "text-pink-600 dark:text-pink-400" 
      }); // Selectors
      patterns.push({ 
        regex: /(@\w+)/g, 
        className: "text-purple-600 dark:text-purple-400" 
      }); // At-rules
      break;
      
    case "html":
    case "vue":
    case "jsx":
    case "tsx":
      patterns.push({ 
        regex: /(&lt;\/?[a-zA-Z0-9-]+)/g, 
        className: "text-blue-600 dark:text-blue-400" 
      }); // Tags
      patterns.push({ 
        regex: /([a-zA-Z-]+)=/g, 
        className: "text-green-600 dark:text-green-400" 
      }); // Attributes
      patterns.push({ 
        regex: /(&lt;\/?\s*template|script|style)(&gt;)?/g, 
        className: "text-pink-600 dark:text-pink-400" 
      }); // Vue specific
      break;
      
    default:
      // Generic fallback patterns
      patterns.push({ 
        regex: /\b([A-Z][a-zA-Z0-9_$]*)\b/g, 
        className: "text-textPrimary dark:text-darkTextPrimary" 
      }); // Classes/Types
  }

  return patterns;
};

export { SyntaxHighlighter };
