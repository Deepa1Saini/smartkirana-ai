import { Store, User, Bell, Shield, CreditCard, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function SettingsView() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Store Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="w-5 h-5" />
            Store Information
          </CardTitle>
          <CardDescription>Basic details about your store</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input id="storeName" defaultValue="Sharma General Store" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="+91 98765 43210" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gst">GST Number</Label>
              <Input id="gst" placeholder="Enter GST number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Store Type</Label>
              <Input id="type" defaultValue="Kirana Store" />
            </div>
          </div>
          <Button variant="gradient">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Settings
          </CardTitle>
          <CardDescription>Your personal account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Rajesh Sharma" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="rajesh@example.com" />
            </div>
          </div>
          <Button variant="outline">Update Profile</Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
          <CardDescription>Configure how you receive alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Low Stock Alerts</p>
              <p className="text-sm text-muted-foreground">Get notified when stock is running low</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Expiry Alerts</p>
              <p className="text-sm text-muted-foreground">Alerts for products nearing expiry</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Daily Summary</p>
              <p className="text-sm text-muted-foreground">Receive daily sales summary via SMS</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Subscription
          </CardTitle>
          <CardDescription>Your current plan and billing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Pro Plan</h3>
                <p className="text-sm text-muted-foreground">Unlimited products, AI insights, Smart alerts</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">₹499<span className="text-sm font-normal">/mo</span></p>
                <p className="text-xs text-muted-foreground">Next billing: Jan 15, 2025</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Change Plan</Button>
            <Button variant="ghost" className="text-destructive">Cancel Subscription</Button>
          </div>
        </CardContent>
      </Card>

      {/* Language */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Language & Region
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Display Language</p>
              <p className="text-sm text-muted-foreground">Choose your preferred language</p>
            </div>
            <Button variant="outline" size="sm">English</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Hindi Labels</p>
              <p className="text-sm text-muted-foreground">Show Hindi translations in sidebar</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
