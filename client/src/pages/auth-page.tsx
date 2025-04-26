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
          <div className="absolute inset-0 flex flex-col justify-center p-12 z-10">
            <h1 className="text-4xl font-bold font-inter mb-4">
              DevSandbox
            </h1>
            <p className="text-xl mb-8 max-w-md">
              We provide IDEs with built-in AI — like Replit, but smarter.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Code Anywhere</h3>
                  <p className="text-white text-opacity-80">Access your development environment from any browser</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI Assistance</h3>
                  <p className="text-white text-opacity-80">Get intelligent code suggestions and debugging help</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Real-time Collaboration</h3>
                  <p className="text-white text-opacity-80">Work together with your team in real-time</p>
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
          
          {/* Code Sample */}
          <div className="absolute bottom-8 right-8 max-w-md bg-gray-900 bg-opacity-80 rounded-lg p-4 shadow-xl">
            <pre className="text-xs font-mono text-green-400">
              <code>{`import { useAI } from "@devsandbox/ai";

function CodeAssistant() {
  const { suggest, debug } = useAI();
  
  return (
    <div>
      <button onClick={suggest}>
        Get suggestions
      </button>
      <button onClick={debug}>
        Debug my code
      </button>
    </div>
  );
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;