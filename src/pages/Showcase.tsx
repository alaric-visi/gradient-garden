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

const Showcase = () => {
  const [searchParams] = useSearchParams();
  
  const [config, setConfig] = useState<GradientConfig>({
    colour1: '#6366F1',
    colour2: '#06B6D4',
    style: 'linear',
    format: 'hex',
    direction: 'SE',
  });

  useEffect(() => {
    const c1 = searchParams.get('c1');
    const c2 = searchParams.get('c2');
    const style = searchParams.get('style') as GradientStyle | null;
    const direction = searchParams.get('dir') as Direction | null;
    const format = searchParams.get('format') as ColourFormat | null;

    setConfig((prev) => ({
      ...prev,
      ...(c1 && { colour1: `#${c1}` }),
      ...(c2 && { colour2: `#${c2}` }),
      ...(style && { style }),
      ...(direction && { direction }),
      ...(format && { format }),
    }));
  }, [searchParams]);

  const gradient = generateGradientCSS(config);

  const icons = [
    Star, Heart, Zap, Sparkles, Sun, Moon,
    Cloud, Flame, Droplets, Wind, Music, Camera,
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 lg:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Gradient{' '}
            <span className="gradient-text" style={{ backgroundImage: gradient }}>
              Showcase
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See your gradient in action across various design contexts. Typography, icons,
            and image overlays—all brought to life with your custom gradient.
          </p>
        </div>

        {/* Gradient Preview Banner */}
        <div
          className="w-full h-32 rounded-2xl mb-12 shadow-2xl"
          style={{ background: gradient }}
        />

        {/* Typography Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Typography</h2>
          <div className="glass-panel rounded-2xl p-8 space-y-8">
            <div>
              <h3
                className="text-6xl lg:text-8xl font-bold gradient-text mb-4"
                style={{ backgroundImage: gradient }}
              >
                Headline
              </h3>
              <p className="text-muted-foreground text-lg">
                Large display text with gradient applied creates striking visual impact.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4
                  className="text-3xl font-semibold gradient-text mb-3"
                  style={{ backgroundImage: gradient }}
                >
                  Section Title
                </h4>
                <p className="text-muted-foreground">
                  Medium-sized headings work beautifully with gradients, adding colour
                  without overwhelming the design.
                </p>
              </div>
              <div>
                <h4
                  className="text-3xl font-semibold gradient-text mb-3"
                  style={{ backgroundImage: gradient }}
                >
                  Feature Heading
                </h4>
                <p className="text-muted-foreground">
                  Perfect for highlighting key features or important sections of
                  your website or application.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {['Design', 'Development', 'Creative', 'Innovation', 'Technology'].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full text-sm font-medium text-primary-foreground"
                  style={{ background: gradient }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Icons Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Icons</h2>
          <div className="glass-panel rounded-2xl p-8">
            <p className="text-muted-foreground mb-6">
              Gradient backgrounds applied to icon containers create a cohesive, modern aesthetic.
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-4">
              {icons.map((Icon, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-xl flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                  style={{ background: gradient }}
                >
                  <Icon size={24} className="text-primary-foreground" />
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-border/50">
              <p className="text-muted-foreground mb-4">
                Icons with gradient text effect using SVG fill:
              </p>
              <div className="flex flex-wrap gap-6">
                {icons.slice(0, 6).map((Icon, index) => (
                  <div key={index} className="relative">
                    <svg width="48" height="48" viewBox="0 0 24 24">
                      <defs>
                        <linearGradient id={`iconGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={config.colour1} />
                          <stop offset="100%" stopColor={config.colour2} />
                        </linearGradient>
                      </defs>
                      <Icon
                        size={48}
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
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Image Overlays</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-panel rounded-2xl p-6">
              <h3 className="text-lg font-medium mb-4">Gradient Overlay</h3>
              <div className="relative rounded-xl overflow-hidden aspect-video">
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
              <p className="text-sm text-muted-foreground mt-4">
                A gradient overlay adds mood and brand consistency to photographs.
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-6">
              <h3 className="text-lg font-medium mb-4">Gradient Mask</h3>
              <div className="relative rounded-xl overflow-hidden aspect-video">
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
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h4 className="text-xl font-semibold text-primary-foreground mb-2">
                    Beautiful Landscape
                  </h4>
                  <p className="text-primary-foreground/80 text-sm">
                    Gradient masks are perfect for text overlays on images.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Greyscale Image with Gradient Typography */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Greyscale with Gradient Typography</h2>
          <div className="glass-panel rounded-2xl overflow-hidden">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&auto=format"
                alt="Nature landscape"
                className="w-full h-96 object-cover grayscale"
              />
              <div className="absolute inset-0 bg-background/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-8">
                  <h3
                    className="text-5xl lg:text-7xl font-bold gradient-text mb-4"
                    style={{ backgroundImage: gradient }}
                  >
                    Discover Nature
                  </h3>
                  <p
                    className="text-xl lg:text-2xl gradient-text font-medium"
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
            className="rounded-2xl p-12 shadow-2xl"
            style={{ background: gradient }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Use This Gradient?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-6 max-w-xl mx-auto">
              Head back to the generator to copy the CSS code and implement this
              beautiful gradient in your own projects.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-background text-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
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
