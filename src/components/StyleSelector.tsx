import { GradientStyle } from '@/lib/gradientUtils';

interface StyleSelectorProps {
  style: GradientStyle;
  onChange: (style: GradientStyle) => void;
  compact?: boolean;
}

const styles: { key: GradientStyle; label: string }[] = [
  { key: 'linear', label: 'Linear' },
  { key: 'radial', label: 'Radial' },
  { key: 'conic', label: 'Conic' },
];

export function StyleSelector({ style, onChange, compact = false }: StyleSelectorProps) {
  return (
    <div className="control-section">
      {!compact && <label className="control-label">Style</label>}
      <div className="flex gap-1.5">
        {styles.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`style-btn flex-1 ${style === key ? 'active' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
