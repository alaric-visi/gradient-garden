import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Shuffle, Eye } from 'lucide-react';
import { Header } from '@/components/Header';
import { ColourPicker } from '@/components/ColourPicker';
import { DirectionPicker } from '@/components/DirectionPicker';
import { StyleSelector } from '@/components/StyleSelector';
import { FormatSelector } from '@/components/FormatSelector';
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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [colour1, setColour1] = useState('#6366F1');
  const [colour2, setColour2] = useState('#06B6D4');
  const [style, setStyle] = useState<GradientStyle>('linear');
  const [format, setFormat] = useState<ColourFormat>('hex');
  const [direction, setDirection] = useState<Direction>('SE');

  // Load from URL params on mount
  useEffect(() => {
    const c1 = searchParams.get('c1');
    const c2 = searchParams.get('c2');
    const s = searchParams.get('style') as GradientStyle | null;
    const d = searchParams.get('dir') as Direction | null;
    const f = searchParams.get('format') as ColourFormat | null;

    if (c1) setColour1(`#${c1}`);
    if (c2) setColour2(`#${c2}`);
    if (s) setStyle(s);
    if (d) setDirection(d);
    if (f) setFormat(f);
  }, []);

  const config = { colour1, colour2, style, format, direction };
  const gradientCSS = generateGradientCSS(config);
  const fullCSS = generateFullCSS(config);

  const handleRandomBoth = () => {
    setColour1(generateRandomColour());
    setColour2(generateRandomColour());
  };

  const handleViewShowcase = () => {
    const params = new URLSearchParams({
      c1: colour1.replace('#', ''),
      c2: colour2.replace('#', ''),
      style,
      dir: direction,
      format,
    });
    navigate(`/showcase?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header config={config} />
      
      {/* Full-screen gradient background */}
      <main 
        className="flex-1 relative"
        style={{ background: gradientCSS }}
      >
        {/* Controls overlay - top left */}
        <div className="absolute inset-0 overflow-auto">
          <div className="min-h-full p-4 md:p-6 lg:p-8">
            <div className="max-w-md">
              {/* Main controls panel */}
              <div className="glass-panel rounded-2xl p-4 md:p-6 space-y-6 backdrop-blur-xl bg-card/90">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h1 className="text-lg md:text-xl font-semibold">Gradient Lab</h1>
                  <button
                    onClick={handleRandomBoth}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <Shuffle size={14} />
                    <span className="hidden sm:inline">Random</span>
                  </button>
                </div>

                {/* Colour Pickers */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
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

                {/* Code Output */}
                <div className="pt-2 border-t border-border/50">
                  <CodeOutput css={fullCSS} />
                </div>

                {/* View Showcase Button */}
                <button
                  onClick={handleViewShowcase}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-background/80 text-foreground rounded-xl hover:bg-background transition-colors border border-border/50"
                >
                  <Eye size={16} />
                  View Showcase
                </button>
              </div>

              {/* About section */}
              <div className="glass-panel rounded-2xl p-4 md:p-6 mt-4 backdrop-blur-xl bg-card/90">
                <h2 className="text-sm font-semibold mb-2">About</h2>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Create beautiful CSS gradients with ease. Choose your colours, style, and direction,
                  then copy the generated code directly into your project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
