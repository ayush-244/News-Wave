import { Link, useLocation } from "react-router-dom";
import { Heart, Settings, LogOut, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { useCategories } from "@/hooks/useArticles";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const location = useLocation();
  const { data: categories = [] } = useCategories();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
            <img 
              src="/logo.svg" 
              alt="Logo" 
              className="h-8 w-8 object-contain"
              onError={(e) => {
                // Fallback to placeholder if logo doesn't exist
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
            <span className="text-xl font-bold">NewsWave</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <Button variant={isActive("/") ? "secondary" : "ghost"} size="sm">
                Home
              </Button>
            </Link>
            
            {categories.slice(0, 4).map((cat) => (
              <Link key={cat.slug} to={`/category/${cat.slug}`}>
                <Button 
                  variant={isActive(`/category/${cat.slug}`) ? "secondary" : "ghost"} 
                  size="sm"
                >
                  <span className="mr-1">{cat.icon}</span>
                  {cat.name}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <Link to="/favorites">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className={`h-5 w-5 ${isActive("/favorites") ? "fill-primary text-primary" : ""}`} />
              </Button>
            </Link>
            
            <Link to="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            
            {isAuthenticated && user?.isAdmin && (
              <Link to="/admin">
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  Admin
                </Button>
              </Link>
            )}

            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="hidden sm:flex"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="default" size="sm" className="hidden sm:flex">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
