import { Shuffle } from 'lucide-react';
import { generateRandomColour } from '@/lib/gradientUtils';

interface ColourPickerProps {
  label: string;
  colour: string;
  onChange: (colour: string) => void;
  compact?: boolean;
}

export function ColourPicker({ label, colour, onChange, compact = false }: ColourPickerProps) {
  const handleRandom = () => {
    onChange(generateRandomColour());
  };

  if (compact) {
    return (
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={colour}
            onChange={(e) => onChange(e.target.value)}
            className="w-10 h-10 rounded-lg cursor-pointer border border-border/60 bg-transparent transition-all duration-150 hover:border-primary/50 shrink-0"
            style={{ backgroundColor: colour }}
          />
          <div className="flex items-center gap-1.5 min-w-0">
            <input
              type="text"
              value={colour.toUpperCase()}
              onChange={(e) => {
                const value = e.target.value;
                if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                  onChange(value);
                }
              }}
              className="w-[70px] px-2 py-1.5 text-xs font-mono bg-secondary/80 border border-border/60 rounded-md focus:outline-none focus:border-primary/50 transition-colors"
            />
            <button
              onClick={handleRandom}
              className="p-1.5 text-muted-foreground hover:text-accent bg-secondary/80 hover:bg-accent/10 border border-border/60 hover:border-accent/50 rounded-md transition-all duration-150 shrink-0"
              title="Random colour"
            >
              <Shuffle size={12} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="control-section">
      <label className="control-label">{label}</label>
      <div className="flex items-center gap-2">
        <div className="relative group">
          <input
            type="color"
            value={colour}
            onChange={(e) => onChange(e.target.value)}
            className="w-12 h-12 rounded-lg cursor-pointer border border-border/60 bg-transparent transition-all duration-150 hover:border-primary/50 hover:scale-105"
            style={{ backgroundColor: colour }}
          />
          <div 
            className="absolute inset-0 rounded-lg pointer-events-none transition-shadow duration-150 group-hover:shadow-lg"
            style={{ boxShadow: `0 0 16px ${colour}30` }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="text"
            value={colour.toUpperCase()}
            onChange={(e) => {
              const value = e.target.value;
              if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                onChange(value);
              }
            }}
            className="w-20 px-2 py-1.5 text-xs font-mono bg-secondary/80 border border-border/60 rounded-md focus:outline-none focus:border-primary/50 transition-colors"
          />
          <button
            onClick={handleRandom}
            className="flex items-center gap-1 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground hover:text-accent bg-secondary/80 hover:bg-accent/10 border border-border/60 hover:border-accent/50 rounded-md transition-all duration-150"
          >
            <Shuffle size={10} />
            Random
          </button>
        </div>
      </div>
    </div>
  );
}
