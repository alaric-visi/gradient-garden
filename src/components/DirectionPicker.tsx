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
  compact?: boolean;
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

export function DirectionPicker({ direction, onChange, compact = false }: DirectionPickerProps) {
  const btnSize = compact ? 'w-7 h-7' : 'w-8 h-8';
  const iconSize = compact ? 14 : 16;

  return (
    <div className="control-section">
      {!compact && <label className="control-label">Direction</label>}
      <div className="grid grid-cols-3 gap-1 w-fit">
        {directions.slice(0, 3).map(({ key, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`direction-btn ${btnSize} ${direction === key ? 'active' : ''}`}
          >
            <Icon size={iconSize} />
          </button>
        ))}
        <button
          onClick={() => onChange('W')}
          className={`direction-btn ${btnSize} ${direction === 'W' ? 'active' : ''}`}
        >
          <ArrowLeft size={iconSize} />
        </button>
        <div className={`${btnSize} rounded-md bg-secondary/30 border border-border/20`} />
        <button
          onClick={() => onChange('E')}
          className={`direction-btn ${btnSize} ${direction === 'E' ? 'active' : ''}`}
        >
          <ArrowRight size={iconSize} />
        </button>
        {directions.slice(5).map(({ key, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`direction-btn ${btnSize} ${direction === key ? 'active' : ''}`}
          >
            <Icon size={iconSize} />
          </button>
        ))}
      </div>
    </div>
  );
}
