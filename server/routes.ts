import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertProjectSchema, insertFileSchema, insertCollaboratorSchema, insertAIConversationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Base API route
  const apiRouter = app.use("/api", (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
  });
  
  // Middleware to validate request body using a Zod schema
  const validateBody = (schema: z.ZodType<any, any>) => {
    return (req: Request, res: Response, next: Function) => {
      try {
        req.body = schema.parse(req.body);
        next();
      } catch (error) {
        if (error instanceof z.ZodError) {
          res.status(400).json({ 
            message: "Validation error", 
            errors: error.errors 
          });
        } else {
          next(error);
        }
      }
    };
  };
  
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });
  
  // User routes
  app.get("/api/users/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await storage.getUser(id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Don't return the password
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });
  
  app.post("/api/users", validateBody(insertUserSchema), async (req, res) => {
    try {
      // Check if username or email already exists
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }
      
      const existingEmail = await storage.getUserByEmail(req.body.email);
      if (existingEmail) {
        return res.status(409).json({ message: "Email already exists" });
      }
      
      const user = await storage.createUser(req.body);
      
      // Don't return the password
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Error creating user" });
    }
  });
  
  // Project routes
  app.get("/api/projects", async (req, res) => {
    const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
    
    if (userId) {
      const projects = await storage.getProjectsByUserId(userId);
      return res.json(projects);
    }
    
    return res.status(400).json({ message: "Missing userId query parameter" });
  });
  
  app.get("/api/projects/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const project = await storage.getProject(id);
    
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    res.json(project);
  });
  
  app.post("/api/projects", validateBody(insertProjectSchema), async (req, res) => {
    try {
      const project = await storage.createProject(req.body);
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ message: "Error creating project" });
    }
  });
  
  // File routes
  app.get("/api/files", async (req, res) => {
    const projectId = req.query.projectId ? parseInt(req.query.projectId as string) : undefined;
    
    if (projectId) {
      const files = await storage.getFilesByProjectId(projectId);
      return res.json(files);
    }
    
    return res.status(400).json({ message: "Missing projectId query parameter" });
  });
  
  app.get("/api/files/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const file = await storage.getFile(id);
    
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    
    res.json(file);
  });
  
  app.post("/api/files", validateBody(insertFileSchema), async (req, res) => {
    try {
      const file = await storage.createFile(req.body);
      res.status(201).json(file);
    } catch (error) {
      res.status(500).json({ message: "Error creating file" });
    }
  });
  
  app.put("/api/files/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const file = await storage.getFile(id);
    
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    
    try {
      const updatedFile = await storage.updateFile(id, req.body);
      res.json(updatedFile);
    } catch (error) {
      res.status(500).json({ message: "Error updating file" });
    }
  });
  
  // Collaborator routes
  app.get("/api/collaborators", async (req, res) => {
    const projectId = req.query.projectId ? parseInt(req.query.projectId as string) : undefined;
    const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
    
    if (projectId) {
      const collaborators = await storage.getCollaboratorsByProjectId(projectId);
      return res.json(collaborators);
    } else if (userId) {
      const collaborators = await storage.getCollaboratorsByUserId(userId);
      return res.json(collaborators);
    }
    
    return res.status(400).json({ message: "Missing projectId or userId query parameter" });
  });
  
  app.post("/api/collaborators", validateBody(insertCollaboratorSchema), async (req, res) => {
    try {
      const collaborator = await storage.createCollaborator(req.body);
      res.status(201).json(collaborator);
    } catch (error) {
      res.status(500).json({ message: "Error adding collaborator" });
    }
  });
  
  // AI Conversation routes
  app.get("/api/ai-conversations", async (req, res) => {
    const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
    
    if (userId) {
      const conversations = await storage.getAIConversationsByUserId(userId);
      return res.json(conversations);
    }
    
    return res.status(400).json({ message: "Missing userId query parameter" });
  });
  
  app.get("/api/ai-conversations/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const conversation = await storage.getAIConversation(id);
    
    if (!conversation) {
      return res.status(404).json({ message: "AI conversation not found" });
    }
    
    res.json(conversation);
  });
  
  app.post("/api/ai-conversations", validateBody(insertAIConversationSchema), async (req, res) => {
    try {
      const conversation = await storage.createAIConversation(req.body);
      res.status(201).json(conversation);
    } catch (error) {
      res.status(500).json({ message: "Error creating AI conversation" });
    }
  });
  
  app.put("/api/ai-conversations/:id/messages", async (req, res) => {
    const id = parseInt(req.params.id);
    const conversation = await storage.getAIConversation(id);
    
    if (!conversation) {
      return res.status(404).json({ message: "AI conversation not found" });
    }
    
    try {
      // Validate message format
      const messageSchema = z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      });
      
      const message = messageSchema.parse(req.body);
      
      // Add message to conversation
      const messages = [...conversation.messages, message];
      const updatedConversation = await storage.updateAIConversation(id, { messages });
      
      res.json(updatedConversation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid message format", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ message: "Error adding message to conversation" });
      }
    }
  });
  
  const httpServer = createServer(app);
  
  return httpServer;
}
