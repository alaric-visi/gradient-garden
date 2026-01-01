export type GradientStyle = 'linear' | 'radial' | 'conic';
export type ColourFormat = 'hex' | 'rgba' | 'hsla';
export type Direction = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

export interface GradientConfig {
  colour1: string;
  colour2: string;
  style: GradientStyle;
  format: ColourFormat;
  direction: Direction;
}

const directionToDegrees: Record<Direction, number> = {
  'N': 0,
  'NE': 45,
  'E': 90,
  'SE': 135,
  'S': 180,
  'SW': 225,
  'W': 270,
  'NW': 315,
};

const directionToRadial: Record<Direction, string> = {
  'N': 'at center top',
  'NE': 'at right top',
  'E': 'at right center',
  'SE': 'at right bottom',
  'S': 'at center bottom',
  'SW': 'at left bottom',
  'W': 'at left center',
  'NW': 'at left top',
};

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function formatColour(hex: string, format: ColourFormat): string {
  if (format === 'hex') {
    return hex.toUpperCase();
  }

  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  if (format === 'rgba') {
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
  }

  if (format === 'hsla') {
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1)`;
  }

  return hex;
}

export function generateGradientCSS(config: GradientConfig): string {
  const { colour1, colour2, style, format, direction } = config;
  const formattedColour1 = formatColour(colour1, format);
  const formattedColour2 = formatColour(colour2, format);

  switch (style) {
    case 'linear':
      return `linear-gradient(${directionToDegrees[direction]}deg, ${formattedColour1}, ${formattedColour2})`;
    case 'radial':
      return `radial-gradient(circle ${directionToRadial[direction]}, ${formattedColour1}, ${formattedColour2})`;
    case 'conic':
      return `conic-gradient(from ${directionToDegrees[direction]}deg ${directionToRadial[direction]}, ${formattedColour1}, ${formattedColour2}, ${formattedColour1})`;
    default:
      return `linear-gradient(${directionToDegrees[direction]}deg, ${formattedColour1}, ${formattedColour2})`;
  }
}

export function generateRandomColour(): string {
  const letters = '0123456789ABCDEF';
  let colour = '#';
  for (let i = 0; i < 6; i++) {
    colour += letters[Math.floor(Math.random() * 16)];
  }
  return colour;
}

export function generateFullCSS(config: GradientConfig): string {
  const gradient = generateGradientCSS(config);
  return `background: ${gradient};`;
}
