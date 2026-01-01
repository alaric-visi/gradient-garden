import { Link, useLocation } from 'react-router-dom';
import { Palette, Eye } from 'lucide-react';

export function Header() {
  const location = useLocation();

  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transition-transform group-hover:scale-110">
            <Palette size={20} className="text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold tracking-tight">Gradient Lab</span>
        </Link>
        
        <nav className="flex items-center gap-2">
          <Link
            to="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              location.pathname === '/'
                ? 'bg-primary/20 text-primary border border-primary/50'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            <Palette size={16} />
            Generator
          </Link>
          <Link
            to="/showcase"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              location.pathname === '/showcase'
                ? 'bg-primary/20 text-primary border border-primary/50'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            <Eye size={16} />
            Showcase
          </Link>
        </nav>
      </div>
    </header>
  );
}
