import React, { useState } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Form validation schemas
const loginSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const registerSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const AuthPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("login");

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle login submission
  function onLoginSubmit(values: LoginFormValues) {
    // Here you would typically handle login API call
    console.log("Login values", values);
    toast({
      title: "Login successful",
      description: "Welcome back to DevSandbox!",
    });
    
    // Redirect to the main editor page
    setLocation("/");
  }

  // Handle registration submission
  function onRegisterSubmit(values: RegisterFormValues) {
    // Here you would typically handle registration API call
    console.log("Register values", values);
    toast({
      title: "Registration successful",
      description: "Your account has been created!",
    });
    
    // Redirect to the main editor page
    setLocation("/");
  }

  return (
    <div className="flex min-h-screen bg-primary dark:bg-gray-900">
      {/* Left column - Auth form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-inter text-textPrimary dark:text-white tracking-tight">
              Welcome to DevSandbox
            </h2>
            <p className="mt-2 text-sm text-textSecondary dark:text-gray-400">
              Sign in or create a new account to access our AI-powered cloud IDE
            </p>
          </div>

          <Tabs 
            defaultValue="login" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-4">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                  <FormField
                    control={loginForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-textPrimary dark:text-white">Username</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your username" 
                            {...field} 
                            className="bg-white dark:bg-gray-800"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-textPrimary dark:text-white">Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="Your password" 
                            {...field} 
                            className="bg-white dark:bg-gray-800"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-blue-600 text-white transition-colors"
                  >
                    Sign in
                  </Button>
                </form>
              </Form>
              <div className="text-center">
                <button 
                  type="button"
                  className="text-sm text-accent hover:text-blue-600 dark:text-blue-400"
                  onClick={() => setActiveTab("register")}
                >
                  Don't have an account? Register here
                </button>
              </div>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register" className="space-y-4">
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                  <FormField
                    control={registerForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-textPrimary dark:text-white">Username</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Choose a username" 
                            {...field} 
                            className="bg-white dark:bg-gray-800"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-textPrimary dark:text-white">Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="Your email address" 
                            {...field} 
                            className="bg-white dark:bg-gray-800"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-textPrimary dark:text-white">Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="Create a password" 
                            {...field} 
                            className="bg-white dark:bg-gray-800"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-textPrimary dark:text-white">Confirm Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="Confirm your password" 
                            {...field} 
                            className="bg-white dark:bg-gray-800"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-blue-600 text-white transition-colors"
                  >
                    Create Account
                  </Button>
                </form>
              </Form>
              <div className="text-center">
                <button 
                  type="button"
                  className="text-sm text-accent hover:text-blue-600 dark:text-blue-400"
                  onClick={() => setActiveTab("login")}
                >
                  Already have an account? Sign in
                </button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right column - Hero/Preview */}
      <div className="hidden lg:flex flex-1 bg-accent text-white">
        <div className="relative w-full h-full overflow-hidden">
          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-start pt-12 p-12 z-10 overflow-y-auto">
            <h1 className="text-4xl font-bold font-inter mb-2 animate-scale-in">
              DevSandbox
            </h1>
            <p className="text-xl mb-8 max-w-md animate-scale-in opacity-90">
              We provide IDEs with built-in AI — like Replit, but smarter.
            </p>
            
            {/* Feature Highlights with Animations */}
            <div className="space-y-6 mb-12">
              <div className="flex items-start space-x-3 animate-scale-in" style={{ animationDelay: '100ms' }}>
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Code Anywhere</h3>
                  <p className="text-white text-opacity-80">Access your development environment from any browser</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 animate-scale-in" style={{ animationDelay: '200ms' }}>
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot animate-pulse"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI Assistance</h3>
                  <p className="text-white text-opacity-80">Get intelligent code suggestions and debugging help</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 animate-scale-in" style={{ animationDelay: '300ms' }}>
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Real-time Collaboration</h3>
                  <p className="text-white text-opacity-80">Work together with your team in real-time</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 animate-scale-in" style={{ animationDelay: '400ms' }}>
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rocket"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Deploy Instantly</h3>
                  <p className="text-white text-opacity-80">Launch your applications with one click</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 animate-scale-in" style={{ animationDelay: '500ms' }}>
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-terminal-square animate-pulse" style={{ animationDelay: '1s' }}><path d="m7 11 2-2-2-2"></path><path d="M11 13h4"></path><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect></svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Integrated Terminal</h3>
                  <p className="text-white text-opacity-80">Full command-line access with smart completions</p>
                </div>
              </div>
            </div>
            
            {/* Start With Templates Section */}
            <div className="mb-8 animate-scale-in" style={{ animationDelay: '600ms' }}>
              <h2 className="text-xl font-bold mb-3">Start with Templates</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white bg-opacity-10 p-3 rounded-md hover:bg-opacity-20 transition-all cursor-pointer transform hover:-translate-y-1 duration-300">
                  <div className="flex items-center mb-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="24" height="24" rx="4" fill="#61DAFB" fillOpacity="0.2"/>
                      <path d="M12 13.915C13.0544 13.915 13.9091 13.0603 13.9091 12.0059C13.9091 10.9515 13.0544 10.0967 12 10.0967C10.9456 10.0967 10.0909 10.9515 10.0909 12.0059C10.0909 13.0603 10.9456 13.915 12 13.915Z" fill="#61DAFB"/>
                      <path d="M12 16.5967C16.9673 16.5967 21 14.5795 21 12.0059C21 9.43226 16.9673 7.41504 12 7.41504C7.03272 7.41504 3 9.43226 3 12.0059C3 14.5795 7.03272 16.5967 12 16.5967Z" stroke="#61DAFB" strokeWidth="1.5"/>
                      <path d="M9.0918 14.3012C11.5754 18.7485 14.8391 21.2121 16.4554 20.2266C18.0718 19.241 17.5609 15.2396 15.0773 10.7923C12.5937 6.34496 9.33002 3.88135 7.71367 4.86684C6.09731 5.85233 6.60821 9.85371 9.0918 14.3012Z" stroke="#61DAFB" strokeWidth="1.5"/>
                      <path d="M9.09178 9.7103C6.60819 14.1576 6.09729 18.159 7.71364 19.1445C9.33 20.13 12.5937 17.6664 15.0773 13.219C17.5609 8.77171 18.0718 4.77033 16.4554 3.78484C14.839 2.79935 11.5754 5.26296 9.09178 9.7103Z" stroke="#61DAFB" strokeWidth="1.5"/>
                    </svg>
                    <span className="ml-2 font-medium">React App</span>
                  </div>
                  <div className="text-xs text-white text-opacity-80">Start with a modern React application with Vite</div>
                </div>
                
                <div className="bg-white bg-opacity-10 p-3 rounded-md hover:bg-opacity-20 transition-all cursor-pointer transform hover:-translate-y-1 duration-300">
                  <div className="flex items-center mb-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="24" height="24" rx="4" fill="#3C873A" fillOpacity="0.2"/>
                      <path d="M12.0016 19.9993C11.8216 19.9993 11.6436 19.9553 11.4836 19.8713L8.8416 18.2953C8.5896 18.1553 8.7056 18.1013 8.7956 18.0713C9.1236 17.9513 9.1936 17.9233 9.5656 17.7073C9.5956 17.6893 9.6356 17.6993 9.6656 17.7153L11.7416 18.9973C11.7836 19.0213 11.8456 19.0213 11.8856 19.0033L19.1016 14.8213C19.1416 14.7953 19.1676 14.7473 19.1676 14.6993V6.34134C19.1676 6.29134 19.1416 6.24534 19.0996 6.21734L11.8856 2.04134C11.8436 2.01534 11.7836 2.01534 11.7416 2.04134L4.5296 6.21734C4.4856 6.24534 4.4616 6.29334 4.4616 6.33934V14.6973C4.4616 14.7453 4.4856 14.7933 4.5276 14.8193L6.6376 16.0553C7.4576 16.4853 7.9536 16.0293 7.9536 15.5693V6.88734C7.9536 6.79734 8.0256 6.72334 8.1176 6.72334H9.0816C9.1716 6.72334 9.2456 6.79734 9.2456 6.88734V15.5693C9.2456 16.6093 8.6696 17.2013 7.6856 17.2013C7.3896 17.2013 7.1516 17.2013 6.4596 16.8433L4.4436 15.6673C4.1176 15.4793 3.9156 15.1413 3.9156 14.7793V6.42134C3.9156 6.05934 4.1156 5.72334 4.4436 5.53334L11.6596 1.35134C11.9776 1.17134 12.3776 1.17134 12.6936 1.35134L19.9096 5.53334C20.2376 5.72134 20.4396 6.05934 20.4396 6.42134V14.7793C20.4396 15.1413 20.2396 15.4773 19.9096 15.6673L12.6936 19.8493C12.5356 19.9353 12.3576 19.9793 12.1776 19.9793L12.0016 19.9993Z" fill="#3C873A"/>
                      <path d="M13.4456 14.6696C10.5676 14.6696 9.9616 13.3096 9.9616 12.1756C9.9616 12.0856 10.0356 12.0116 10.1276 12.0116H11.1096C11.1896 12.0116 11.2576 12.0716 11.2576 12.1476C11.3876 12.9356 11.7156 13.3276 13.4456 13.3276C14.7916 13.3276 15.3236 13.0396 15.3236 12.2396C15.3236 11.7676 15.1356 11.4336 12.9976 11.2576C11.1836 11.1056 10.0036 10.6956 10.0036 9.15164C10.0036 7.72164 11.2216 6.89764 13.2316 6.89764C15.4636 6.89764 16.5936 7.66564 16.7476 9.33564C16.7476 9.38164 16.7316 9.42564 16.7016 9.46164C16.6716 9.49564 16.6296 9.51764 16.5856 9.51764H15.5996C15.5236 9.51764 15.4576 9.46164 15.4476 9.38764C15.2256 8.48164 14.7776 8.23964 13.2296 8.23964C11.4896 8.23964 11.2796 8.68364 11.2796 9.13764C11.2796 9.67764 11.5196 9.82764 13.5436 10.0556C15.5576 10.2816 16.5996 10.6756 16.5996 12.1936C16.5996 13.7376 15.3036 14.6716 13.4436 14.6716L13.4456 14.6696Z" fill="#3C873A"/>
                    </svg>
                    <span className="ml-2 font-medium">Node.js API</span>
                  </div>
                  <div className="text-xs text-white text-opacity-80">Express.js API with structured routes & middleware</div>
                </div>
                
                <div className="bg-white bg-opacity-10 p-3 rounded-md hover:bg-opacity-20 transition-all cursor-pointer transform hover:-translate-y-1 duration-300">
                  <div className="flex items-center mb-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="24" height="24" rx="4" fill="#41B883" fillOpacity="0.2"/>
                      <path d="M17.9273 3.0293H12L6.07273 13.9247L3.63637 9.47702H0L6.07273 21.0002L12.1455 10.1048L14.4 14.3111H18.0364L12 3.0293H17.9273Z" fill="#41B883"/>
                      <path d="M17.9273 3.0293H12L6.07273 13.9247L3.63637 9.47702H0L6.07273 21.0002L12 3.0293H17.9273Z" fill="#41B883"/>
                      <path d="M12 3.0293L6.07273 13.9247L3.63637 9.47702H0L6.07273 21.0002L12 3.0293Z" fill="#35495E"/>
                    </svg>
                    <span className="ml-2 font-medium">Vue.js App</span>
                  </div>
                  <div className="text-xs text-white text-opacity-80">Modern Vue 3 app with Composition API</div>
                </div>
                
                <div className="bg-white bg-opacity-10 p-3 rounded-md hover:bg-opacity-20 transition-all cursor-pointer transform hover:-translate-y-1 duration-300">
                  <div className="flex items-center mb-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="24" height="24" rx="4" fill="#0078D7" fillOpacity="0.2"/>
                      <path d="M3 3L11.2857 3L11.2857 11.2857L3 11.2857L3 3Z" fill="#0078D7"/>
                      <path d="M12.7144 3H21.0001V11.2857H12.7144V3Z" fill="#0078D7"/>
                      <path d="M3 12.7144H11.2857V21.0001H3V12.7144Z" fill="#0078D7"/>
                      <path d="M12.7144 12.7144H21.0001V21.0001H12.7144V12.7144Z" fill="#0078D7"/>
                    </svg>
                    <span className="ml-2 font-medium">Full-Stack App</span>
                  </div>
                  <div className="text-xs text-white text-opacity-80">Complete app with frontend, backend & database</div>
                </div>
              </div>
            </div>
            
            {/* Live Collaboration Preview */}
            <div className="animate-scale-in" style={{ animationDelay: '700ms' }}>
              <h2 className="text-xl font-bold mb-3">Real-time Collaboration</h2>
              <div className="bg-white bg-opacity-10 p-4 rounded-md">
                <div className="flex items-center mb-4">
                  <div className="flex -space-x-2 mr-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs border-2 border-accent">AK</div>
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs border-2 border-accent">JS</div>
                    <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs border-2 border-accent">TM</div>
                  </div>
                  <div className="text-sm font-medium">3 collaborators online</div>
                </div>
                <div className="h-20 rounded border border-white border-opacity-20 bg-white bg-opacity-5 flex flex-col">
                  <div className="text-xs p-1 bg-accent bg-opacity-30 border-b border-white border-opacity-20">
                    index.js
                  </div>
                  <div className="p-2 font-mono text-xs">
                    <div className="flex">
                      <div className="text-gray-400 mr-2">1</div>
                      <div>import <span className="text-blue-300">express</span> from <span className="text-green-300">'express'</span>;</div>
                    </div>
                    <div className="flex">
                      <div className="text-gray-400 mr-2">2</div>
                      <div>const app = <span className="text-blue-300">express</span>();</div>
                    </div>
                    <div className="flex">
                      <div className="text-gray-400 mr-2">3</div>
                      <div className="relative group"><span className="bg-purple-500 bg-opacity-30 px-1 -mx-1 rounded">app.listen(3000);</span>
                      <div className="absolute left-full ml-2 top-0 text-xs bg-purple-500 rounded px-1 py-0.5 opacity-70">
                        AK
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 z-0 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          {/* Floating IDE Elements */}
          <div className="absolute bottom-12 right-12 animate-float-slow">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
              <rect width="120" height="120" rx="8" fill="#1E293B" />
              <rect x="10" y="10" width="100" height="12" rx="2" fill="#334155" />
              <circle cx="18" cy="16" r="4" fill="#F87171" />
              <circle cx="32" cy="16" r="4" fill="#FBBF24" />
              <circle cx="46" cy="16" r="4" fill="#34D399" />
              <rect x="10" y="30" width="40" height="80" rx="2" fill="#334155" />
              <rect x="55" y="30" width="55" height="40" rx="2" fill="#334155" />
              <rect x="55" y="75" width="55" height="35" rx="2" fill="#334155" />
              <rect x="15" y="40" width="30" height="3" rx="1" fill="#94A3B8" />
              <rect x="15" y="48" width="25" height="3" rx="1" fill="#94A3B8" />
              <rect x="15" y="56" width="28" height="3" rx="1" fill="#94A3B8" />
              <rect x="15" y="64" width="20" height="3" rx="1" fill="#94A3B8" />
              <rect x="60" y="40" width="45" height="3" rx="1" fill="#94A3B8" />
              <rect x="60" y="48" width="35" height="3" rx="1" fill="#94A3B8" />
              <rect x="60" y="56" width="40" height="3" rx="1" fill="#94A3B8" />
              <rect x="60" y="85" width="45" height="3" rx="1" fill="#94A3B8" />
              <rect x="60" y="93" width="35" height="3" rx="1" fill="#94A3B8" />
              <rect x="60" y="101" width="25" height="3" rx="1" fill="#94A3B8" />
            </svg>
          </div>
          
          {/* Floating Terminal */}
          <div className="absolute bottom-16 left-16 animate-float">
            <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
              <rect width="100" height="80" rx="6" fill="#111827" />
              <rect x="5" y="5" width="90" height="15" rx="2" fill="#1F2937" />
              <circle cx="12" cy="12" r="3" fill="#F87171" />
              <circle cx="22" cy="12" r="3" fill="#FBBF24" />
              <circle cx="32" cy="12" r="3" fill="#34D399" />
              <rect x="8" y="30" width="10" height="3" rx="1" fill="#06B6D4" />
              <rect x="20" y="30" width="50" height="3" rx="1" fill="#94A3B8" />
              <rect x="8" y="38" width="10" height="3" rx="1" fill="#06B6D4" />
              <rect x="20" y="38" width="60" height="3" rx="1" fill="#94A3B8" />
              <rect x="8" y="46" width="10" height="3" rx="1" fill="#06B6D4" />
              <rect x="20" y="46" width="40" height="3" rx="1" fill="#94A3B8" />
              <rect x="8" y="54" width="10" height="3" rx="1" fill="#06B6D4" />
              <rect x="20" y="54" width="1" height="3" rx="0.5" fill="#94A3B8" className="animate-cursor" />
            </svg>
          </div>
          
          {/* Floating AI Assistant */}
          <div className="absolute top-16 right-24 animate-float-delayed">
            <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
              <rect width="120" height="100" rx="6" fill="#312E81" />
              <rect x="8" y="8" width="104" height="18" rx="3" fill="#4338CA" />
              <circle cx="17" cy="17" r="5" fill="#818CF8" />
              <rect x="27" y="14" width="60" height="6" rx="3" fill="#C7D2FE" />
              <rect x="8" y="34" width="50" height="8" rx="2" fill="#4338CA" />
              <rect x="8" y="50" width="104" height="40" rx="3" fill="#4338CA" />
              <path d="M16 60C16 58.3431 17.3431 57 19 57H49C50.6569 57 52 58.3431 52 60V80C52 81.6569 50.6569 83 49 83H19C17.3431 83 16 81.6569 16 80V60Z" fill="#818CF8" />
              <rect x="58" y="57" width="46" height="8" rx="2" fill="#C7D2FE" />
              <rect x="58" y="70" width="46" height="8" rx="2" fill="#C7D2FE" />
              <path d="M25 65L30 70L25 75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M38 65L33 70L38 75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;