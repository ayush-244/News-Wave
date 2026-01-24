import { useState, useEffect } from "react";
import { Moon, Sun, Bell, Database, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [offlineMode, setOfflineMode] = useState(true);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const darkMode = theme === "dark";

  const handleClearCache = () => {
    if (confirm("Are you sure you want to clear all cached data?")) {
      // In a real app, this would clear service worker cache
      toast.success("Cache cleared successfully!");
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground text-lg">
            Customize your NewsWave experience
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how NewsWave looks on your device
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  <div>
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Switch to dark theme
                    </p>
                  </div>
                </div>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  disabled={!mounted}
                  onCheckedChange={(checked) => {
                    setTheme(checked ? "dark" : "light");
                    toast.success(`Dark mode ${checked ? "enabled" : "disabled"}`);
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Manage how you receive updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Bell className="h-5 w-5" />
                  <div>
                    <Label htmlFor="notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about breaking news
                    </p>
                  </div>
                </div>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Offline Access</CardTitle>
              <CardDescription>
                Manage offline reading capabilities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Database className="h-5 w-5" />
                  <div>
                    <Label htmlFor="offline">Enable Offline Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Access saved articles without internet
                    </p>
                  </div>
                </div>
                <Switch
                  id="offline"
                  checked={offlineMode}
                  onCheckedChange={setOfflineMode}
                />
              </div>

              <div className="pt-4">
                <Button variant="outline" onClick={handleClearCache}>
                  Clear Cache
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Remove all cached articles and images
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About NewsWave</CardTitle>
              <CardDescription>
                Version 1.0.0
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                NewsWave is a modern news aggregator built with React and designed for offline-first experiences.
                Stay informed with the latest headlines from multiple categories.
              </p>
            </CardContent>
          </Card>

          {isAuthenticated && (
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Manage your account settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Logged in as:</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                    {user?.isAdmin && (
                      <span className="inline-block mt-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded font-semibold">
                        Admin
                      </span>
                    )}
                  </div>
                  <Button
                    variant="destructive"
                    onClick={handleLogout}
                    className="w-full"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
  );
};

export default Settings;
