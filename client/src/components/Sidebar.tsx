import React from "react";
import { 
  FolderIcon, 
  FileIcon, 
  FileTextIcon, 
  FileCodeIcon, 
  PlusIcon,
  GitBranchIcon,
  Ampersands,
  Code
} from "lucide-react";
import { cn } from "@/lib/utils";

interface File {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: File[];
  language?: string;
}

interface SidebarProps {
  files: File[];
  activeFile: string;
  onFileSelect: (fileId: string) => void;
  className?: string;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  files,
  activeFile,
  onFileSelect,
  className,
  isOpen
}) => {
  if (!isOpen) return null;
  
  return (
    <div className={cn(
      "w-56 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300",
      className
    )}>
      <div className="p-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-inter font-semibold text-sm text-textPrimary dark:text-white">PROJECT FILES</h2>
        <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
          <PlusIcon size={16} className="text-textSecondary dark:text-gray-300" />
        </button>
      </div>
      
      <div className="overflow-y-auto flex-1 py-2">
        <FileTree 
          files={files} 
          activeFile={activeFile} 
          onFileSelect={onFileSelect}
          level={0}
        />
      </div>
      
      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <GitBranchIcon size={14} className="text-textSecondary dark:text-gray-300" />
          <span className="text-xs text-textSecondary dark:text-gray-300">main</span>
        </div>
      </div>
    </div>
  );
};

interface FileTreeProps {
  files: File[];
  activeFile: string;
  onFileSelect: (fileId: string) => void;
  level: number;
}

const FileTree: React.FC<FileTreeProps> = ({ files, activeFile, onFileSelect, level }) => {
  return (
    <ul className={cn(
      "space-y-1", 
      level === 0 ? "px-2" : "ml-4 mt-1"
    )}>
      {files.map((file) => (
        <li key={file.id}>
          {file.type === "folder" ? (
            <>
              <div className="flex items-center px-2 py-1 text-sm rounded-md font-medium text-textPrimary dark:text-white">
                <FolderIcon size={16} className="mr-2 text-textSecondary dark:text-gray-300" />
                {file.name}
              </div>
              {file.children && (
                <FileTree 
                  files={file.children} 
                  activeFile={activeFile} 
                  onFileSelect={onFileSelect}
                  level={level + 1}
                />
              )}
            </>
          ) : (
            <div 
              onClick={() => onFileSelect(file.id)}
              className={cn(
                "flex items-center px-2 py-1 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer",
                activeFile === file.id && "bg-secondary dark:bg-gray-700"
              )}
            >
              {getFileIcon(file)}
              {file.name}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

const getFileIcon = (file: File) => {
  const iconSize = 16;
  const className = "mr-2";
  
  switch (file.language) {
    case "javascript":
      return <Ampersands size={iconSize} className={cn(className, "text-yellow-500")} />;
    case "css":
      return <Code size={iconSize} className={cn(className, "text-blue-500")} />;
    case "markdown":
      return <FileTextIcon size={iconSize} className={cn(className, "text-textSecondary dark:text-gray-300")} />;
    case "vue":
      return <div className={cn(className, "w-4 h-4 flex items-center justify-center")}>
        <svg viewBox="0 0 24 24" width="16" height="16" className="text-green-500">
          <path fill="currentColor" d="M19.197 1.608l.003-.006h-4.425L12 6.4v.002l-2.772-4.8H4.803v.005H0l12 20.786L24 1.608h-4.803zM3.04 3.01h2.995L12 15.978 17.965 3.01h2.995L12 18.591 3.04 3.01z" />
        </svg>
      </div>;
    case "git":
      return <GitBranchIcon size={iconSize} className={cn(className, "text-textSecondary dark:text-gray-300")} />;
    case "json":
      return <FileCodeIcon size={iconSize} className={cn(className, "text-textSecondary dark:text-gray-300")} />;
    default:
      return <FileIcon size={iconSize} className={cn(className, "text-textSecondary dark:text-gray-300")} />;
  }
};

export default Sidebar;
