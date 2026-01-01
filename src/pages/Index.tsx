import { useState } from 'react';
import { Shuffle } from 'lucide-react';
import { Header } from '@/components/Header';
import { ColourPicker } from '@/components/ColourPicker';
import { DirectionPicker } from '@/components/DirectionPicker';
import { StyleSelector } from '@/components/StyleSelector';
import { FormatSelector } from '@/components/FormatSelector';
import { GradientPreview } from '@/components/GradientPreview';
import { CodeOutput } from '@/components/CodeOutput';
import {
  GradientStyle,
  ColourFormat,
  Direction,
  generateGradientCSS,
  generateFullCSS,
  generateRandomColour,
} from '@/lib/gradientUtils';

const Index = () => {
  const [colour1, setColour1] = useState('#6366F1');
  const [colour2, setColour2] = useState('#06B6D4');
  const [style, setStyle] = useState<GradientStyle>('linear');
  const [format, setFormat] = useState<ColourFormat>('hex');
  const [direction, setDirection] = useState<Direction>('SE');

  const config = { colour1, colour2, style, format, direction };
  const gradientCSS = generateGradientCSS(config);
  const fullCSS = generateFullCSS(config);

  const handleRandomBoth = () => {
    setColour1(generateRandomColour());
    setColour2(generateRandomColour());
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 lg:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            CSS Gradient{' '}
            <span className="gradient-text" style={{ backgroundImage: gradientCSS }}>
              Generator
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create beautiful CSS gradients with ease. Choose your colours, style, and direction,
            then copy the generated code directly into your project.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Controls Panel */}
          <div className="glass-panel rounded-2xl p-6 lg:p-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Customise</h2>
              <button
                onClick={handleRandomBoth}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                <Shuffle size={16} />
                Random Both
              </button>
            </div>

            {/* Colour Pickers */}
            <div className="grid sm:grid-cols-2 gap-6">
              <ColourPicker
                label="Colour 1"
                colour={colour1}
                onChange={setColour1}
              />
              <ColourPicker
                label="Colour 2"
                colour={colour2}
                onChange={setColour2}
              />
            </div>

            {/* Style Selector */}
            <StyleSelector style={style} onChange={setStyle} />

            {/* Format Selector */}
            <FormatSelector format={format} onChange={setFormat} />

            {/* Direction Picker */}
            <DirectionPicker direction={direction} onChange={setDirection} />
          </div>

          {/* Preview & Output Panel */}
          <div className="space-y-8">
            <GradientPreview gradient={gradientCSS} />
            <div className="glass-panel rounded-2xl p-6">
              <CodeOutput css={fullCSS} />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <section className="mt-16 glass-panel rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">About Gradient Lab</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              Gradient Lab is a powerful CSS gradient generator that helps designers and developers
              create stunning gradients with precision. Whether you're building a modern web application,
              crafting a beautiful landing page, or simply experimenting with colour combinations,
              this tool provides everything you need.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                <h3 className="font-medium mb-2">Three Gradient Styles</h3>
                <p className="text-sm text-muted-foreground">
                  Choose from linear, radial, or conic gradients to achieve your desired effect.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                <h3 className="font-medium mb-2">Multiple Colour Formats</h3>
                <p className="text-sm text-muted-foreground">
                  Export your gradient in HEX, RGBa, or HSLa format to match your project requirements.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                <h3 className="font-medium mb-2">Instant Preview</h3>
                <p className="text-sm text-muted-foreground">
                  See your gradient update in real-time as you adjust colours and settings.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
