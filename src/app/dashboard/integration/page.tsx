/**
 * @fileoverview Integration Page
 * 
 * Page for managing external data integrations (API and SQL connections).
 * Allows users to connect their data sources for automated analysis.
 */

"use client";

import * as React from "react";
import { Plug, Plus, Database, Globe, Settings, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

/**
 * Mock integrations data
 */
const mockIntegrations: Array<{
  id: string;
  name: string;
  type: "API" | "SQL";
  status: "active" | "inactive";
  lastSync: string;
}> = [];

/**
 * Integration Page Component
 */
export default function IntegrationPage() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { toast } = useToast();

  /**
   * Handle new integration creation
   */
  const handleCreateIntegration = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Integration created",
      description: "Your data source has been connected successfully.",
    });
    
    setIsDialogOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Integrations</h1>
          <p className="text-muted-foreground">
            Connect external data sources for automated analysis
          </p>
        </div>

        {/* Add Integration Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#FD4D53] hover:bg-[#FD4D53]/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Integration
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Integration</DialogTitle>
              <DialogDescription>
                Connect an API endpoint or SQL database to automatically ingest data.
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="api" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="api">
                  <Globe className="mr-2 h-4 w-4" />
                  API
                </TabsTrigger>
                <TabsTrigger value="sql">
                  <Database className="mr-2 h-4 w-4" />
                  SQL Database
                </TabsTrigger>
              </TabsList>

              <TabsContent value="api">
                <form onSubmit={handleCreateIntegration} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-name">Integration Name</Label>
                    <Input
                      id="api-name"
                      placeholder="e.g., Transaction API"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-url">API Endpoint URL</Label>
                    <Input
                      id="api-url"
                      type="url"
                      placeholder="https://api.example.com/transactions"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key (optional)</Label>
                    <Input
                      id="api-key"
                      type="password"
                      placeholder="Your API key"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#FD4D53] hover:bg-[#FD4D53]/90">
                    Create Integration
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="sql">
                <form onSubmit={handleCreateIntegration} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="sql-name">Integration Name</Label>
                    <Input
                      id="sql-name"
                      placeholder="e.g., Accounting Database"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sql-host">Host</Label>
                    <Input
                      id="sql-host"
                      placeholder="localhost or database.example.com"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sql-port">Port</Label>
                      <Input
                        id="sql-port"
                        placeholder="5432"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sql-database">Database</Label>
                      <Input
                        id="sql-database"
                        placeholder="mydb"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sql-user">Username</Label>
                      <Input id="sql-user" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sql-password">Password</Label>
                      <Input id="sql-password" type="password" required />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-[#FD4D53] hover:bg-[#FD4D53]/90">
                    Create Integration
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tier Notice */}
      <Card className="border-[#FD4D53]/50 bg-[#FD4D53]/5">
        <CardContent className="flex items-center gap-4 py-4">
          <Plug className="h-8 w-8 text-[#FD4D53]" />
          <div className="flex-1">
            <h3 className="font-medium">Free Tier Limit</h3>
            <p className="text-sm text-muted-foreground">
              Free tier includes 0 integrations. Upgrade to Standard for 1 integration,
              or Pro for unlimited.
            </p>
          </div>
          <Button variant="outline" className="border-[#FD4D53] text-[#FD4D53]">
            Upgrade
          </Button>
        </CardContent>
      </Card>

      {/* Integrations List */}
      {mockIntegrations.length > 0 ? (
        <div className="space-y-4">
          {mockIntegrations.map((integration) => (
            <Card key={integration.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {integration.type === "API" ? (
                      <Globe className="h-5 w-5 text-blue-500" />
                    ) : (
                      <Database className="h-5 w-5 text-green-500" />
                    )}
                    <div>
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      <CardDescription>{integration.type} Integration</CardDescription>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      integration.status === "active"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {integration.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Last synced: {integration.lastSync}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State */
        <Card>
          <CardContent className="py-16 text-center">
            <Plug className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No integrations yet</h3>
            <p className="text-muted-foreground mb-4">
              Connect your data sources to automate fraud detection
            </p>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-[#FD4D53] hover:bg-[#FD4D53]/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Integration
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
