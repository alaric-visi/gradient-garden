import { GradientStyle } from '@/lib/gradientUtils';

interface StyleSelectorProps {
  style: GradientStyle;
  onChange: (style: GradientStyle) => void;
}

const styles: { key: GradientStyle; label: string }[] = [
  { key: 'linear', label: 'Linear' },
  { key: 'radial', label: 'Radial' },
  { key: 'conic', label: 'Conic' },
];

export function StyleSelector({ style, onChange }: StyleSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">Gradient Style</label>
      <div className="flex gap-2">
        {styles.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`style-btn ${style === key ? 'active' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
