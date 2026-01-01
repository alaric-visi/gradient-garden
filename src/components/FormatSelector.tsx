import { ColourFormat } from '@/lib/gradientUtils';

interface FormatSelectorProps {
  format: ColourFormat;
  onChange: (format: ColourFormat) => void;
  compact?: boolean;
}

const formats: { key: ColourFormat; label: string }[] = [
  { key: 'hex', label: 'HEX' },
  { key: 'rgba', label: 'RGBa' },
  { key: 'hsla', label: 'HSLa' },
];

export function FormatSelector({ format, onChange, compact = false }: FormatSelectorProps) {
  return (
    <div className="control-section">
      {!compact && <label className="control-label">Format</label>}
      <div className="flex gap-1.5">
        {formats.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`format-btn flex-1 ${format === key ? 'active' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
