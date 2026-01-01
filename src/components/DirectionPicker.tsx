import { 
  ArrowUp, 
  ArrowUpRight, 
  ArrowRight, 
  ArrowDownRight, 
  ArrowDown, 
  ArrowDownLeft, 
  ArrowLeft, 
  ArrowUpLeft 
} from 'lucide-react';
import { Direction } from '@/lib/gradientUtils';

interface DirectionPickerProps {
  direction: Direction;
  onChange: (direction: Direction) => void;
}

const directions: { key: Direction; icon: typeof ArrowUp }[] = [
  { key: 'NW', icon: ArrowUpLeft },
  { key: 'N', icon: ArrowUp },
  { key: 'NE', icon: ArrowUpRight },
  { key: 'W', icon: ArrowLeft },
  { key: 'E', icon: ArrowRight },
  { key: 'SW', icon: ArrowDownLeft },
  { key: 'S', icon: ArrowDown },
  { key: 'SE', icon: ArrowDownRight },
];

export function DirectionPicker({ direction, onChange }: DirectionPickerProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">Direction</label>
      <div className="grid grid-cols-3 gap-2 w-fit">
        {directions.slice(0, 3).map(({ key, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`direction-btn ${direction === key ? 'active' : ''}`}
          >
            <Icon size={18} />
          </button>
        ))}
        <button
          onClick={() => onChange('W')}
          className={`direction-btn ${direction === 'W' ? 'active' : ''}`}
        >
          <ArrowLeft size={18} />
        </button>
        <div className="w-10 h-10 rounded-lg bg-secondary/50 border border-border/30" />
        <button
          onClick={() => onChange('E')}
          className={`direction-btn ${direction === 'E' ? 'active' : ''}`}
        >
          <ArrowRight size={18} />
        </button>
        {directions.slice(5).map(({ key, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`direction-btn ${direction === key ? 'active' : ''}`}
          >
            <Icon size={18} />
          </button>
        ))}
      </div>
    </div>
  );
}
