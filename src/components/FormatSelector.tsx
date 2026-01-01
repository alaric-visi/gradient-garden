import { ColourFormat } from '@/lib/gradientUtils';

interface FormatSelectorProps {
  format: ColourFormat;
  onChange: (format: ColourFormat) => void;
}

const formats: { key: ColourFormat; label: string }[] = [
  { key: 'hex', label: 'HEX' },
  { key: 'rgba', label: 'RGBa' },
  { key: 'hsla', label: 'HSLa' },
];

export function FormatSelector({ format, onChange }: FormatSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">Colour Format</label>
      <div className="flex gap-2">
        {formats.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`format-btn ${format === key ? 'active' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
