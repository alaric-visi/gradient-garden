import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import {
  Star,
  Heart,
  Zap,
  Sparkles,
  Sun,
  Moon,
  Cloud,
  Flame,
  Droplets,
  Wind,
  Music,
  Camera,
} from 'lucide-react';
import { generateGradientCSS, GradientConfig, Direction, GradientStyle, ColourFormat } from '@/lib/gradientUtils';

const STORAGE_KEY = 'gradient-lab-config';

const Showcase = () => {
  const [searchParams] = useSearchParams();
  
  // Load from localStorage first
  const getInitialConfig = (): GradientConfig => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load saved config:', e);
    }
    return {
      colour1: '#6366F1',
      colour2: '#06B6D4',
      style: 'linear',
      format: 'hex',
      direction: 'SE',
    };
  };

  const [config, setConfig] = useState<GradientConfig>(getInitialConfig);

  // URL params take priority on mount
  useEffect(() => {
    const c1 = searchParams.get('c1');
    const c2 = searchParams.get('c2');
    const style = searchParams.get('style') as GradientStyle | null;
    const direction = searchParams.get('dir') as Direction | null;
    const format = searchParams.get('format') as ColourFormat | null;

    if (c1 || c2 || style || direction || format) {
      setConfig((prev) => ({
        ...prev,
        ...(c1 && { colour1: `#${c1}` }),
        ...(c2 && { colour2: `#${c2}` }),
        ...(style && { style }),
        ...(direction && { direction }),
        ...(format && { format }),
      }));
    }
  }, [searchParams]);

  // Save to localStorage whenever config changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const handleColourChange = (colourKey: 'colour1' | 'colour2', value: string) => {
    setConfig(prev => ({ ...prev, [colourKey]: value }));
  };

  const gradient = generateGradientCSS(config);

  const icons = [
    Star, Heart, Zap, Sparkles, Sun, Moon,
    Cloud, Flame, Droplets, Wind, Music, Camera,
  ];

  const getBackLink = () => {
    const params = new URLSearchParams({
      c1: config.colour1.replace('#', ''),
      c2: config.colour2.replace('#', ''),
      style: config.style,
      dir: config.direction,
      format: config.format,
    });
    return `/?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header config={config} />

      <main className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
        {/* Floating Colour Picker */}
        <div className="fixed top-20 right-4 md:right-6 z-50">
          <div className="glass-panel rounded-xl p-3 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">C1</label>
              <input
                type="color"
                value={config.colour1}
                onChange={(e) => handleColourChange('colour1', e.target.value)}
                className="w-8 h-8 rounded-md cursor-pointer border border-border/50 bg-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">C2</label>
              <input
                type="color"
                value={config.colour2}
                onChange={(e) => handleColourChange('colour2', e.target.value)}
                className="w-8 h-8 rounded-md cursor-pointer border border-border/50 bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 tracking-tight">
            Gradient{' '}
            <span className="gradient-text" style={{ backgroundImage: gradient }}>
              Showcase
            </span>
          </h1>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            See your gradient in action across various design contexts.
          </p>
        </div>

        {/* Gradient Preview Banner */}
        <div
          className="w-full h-24 md:h-32 rounded-xl md:rounded-2xl mb-8 md:mb-12 shadow-2xl"
          style={{ background: gradient }}
        />

        {/* Typography Section */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Typography</h2>
          <div className="glass-panel rounded-xl md:rounded-2xl p-4 md:p-8 space-y-6 md:space-y-8">
            <div>
              <h3
                className="text-4xl md:text-6xl lg:text-8xl font-bold gradient-text mb-3 md:mb-4"
                style={{ backgroundImage: gradient }}
              >
                Headline
              </h3>
              <p className="text-muted-foreground text-sm md:text-lg">
                Large display text with gradient creates striking visual impact.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h4
                  className="text-2xl md:text-3xl font-semibold gradient-text mb-2 md:mb-3"
                  style={{ backgroundImage: gradient }}
                >
                  Section Title
                </h4>
                <p className="text-muted-foreground text-sm md:text-base">
                  Medium-sized headings work beautifully with gradients.
                </p>
              </div>
              <div>
                <h4
                  className="text-2xl md:text-3xl font-semibold gradient-text mb-2 md:mb-3"
                  style={{ backgroundImage: gradient }}
                >
                  Feature Heading
                </h4>
                <p className="text-muted-foreground text-sm md:text-base">
                  Perfect for highlighting key features or sections.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3">
              {['Design', 'Development', 'Creative', 'Innovation', 'Technology'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium text-primary-foreground"
                  style={{ background: gradient }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Icons Section */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Icons</h2>
          <div className="glass-panel rounded-xl md:rounded-2xl p-4 md:p-8">
            <p className="text-muted-foreground mb-4 md:mb-6 text-sm md:text-base">
              Gradient backgrounds applied to icon containers create a cohesive, modern aesthetic.
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2 md:gap-4">
              {icons.map((Icon, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg md:rounded-xl flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                  style={{ background: gradient }}
                >
                  <Icon size={20} className="md:w-6 md:h-6 text-primary-foreground" />
                </div>
              ))}
            </div>

            <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-border/50">
              <p className="text-muted-foreground mb-3 md:mb-4 text-sm md:text-base">
                Icons with gradient text effect:
              </p>
              <div className="flex flex-wrap gap-4 md:gap-6">
                {icons.slice(0, 6).map((Icon, index) => (
                  <div key={index} className="relative">
                    <svg width="36" height="36" viewBox="0 0 24 24" className="md:w-12 md:h-12">
                      <defs>
                        <linearGradient id={`iconGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={config.colour1} />
                          <stop offset="100%" stopColor={config.colour2} />
                        </linearGradient>
                      </defs>
                      <Icon
                        size={36}
                        stroke={`url(#iconGrad-${index})`}
                        strokeWidth={1.5}
                        fill="none"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Image Overlay Section */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Image Overlays</h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            <div className="glass-panel rounded-xl md:rounded-2xl p-4 md:p-6">
              <h3 className="text-base md:text-lg font-medium mb-3 md:mb-4">Gradient Overlay</h3>
              <div className="relative rounded-lg md:rounded-xl overflow-hidden aspect-video">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format"
                  alt="Mountain landscape"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 opacity-70"
                  style={{ background: gradient }}
                />
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mt-3 md:mt-4">
                A gradient overlay adds mood and brand consistency.
              </p>
            </div>

            <div className="glass-panel rounded-xl md:rounded-2xl p-4 md:p-6">
              <h3 className="text-base md:text-lg font-medium mb-3 md:mb-4">Gradient Mask</h3>
              <div className="relative rounded-lg md:rounded-xl overflow-hidden aspect-video">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format"
                  alt="Mountain landscape"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${config.colour1}ee, transparent 50%)`,
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h4 className="text-lg md:text-xl font-semibold text-primary-foreground mb-1 md:mb-2">
                    Beautiful Landscape
                  </h4>
                  <p className="text-primary-foreground/80 text-xs md:text-sm">
                    Gradient masks are perfect for text overlays.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Greyscale Image with Gradient Typography */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Greyscale with Gradient Typography</h2>
          <div className="glass-panel rounded-xl md:rounded-2xl overflow-hidden">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&auto=format"
                alt="Nature landscape"
                className="w-full h-64 md:h-96 object-cover grayscale"
              />
              <div className="absolute inset-0 bg-background/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-4 md:px-8">
                  <h3
                    className="text-3xl md:text-5xl lg:text-7xl font-bold gradient-text mb-2 md:mb-4"
                    style={{ backgroundImage: gradient }}
                  >
                    Discover Nature
                  </h3>
                  <p
                    className="text-base md:text-xl lg:text-2xl gradient-text font-medium"
                    style={{ backgroundImage: gradient }}
                  >
                    Where Adventure Meets Serenity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center">
          <div
            className="rounded-xl md:rounded-2xl p-8 md:p-12 shadow-2xl"
            style={{ background: gradient }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-3 md:mb-4">
              Ready to Use This Gradient?
            </h2>
            <p className="text-primary-foreground/80 text-sm md:text-lg mb-4 md:mb-6 max-w-xl mx-auto">
              Head back to the generator to copy the CSS code and implement this
              beautiful gradient in your own projects.
            </p>
            <a
              href={getBackLink()}
              className="inline-flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-background text-foreground rounded-lg font-medium hover:opacity-90 transition-opacity text-sm md:text-base"
            >
              Back to Generator
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Showcase;
