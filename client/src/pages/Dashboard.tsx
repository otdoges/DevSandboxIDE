import React from "react";
import { useNavigate } from "wouter";
import Header from "@/components/Header";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Sample data for the charts
const usageData = [
  { name: "Mon", cpu: 65, memory: 45, network: 30 },
  { name: "Tue", cpu: 59, memory: 40, network: 28 },
  { name: "Wed", cpu: 80, memory: 50, network: 35 },
  { name: "Thu", cpu: 81, memory: 55, network: 40 },
  { name: "Fri", cpu: 56, memory: 48, network: 32 },
  { name: "Sat", cpu: 55, memory: 30, network: 20 },
  { name: "Sun", cpu: 40, memory: 25, network: 15 }
];

const collaborationData = [
  { name: "John", commits: 30 },
  { name: "Jane", commits: 45 },
  { name: "Alice", commits: 28 },
  { name: "Bob", commits: 20 }
];

const languageData = [
  { name: "JavaScript", value: 40 },
  { name: "HTML", value: 20 },
  { name: "CSS", value: 15 },
  { name: "Vue", value: 25 }
];

const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"];

const Dashboard: React.FC = () => {
  const [, navigate] = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen bg-primary dark:bg-gray-900">
      {/* Header */}
      <Header toggleSidebar={() => {}} />
      
      {/* Main Dashboard Content */}
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-inter text-textPrimary dark:text-white mb-2">Analytics Dashboard</h1>
          <p className="text-textSecondary dark:text-gray-300">
            Monitor your project's performance, usage, and collaboration metrics.
          </p>
        </div>
        
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Resource Usage Card */}
          <Card className="col-span-1 md:col-span-2 dark:bg-gray-800 shadow-md">
            <CardHeader>
              <CardTitle className="text-textPrimary dark:text-white">Resource Usage</CardTitle>
              <CardDescription className="text-textSecondary dark:text-gray-300">
                CPU, Memory and Network usage over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={usageData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="cpu" 
                      stroke="#2563eb" 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="memory" 
                      stroke="#3b82f6" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="network" 
                      stroke="#60a5fa" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Collaboration Activity Card */}
          <Card className="dark:bg-gray-800 shadow-md">
            <CardHeader>
              <CardTitle className="text-textPrimary dark:text-white">Team Activity</CardTitle>
              <CardDescription className="text-textSecondary dark:text-gray-300">
                Commits by team member
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={collaborationData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="commits" fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Language Distribution Card */}
          <Card className="dark:bg-gray-800 shadow-md">
            <CardHeader>
              <CardTitle className="text-textPrimary dark:text-white">Language Distribution</CardTitle>
              <CardDescription className="text-textSecondary dark:text-gray-300">
                Project language breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={languageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {languageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Activity Card */}
          <Card className="col-span-1 md:col-span-2 dark:bg-gray-800 shadow-md">
            <CardHeader>
              <CardTitle className="text-textPrimary dark:text-white">Recent Activity</CardTitle>
              <CardDescription className="text-textSecondary dark:text-gray-300">
                Latest actions and events in your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-secondary dark:bg-gray-700 rounded-md">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm text-textPrimary dark:text-white">
                      John committed 5 changes to <span className="font-medium">main</span>
                    </p>
                    <p className="text-xs text-textSecondary dark:text-gray-300">Today at 10:30 AM</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-secondary dark:bg-gray-700 rounded-md">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm text-textPrimary dark:text-white">
                      Jane opened a pull request: <span className="font-medium">Add new feature</span>
                    </p>
                    <p className="text-xs text-textSecondary dark:text-gray-300">Yesterday at 4:45 PM</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-secondary dark:bg-gray-700 rounded-md">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm text-textPrimary dark:text-white">
                      Alice commented on issue <span className="font-medium">#42</span>
                    </p>
                    <p className="text-xs text-textSecondary dark:text-gray-300">2 days ago at 1:30 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Project Stats Card */}
          <Card className="dark:bg-gray-800 shadow-md">
            <CardHeader>
              <CardTitle className="text-textPrimary dark:text-white">Project Stats</CardTitle>
              <CardDescription className="text-textSecondary dark:text-gray-300">
                Key metrics for your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-secondary dark:bg-gray-700 rounded-md">
                  <span className="text-sm text-textPrimary dark:text-white">Total Lines of Code</span>
                  <span className="text-sm font-medium text-textPrimary dark:text-white">12,485</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary dark:bg-gray-700 rounded-md">
                  <span className="text-sm text-textPrimary dark:text-white">Open Issues</span>
                  <span className="text-sm font-medium text-textPrimary dark:text-white">7</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary dark:bg-gray-700 rounded-md">
                  <span className="text-sm text-textPrimary dark:text-white">Pull Requests</span>
                  <span className="text-sm font-medium text-textPrimary dark:text-white">3</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary dark:bg-gray-700 rounded-md">
                  <span className="text-sm text-textPrimary dark:text-white">Contributors</span>
                  <span className="text-sm font-medium text-textPrimary dark:text-white">4</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Back to Editor Button */}
        <div className="mt-8 flex justify-center">
          <Button 
            className="bg-accent hover:bg-blue-700 text-white font-medium transition-colors duration-200"
            onClick={() => navigate("/")}
          >
            Back to Editor
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
