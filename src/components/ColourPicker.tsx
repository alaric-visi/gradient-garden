import { Shuffle } from 'lucide-react';
import { generateRandomColour } from '@/lib/gradientUtils';

interface ColourPickerProps {
  label: string;
  colour: string;
  onChange: (colour: string) => void;
}

export function ColourPicker({ label, colour, onChange }: ColourPickerProps) {
  const handleRandom = () => {
    onChange(generateRandomColour());
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <div className="flex items-center gap-3">
        <div className="relative group">
          <input
            type="color"
            value={colour}
            onChange={(e) => onChange(e.target.value)}
            className="w-14 h-14 rounded-lg cursor-pointer border-2 border-border bg-transparent transition-all duration-200 hover:border-primary/50 hover:scale-105"
            style={{ backgroundColor: colour }}
          />
          <div 
            className="absolute inset-0 rounded-lg pointer-events-none transition-shadow duration-200 group-hover:shadow-lg"
            style={{ boxShadow: `0 0 20px ${colour}40` }}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <input
            type="text"
            value={colour.toUpperCase()}
            onChange={(e) => {
              const value = e.target.value;
              if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                onChange(value);
              }
            }}
            className="w-24 px-3 py-2 text-sm font-mono bg-secondary border border-border rounded-lg focus:outline-none focus:border-primary/50 transition-colors"
          />
          <button
            onClick={handleRandom}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-accent bg-secondary hover:bg-accent/10 border border-border hover:border-accent/50 rounded-lg transition-all duration-200"
          >
            <Shuffle size={12} />
            Random
          </button>
        </div>
      </div>
    </div>
  );
}
