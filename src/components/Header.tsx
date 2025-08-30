import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Home, Info, Sparkles } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">INKEM ANUKOLEDU</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-2 transition-colors ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link
              to="/about"
              className={`flex items-center space-x-2 transition-colors ${
                isActive('/about') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link to="/create">
              <Button variant="default" size="sm" className="btn-gradient">
                <Plus className="w-4 h-4 mr-2" />
                Create Meme
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;