/**
 * @fileoverview Settings Page
 * 
 * User settings page for account preferences and configuration.
 */

"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Save, Moon, Sun, Bell, Shield, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

/**
 * Settings Page Component
 */
export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  
  // Settings state
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [anomalyAlerts, setAnomalyAlerts] = React.useState(true);
  const [weeklyReports, setWeeklyReports] = React.useState(false);

  /**
   * Save settings
   */
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated.",
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and configuration
        </p>
      </div>

      {/* Appearance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {theme === "dark" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            Appearance
          </CardTitle>
          <CardDescription>
            Customize how Fraudlr looks on your device
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Theme</Label>
              <p className="text-sm text-muted-foreground">
                Choose between light and dark mode
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("light")}
              >
                <Sun className="h-4 w-4 mr-2" />
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("dark")}
              >
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>
            Configure how you receive updates and alerts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive updates about your cases via email
              </p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Anomaly Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when high-risk anomalies are detected
              </p>
            </div>
            <Switch
              checked={anomalyAlerts}
              onCheckedChange={setAnomalyAlerts}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Weekly Reports</Label>
              <p className="text-sm text-muted-foreground">
                Receive a weekly summary of your fraud detection activity
              </p>
            </div>
            <Switch
              checked={weeklyReports}
              onCheckedChange={setWeeklyReports}
            />
          </div>
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Keys
          </CardTitle>
          <CardDescription>
            Manage API keys for programmatic access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-4">
              API keys allow you to access Fraudlr programmatically. Keep your
              keys secure and never share them publicly.
            </p>
            <Button variant="outline">Generate New API Key</Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security
          </CardTitle>
          <CardDescription>
            Manage your account security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Change Password</Label>
            <div className="grid gap-4">
              <Input
                id="current-password"
                type="password"
                placeholder="Current password"
              />
              <Input
                type="password"
                placeholder="New password"
              />
              <Input
                type="password"
                placeholder="Confirm new password"
              />
            </div>
            <Button variant="outline" className="mt-2">
              Update Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-[#FD4D53] hover:bg-[#FD4D53]/90">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
