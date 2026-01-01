import { Link, useLocation } from 'react-router-dom';
import { Eye, Sparkles } from 'lucide-react';
import { GradientConfig } from '@/lib/gradientUtils';

interface HeaderProps {
  config?: GradientConfig;
}

export function Header({ config }: HeaderProps) {
  const location = useLocation();

  const getShowcaseLink = () => {
    if (!config) return '/showcase';
    const params = new URLSearchParams({
      c1: config.colour1.replace('#', ''),
      c2: config.colour2.replace('#', ''),
      style: config.style,
      dir: config.direction,
      format: config.format,
    });
    return `/showcase?${params.toString()}`;
  };

  return (
    <header className="border-b border-border/30 bg-card/70 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-3 py-2 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          {/* Custom logo - layered gradient squares */}
          <div className="relative w-8 h-8 md:w-9 md:h-9">
            <div className="absolute inset-0 rounded-md bg-gradient-to-br from-primary to-primary/60 rotate-12 transition-transform group-hover:rotate-[20deg]" />
            <div className="absolute inset-0 rounded-md bg-gradient-to-br from-accent to-accent/60 -rotate-6 transition-transform group-hover:-rotate-12" />
            <div className="absolute inset-1 rounded-sm bg-card/90 flex items-center justify-center">
              <Sparkles size={12} className="md:w-3.5 md:h-3.5 text-foreground" />
            </div>
          </div>
          <span className="text-base md:text-lg font-bold tracking-tight">CSS Gradient Lab</span>
        </Link>
        
        <nav className="flex items-center gap-1">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wide transition-all duration-150 ${
              location.pathname === '/'
                ? 'bg-primary/20 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            Generator
          </Link>
          <Link
            to={getShowcaseLink()}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wide transition-all duration-150 ${
              location.pathname === '/showcase'
                ? 'bg-primary/20 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            <Eye size={12} />
            Showcase
          </Link>
        </nav>
      </div>
    </header>
  );
}
