/**
 * @fileoverview Profile Page
 * 
 * User profile management page for account information and subscription.
 */

"use client";

import * as React from "react";
import {
  User,
  Mail,
  Building2,
  CreditCard,
  Crown,
  Camera,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

/**
 * Profile Page Component
 */
export default function ProfilePage() {
  const { toast } = useToast();
  
  // User state (would come from API in production)
  const [user] = React.useState({
    name: "John Doe",
    email: "john@company.com",
    company: "Acme Corp",
    role: "Fraud Analyst",
    bio: "Experienced fraud analyst with a focus on financial crime detection.",
    tier: "Standard",
    casesUsed: 45,
    casesLimit: 100,
    integrationsUsed: 2,
    integrationsLimit: 5,
    nextBillingDate: "2024-02-15",
    monthlyPrice: 499,
  });

  /**
   * Save profile changes
   */
  const handleSave = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved.",
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account information and subscription
        </p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
          <CardDescription>
            Update your personal details and profile picture
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/avatar.png" />
                <AvatarFallback className="text-2xl">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Crown className="h-4 w-4 text-[#FD4D53]" />
                <span className="text-sm font-medium">{user.tier} Plan</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Profile Form */}
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={user.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user.email} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue={user.company} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" defaultValue={user.role} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                defaultValue={user.bio}
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-[#FD4D53] hover:bg-[#FD4D53]/90">
              <Pencil className="mr-2 h-4 w-4" />
              Save Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Subscription
          </CardTitle>
          <CardDescription>
            Manage your subscription and billing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Plan */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">{user.tier} Plan</h3>
                <p className="text-sm text-muted-foreground">
                  ${user.monthlyPrice}/month • Billed monthly
                </p>
              </div>
              <Button variant="outline">Change Plan</Button>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Cases Used</p>
                <p className="font-medium">
                  {user.casesUsed} / {user.casesLimit}
                </p>
                <div className="w-full h-2 bg-background rounded-full mt-1">
                  <div
                    className="h-full bg-[#FD4D53] rounded-full"
                    style={{ width: `${(user.casesUsed / user.casesLimit) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <p className="text-muted-foreground">Integrations</p>
                <p className="font-medium">
                  {user.integrationsUsed} / {user.integrationsLimit}
                </p>
                <div className="w-full h-2 bg-background rounded-full mt-1">
                  <div
                    className="h-full bg-[#FD4D53] rounded-full"
                    style={{ width: `${(user.integrationsUsed / user.integrationsLimit) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Billing Info */}
          <div className="space-y-4">
            <h4 className="font-medium">Billing Information</h4>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Next billing date</span>
                <span>{user.nextBillingDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment method</span>
                <span>•••• •••• •••• 4242</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Update Payment Method
              </Button>
              <Button variant="outline" size="sm">
                View Billing History
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company/Organization Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Organization
          </CardTitle>
          <CardDescription>
            Manage your organization settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{user.company}</h3>
                <p className="text-sm text-muted-foreground">
                  1 team member • Standard Plan
                </p>
              </div>
              <Button variant="outline">Manage Team</Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Upgrade to the Pro plan to add team members and collaborate on
            fraud detection cases.
          </p>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible actions that affect your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
