import { Link, useLocation } from 'react-router-dom';
import { Palette, Eye } from 'lucide-react';
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
    <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transition-transform group-hover:scale-110">
            <Palette size={16} className="md:w-5 md:h-5 text-primary-foreground" />
          </div>
          <span className="text-lg md:text-xl font-semibold tracking-tight">Gradient Lab</span>
        </Link>
        
        <nav className="flex items-center gap-1 md:gap-2">
          <Link
            to="/"
            className={`flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 ${
              location.pathname === '/'
                ? 'bg-primary/20 text-primary border border-primary/50'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            <Palette size={14} className="md:w-4 md:h-4" />
            <span className="hidden sm:inline">Generator</span>
          </Link>
          <Link
            to={getShowcaseLink()}
            className={`flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 ${
              location.pathname === '/showcase'
                ? 'bg-primary/20 text-primary border border-primary/50'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            <Eye size={14} className="md:w-4 md:h-4" />
            <span className="hidden sm:inline">Showcase</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
