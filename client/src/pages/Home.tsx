import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Editor from "@/components/Editor";
import TerminalContainer from "@/components/Terminal";
import AIChatAssistant from "@/components/AIChatAssistant";
import BottomActionBar from "@/components/BottomActionBar";
import WelcomeModal from "@/components/WelcomeModal";

// Sample data for the file explorer
const initialFiles = [
  {
    id: "src",
    name: "src",
    type: "folder" as const,
    children: [
      {
        id: "index-js",
        name: "index.js",
        type: "file" as const,
        language: "javascript"
      },
      {
        id: "styles-css",
        name: "styles.css",
        type: "file" as const,
        language: "css"
      },
      {
        id: "app-vue",
        name: "app.vue",
        type: "file" as const,
        language: "vue"
      }
    ]
  },
  {
    id: "components",
    name: "components",
    type: "folder" as const,
    children: [
      {
        id: "header-vue",
        name: "Header.vue",
        type: "file" as const,
        language: "vue"
      },
      {
        id: "footer-vue",
        name: "Footer.vue",
        type: "file" as const,
        language: "vue"
      }
    ]
  },
  {
    id: "readme-md",
    name: "README.md",
    type: "file" as const,
    language: "markdown"
  },
  {
    id: "package-json",
    name: "package.json",
    type: "file" as const,
    language: "json"
  },
  {
    id: "gitignore",
    name: ".gitignore",
    type: "file" as const,
    language: "git"
  }
];

// Sample content for editor files
const editorFiles = [
  {
    id: "index-js",
    name: "index.js",
    language: "javascript",
    content: `import Vue from 'vue';
import App from './app.vue';

/**
 * Initialize the Vue application
 * @param {Object} config - Configuration object
 * @returns {Vue} Vue instance
 */
const initApp = (config) => {
  return new Vue({
    el: '#app',
    render: h => h(App),
    ...config
  });
};

export default initApp;`
  },
  {
    id: "styles-css",
    name: "styles.css",
    language: "css",
    content: `/* Main application styles */
:root {
  --primary-color: #eff6ff;
  --secondary-color: #bfdbfe;
  --accent-color: #2563eb;
  --text-primary: #1e3a8a;
  --text-secondary: #3b82f6;
}

body {
  font-family: 'Open Sans', sans-serif;
  background-color: var(--primary-color);
  color: var(--text-primary);
  margin: 0;
}`
  },
  {
    id: "app-vue",
    name: "app.vue",
    language: "vue",
    content: `<template>
  <div class="app-container">
    <Header :user="currentUser" />
    <main>{{ content }}</main>
    <Footer :version="version" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: 'Welcome to DevSandbox!',
      version: '1.0.0',
      currentUser: {
        name: 'John Doe',
        avatar: '/avatar.png'
      }
    }
  }
}
</script>`
  },
  {
    id: "header-vue",
    name: "Header.vue",
    language: "vue",
    content: `<template>
  <header class="site-header">
    <div class="logo">DevSandbox</div>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/projects">Projects</a></li>
        <li><a href="/settings">Settings</a></li>
      </ul>
    </nav>
    <div class="user-info">
      <img :src="user.avatar" :alt="user.name" />
      <span>{{ user.name }}</span>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>`
  },
  {
    id: "footer-vue",
    name: "Footer.vue",
    language: "vue",
    content: `<template>
  <footer class="site-footer">
    <div>DevSandbox © 2023</div>
    <div>Version: {{ version }}</div>
  </footer>
</template>

<script>
export default {
  props: {
    version: {
      type: String,
      default: '1.0.0'
    }
  }
}
</script>`
  }
];

const Home: React.FC = () => {
  // State for UI toggles
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  
  // State for active file
  const [activeFileId, setActiveFileId] = useState<string>("index-js");
  const [openFiles, setOpenFiles] = useState(editorFiles);
  
  // Handle file selection
  const handleFileSelect = (fileId: string) => {
    setActiveFileId(fileId);
    
    // If file is not already open, add it to open files
    if (!openFiles.some(file => file.id === fileId)) {
      const fileToOpen = editorFiles.find(file => file.id === fileId);
      if (fileToOpen) {
        setOpenFiles([...openFiles, fileToOpen]);
      }
    }
  };
  
  // Handle file closing
  const handleFileClose = (fileId: string) => {
    const newOpenFiles = openFiles.filter(file => file.id !== fileId);
    setOpenFiles(newOpenFiles);
    
    // If we're closing the active file, select another one
    if (fileId === activeFileId && newOpenFiles.length > 0) {
      setActiveFileId(newOpenFiles[0].id);
    }
  };
  
  // Close welcome modal if user has seen it before
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (hasSeenWelcome) {
      setShowWelcomeModal(false);
    }
  }, []);
  
  // Save that the user has seen the welcome modal
  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
    localStorage.setItem("hasSeenWelcome", "true");
  };
  
  return (
    <div className="flex flex-col h-screen dark:bg-gray-900 bg-primary transition-colors duration-300">
      {/* Header */}
      <Header 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - File Explorer */}
        <Sidebar 
          files={initialFiles}
          activeFile={activeFileId}
          onFileSelect={handleFileSelect}
          isOpen={isSidebarOpen}
        />
        
        {/* Middle Section - Code Editor */}
        <Editor 
          files={editorFiles}
          activeFileId={activeFileId}
          onFileSelect={handleFileSelect}
          onFileClose={handleFileClose}
        />
        
        {/* Right Sidebar - AI Chat Assistant */}
        <AIChatAssistant 
          isOpen={isAIChatOpen}
          onClose={() => setIsAIChatOpen(false)}
        />
      </div>
      
      {/* Terminal */}
      <TerminalContainer 
        isOpen={isTerminalOpen}
        onToggle={() => setIsTerminalOpen(!isTerminalOpen)}
        onClose={() => setIsTerminalOpen(false)}
      />
      
      {/* Bottom Action Bar */}
      <BottomActionBar 
        onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
        onToggleAI={() => setIsAIChatOpen(!isAIChatOpen)}
        isTerminalOpen={isTerminalOpen}
        isAIOpen={isAIChatOpen}
      />
      
      {/* Welcome Modal */}
      <WelcomeModal 
        isOpen={showWelcomeModal}
        onClose={handleCloseWelcomeModal}
      />
    </div>
  );
};

export default Home;
