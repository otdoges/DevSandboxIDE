import React from "react";
import { 
  Menu, 
  Share, 
  UserPlus, 
  Moon, 
  Sun, 
  CodeIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/context/ThemeContext";

interface HeaderProps {
  toggleSidebar: () => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, className }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={cn(
      "bg-white dark:bg-gray-800 shadow-sm px-4 py-2 flex items-center justify-between transition-colors duration-300",
      className
    )}>
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="mr-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label="Toggle sidebar"
        >
          <Menu size={18} className="text-textPrimary dark:text-white" />
        </button>
        <div className="flex items-center space-x-2">
          <CodeIcon size={20} className="gradient-icon" />
          <h1 className="text-xl font-bold font-inter text-textPrimary dark:text-white">DevSandbox</h1>
        </div>
      </div>
      
      <div className="text-sm text-textSecondary dark:text-gray-300 italic hidden md:block">
        We provide IDEs with built-in AI — like Replit, but smarter.
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label="Share"
        >
          <Share size={18} className="text-textSecondary dark:text-gray-300" />
        </button>
        <button 
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label="Add collaborator"
        >
          <UserPlus size={18} className="text-textSecondary dark:text-gray-300" />
        </button>
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
          {theme === "light" ? (
            <Moon size={18} className="text-textSecondary dark:text-gray-300" />
          ) : (
            <Sun size={18} className="text-textSecondary dark:text-gray-300" />
          )}
        </button>
        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-medium text-sm">
          JS
        </div>
      </div>
    </header>
  );
};

export default Header;
