import {
  User,
  InsertUser,
  Project,
  InsertProject,
  File,
  InsertFile,
  Collaborator,
  InsertCollaborator,
  AIConversation,
  InsertAIConversation
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  deleteUser(id: number): Promise<boolean>;
  
  // Project operations
  getProject(id: number): Promise<Project | undefined>;
  getProjectsByUserId(userId: number): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, updates: Partial<Project>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // File operations
  getFile(id: number): Promise<File | undefined>;
  getFilesByProjectId(projectId: number): Promise<File[]>;
  createFile(file: InsertFile): Promise<File>;
  updateFile(id: number, updates: Partial<File>): Promise<File | undefined>;
  deleteFile(id: number): Promise<boolean>;
  
  // Collaborator operations
  getCollaborator(id: number): Promise<Collaborator | undefined>;
  getCollaboratorsByProjectId(projectId: number): Promise<Collaborator[]>;
  getCollaboratorsByUserId(userId: number): Promise<Collaborator[]>;
  createCollaborator(collaborator: InsertCollaborator): Promise<Collaborator>;
  deleteCollaborator(id: number): Promise<boolean>;
  
  // AI Conversation operations
  getAIConversation(id: number): Promise<AIConversation | undefined>;
  getAIConversationsByUserId(userId: number): Promise<AIConversation[]>;
  createAIConversation(conversation: InsertAIConversation): Promise<AIConversation>;
  updateAIConversation(id: number, updates: Partial<AIConversation>): Promise<AIConversation | undefined>;
  deleteAIConversation(id: number): Promise<boolean>;
}

// In-memory implementation of the storage interface
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private files: Map<number, File>;
  private collaborators: Map<number, Collaborator>;
  private aiConversations: Map<number, AIConversation>;
  
  private userIdCounter: number;
  private projectIdCounter: number;
  private fileIdCounter: number;
  private collaboratorIdCounter: number;
  private aiConversationIdCounter: number;
  
  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.files = new Map();
    this.collaborators = new Map();
    this.aiConversations = new Map();
    
    this.userIdCounter = 1;
    this.projectIdCounter = 1;
    this.fileIdCounter = 1;
    this.collaboratorIdCounter = 1;
    this.aiConversationIdCounter = 1;
    
    // Add some sample data
    this.seedSampleData();
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }
  
  async createUser(userData: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = {
      ...userData,
      id,
      createdAt: now
    };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  async deleteUser(id: number): Promise<boolean> {
    return this.users.delete(id);
  }
  
  // Project operations
  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }
  
  async getProjectsByUserId(userId: number): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      (project) => project.ownerId === userId
    );
  }
  
  async createProject(projectData: InsertProject): Promise<Project> {
    const id = this.projectIdCounter++;
    const now = new Date();
    const project: Project = {
      ...projectData,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.projects.set(id, project);
    return project;
  }
  
  async updateProject(id: number, updates: Partial<Project>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const now = new Date();
    const updatedProject = { 
      ...project, 
      ...updates,
      updatedAt: now
    };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }
  
  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }
  
  // File operations
  async getFile(id: number): Promise<File | undefined> {
    return this.files.get(id);
  }
  
  async getFilesByProjectId(projectId: number): Promise<File[]> {
    return Array.from(this.files.values()).filter(
      (file) => file.projectId === projectId
    );
  }
  
  async createFile(fileData: InsertFile): Promise<File> {
    const id = this.fileIdCounter++;
    const now = new Date();
    const file: File = {
      ...fileData,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.files.set(id, file);
    return file;
  }
  
  async updateFile(id: number, updates: Partial<File>): Promise<File | undefined> {
    const file = this.files.get(id);
    if (!file) return undefined;
    
    const now = new Date();
    const updatedFile = { 
      ...file, 
      ...updates,
      updatedAt: now
    };
    this.files.set(id, updatedFile);
    return updatedFile;
  }
  
  async deleteFile(id: number): Promise<boolean> {
    return this.files.delete(id);
  }
  
  // Collaborator operations
  async getCollaborator(id: number): Promise<Collaborator | undefined> {
    return this.collaborators.get(id);
  }
  
  async getCollaboratorsByProjectId(projectId: number): Promise<Collaborator[]> {
    return Array.from(this.collaborators.values()).filter(
      (collaborator) => collaborator.projectId === projectId
    );
  }
  
  async getCollaboratorsByUserId(userId: number): Promise<Collaborator[]> {
    return Array.from(this.collaborators.values()).filter(
      (collaborator) => collaborator.userId === userId
    );
  }
  
  async createCollaborator(collaboratorData: InsertCollaborator): Promise<Collaborator> {
    const id = this.collaboratorIdCounter++;
    const now = new Date();
    const collaborator: Collaborator = {
      ...collaboratorData,
      id,
      createdAt: now
    };
    this.collaborators.set(id, collaborator);
    return collaborator;
  }
  
  async deleteCollaborator(id: number): Promise<boolean> {
    return this.collaborators.delete(id);
  }
  
  // AI Conversation operations
  async getAIConversation(id: number): Promise<AIConversation | undefined> {
    return this.aiConversations.get(id);
  }
  
  async getAIConversationsByUserId(userId: number): Promise<AIConversation[]> {
    return Array.from(this.aiConversations.values()).filter(
      (conversation) => conversation.userId === userId
    );
  }
  
  async createAIConversation(conversationData: InsertAIConversation): Promise<AIConversation> {
    const id = this.aiConversationIdCounter++;
    const now = new Date();
    const conversation: AIConversation = {
      ...conversationData,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.aiConversations.set(id, conversation);
    return conversation;
  }
  
  async updateAIConversation(id: number, updates: Partial<AIConversation>): Promise<AIConversation | undefined> {
    const conversation = this.aiConversations.get(id);
    if (!conversation) return undefined;
    
    const now = new Date();
    const updatedConversation = { 
      ...conversation, 
      ...updates,
      updatedAt: now
    };
    this.aiConversations.set(id, updatedConversation);
    return updatedConversation;
  }
  
  async deleteAIConversation(id: number): Promise<boolean> {
    return this.aiConversations.delete(id);
  }
  
  // Seed some sample data for demonstration
  private seedSampleData() {
    // Add a demo user
    const user: User = {
      id: this.userIdCounter++,
      username: 'demouser',
      password: 'password123', // In a real app, this would be hashed
      email: 'demo@devsandbox.ai',
      fullName: 'Demo User',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demouser',
      createdAt: new Date(),
    };
    this.users.set(user.id, user);
    
    // Add a demo project
    const project: Project = {
      id: this.projectIdCounter++,
      name: 'My First Project',
      description: 'A sample project to demonstrate DevSandbox capabilities',
      ownerId: user.id,
      isPublic: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.projects.set(project.id, project);
    
    // Add some sample files
    const files = [
      {
        id: this.fileIdCounter++,
        projectId: project.id,
        name: 'index.js',
        path: '/src/index.js',
        content: 'console.log("Hello, DevSandbox!");',
        language: 'javascript',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: this.fileIdCounter++,
        projectId: project.id,
        name: 'styles.css',
        path: '/src/styles.css',
        content: 'body { font-family: "Open Sans", sans-serif; }',
        language: 'css',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    
    files.forEach(file => this.files.set(file.id, file));
    
    // Add a sample AI conversation
    const conversation: AIConversation = {
      id: this.aiConversationIdCounter++,
      userId: user.id,
      projectId: project.id,
      messages: [
        {
          role: 'user',
          content: 'How do I create a React component?'
        },
        {
          role: 'assistant',
          content: 'Here\'s a simple React component example:\n\n```jsx\nimport React from "react";\n\nconst MyComponent = ({ title }) => {\n  return <div>{title}</div>;\n};\n\nexport default MyComponent;\n```\n\nYou can use this component in another file by importing it and using it like this:\n\n```jsx\nimport MyComponent from "./MyComponent";\n\nfunction App() {\n  return <MyComponent title="Hello World" />;\n}\n```'
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.aiConversations.set(conversation.id, conversation);
  }
}

// Export a singleton instance of MemStorage
export const storage = new MemStorage();
