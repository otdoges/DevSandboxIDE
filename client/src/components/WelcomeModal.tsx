import React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  onClose,
  className
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={cn(
        "bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-colors duration-300 animate-fadeIn",
        className
      )}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="text-3xl gradient-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="4" fill="url(#paint0_linear)" />
                  <path d="M17.5 7.5L9.5 15.5L6.5 12.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="paint0_linear" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2563EB" />
                      <stop offset="1" stopColor="#818CF8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h2 className="text-2xl font-bold font-inter text-textPrimary dark:text-white">Welcome to DevSandbox</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Close welcome modal"
            >
              <X size={20} className="text-textSecondary dark:text-gray-300" />
            </button>
          </div>
          
          <p className="text-lg text-textSecondary dark:text-gray-300 mb-8 font-open">
            We provide IDEs with built-in AI — like Replit, but smarter.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Feature 1 */}
            <div className="depth-effect bg-primary dark:bg-gray-700 rounded-lg p-5 transition-all duration-300">
              <div className="mb-4 flex justify-center">
                <svg className="h-40 w-auto" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M180 40H20C15.5817 40 12 43.5817 12 48V140C12 144.418 15.5817 148 20 148H180C184.418 148 188 144.418 188 140V48C188 43.5817 184.418 40 180 40Z" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2"/>
                  <rect x="20" y="55" width="152" height="10" rx="2" fill="#BFDBFE"/>
                  <rect x="20" y="75" width="152" height="10" rx="2" fill="#BFDBFE"/>
                  <rect x="20" y="95" width="100" height="10" rx="2" fill="#BFDBFE"/>
                  <circle cx="168" cy="60" r="8" fill="#2563EB"/>
                  <path d="M172 56L166 64" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M166 56L172 64" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="168" cy="80" r="8" fill="#2563EB"/>
                  <path d="M164 80H172" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="168" cy="100" r="8" fill="#2563EB"/>
                  <path d="M168 96V104" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M164 100H172" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M56 8L62 20H50L56 8Z" fill="#2563EB"/>
                  <circle cx="104" cy="12" r="8" fill="#3B82F6"/>
                  <rect x="132" y="8" width="16" height="8" rx="4" fill="#BFDBFE"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold font-inter text-textPrimary dark:text-white mb-2">AI Chat Assistant</h3>
              <p className="text-sm text-textSecondary dark:text-gray-300">Get real-time coding help, debugging assistance, and intelligent suggestions from our built-in AI assistant.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="depth-effect bg-primary dark:bg-gray-700 rounded-lg p-5 transition-all duration-300">
              <div className="mb-4 flex justify-center">
                <svg className="h-40 w-auto" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="20" y="30" width="160" height="100" rx="8" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2"/>
                  <rect x="30" y="45" width="140" height="25" rx="4" fill="#BFDBFE"/>
                  <circle cx="45" cy="57.5" r="7.5" fill="#2563EB"/>
                  <circle cx="70" cy="57.5" r="7.5" fill="#3B82F6"/>
                  <circle cx="95" cy="57.5" r="7.5" fill="#60A5FA"/>
                  <rect x="30" y="80" width="65" height="40" rx="4" fill="#BFDBFE"/>
                  <rect x="105" y="80" width="65" height="40" rx="4" fill="#BFDBFE"/>
                  <path d="M45 92L50 98L45 104" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M60 92L55 98L60 104" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M120 92L125 98L120 104" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M135 92L130 98L135 104" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold font-inter text-textPrimary dark:text-white mb-2">Real-Time Collaboration</h3>
              <p className="text-sm text-textSecondary dark:text-gray-300">Code together with your team in real-time, just like Google Docs but for development projects.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="depth-effect bg-primary dark:bg-gray-700 rounded-lg p-5 transition-all duration-300">
              <div className="mb-4 flex justify-center">
                <svg className="h-40 w-auto" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="30" y="30" width="140" height="100" rx="8" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2"/>
                  <rect x="40" y="45" width="120" height="70" rx="4" fill="#BFDBFE"/>
                  <path d="M55 55H60L70 85H65L55 55Z" fill="#2563EB"/>
                  <path d="M75 55H80L90 85H85L75 55Z" fill="#3B82F6"/>
                  <path d="M100 55H140" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M50 65H95" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M105 65H140" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M50 75H70" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M80 75H120" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M130 75H140" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M50 85H90" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M100 85H140" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold font-inter text-textPrimary dark:text-white mb-2">Advanced Syntax Support</h3>
              <p className="text-sm text-textSecondary dark:text-gray-300">Enjoy syntax highlighting for multiple programming languages with intelligent code completion.</p>
            </div>
            
            {/* Feature 4 */}
            <div className="depth-effect bg-primary dark:bg-gray-700 rounded-lg p-5 transition-all duration-300">
              <div className="mb-4 flex justify-center">
                <svg className="h-40 w-auto" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="30" y="30" width="140" height="100" rx="8" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2"/>
                  <rect x="40" y="45" width="50" height="30" rx="4" fill="#BFDBFE"/>
                  <rect x="100" y="45" width="60" height="30" rx="4" fill="#BFDBFE"/>
                  <rect x="40" y="85" width="120" height="35" rx="4" fill="#BFDBFE"/>
                  <path d="M50 55L55 60L70 50" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M110 55L120 65L130 45" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M50 95H150" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M50 105H110" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M120 105H150" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold font-inter text-textPrimary dark:text-white mb-2">Analytics Dashboard</h3>
              <p className="text-sm text-textSecondary dark:text-gray-300">Track project usage, performance insights, and team collaboration metrics all in one place.</p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={onClose}
              className="px-6 py-3 bg-accent hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 font-inter shadow-md"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
