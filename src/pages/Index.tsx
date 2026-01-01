import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Shuffle, Eye, ChevronLeft, ChevronRight, Palette, Sliders, Compass, Code } from 'lucide-react';
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

type MobileSection = 'colours' | 'style' | 'direction' | 'code';

const mobileSections: { key: MobileSection; label: string; icon: typeof Palette }[] = [
  { key: 'colours', label: 'Colours', icon: Palette },
  { key: 'style', label: 'Style', icon: Sliders },
  { key: 'direction', label: 'Direction', icon: Compass },
  { key: 'code', label: 'Code', icon: Code },
];

const Index = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [colour1, setColour1] = useState('#6366F1');
  const [colour2, setColour2] = useState('#06B6D4');
  const [style, setStyle] = useState<GradientStyle>('linear');
  const [format, setFormat] = useState<ColourFormat>('hex');
  const [direction, setDirection] = useState<Direction>('SE');
  const [mobileSection, setMobileSection] = useState<MobileSection>('colours');

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

  const currentSectionIndex = mobileSections.findIndex(s => s.key === mobileSection);
  
  const goToPrevSection = () => {
    const prevIndex = currentSectionIndex === 0 ? mobileSections.length - 1 : currentSectionIndex - 1;
    setMobileSection(mobileSections[prevIndex].key);
  };

  const goToNextSection = () => {
    const nextIndex = (currentSectionIndex + 1) % mobileSections.length;
    setMobileSection(mobileSections[nextIndex].key);
  };

  const CurrentIcon = mobileSections[currentSectionIndex].icon;

  return (
    <div className="min-h-screen flex flex-col">
      <Header config={config} />
      
      {/* Full-screen gradient background */}
      <main 
        className="flex-1 relative"
        style={{ background: gradientCSS }}
      >
        {/* Desktop Controls - Clean panel */}
        <div className="hidden md:block absolute top-6 left-6 z-10">
          <div className="glass-panel rounded-2xl p-6 w-[340px] space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border/30">
              <h1 className="text-base font-bold uppercase tracking-wider text-foreground">CSS Gradient Lab</h1>
              <button
                onClick={handleRandomBoth}
                className="p-2 text-muted-foreground hover:text-accent bg-secondary/80 hover:bg-accent/10 border border-border/60 hover:border-accent/50 rounded-lg transition-all duration-150"
                title="Randomise both colours"
              >
                <Shuffle size={14} />
              </button>
            </div>

            {/* Colour Pickers */}
            <div className="space-y-4">
              <label className="control-label">Colours</label>
              <div className="grid grid-cols-2 gap-4">
                <ColourPicker label="Colour 1" colour={colour1} onChange={setColour1} compact />
                <ColourPicker label="Colour 2" colour={colour2} onChange={setColour2} compact />
              </div>
            </div>

            {/* Style & Format */}
            <div className="grid grid-cols-2 gap-4">
              <StyleSelector style={style} onChange={setStyle} />
              <FormatSelector format={format} onChange={setFormat} />
            </div>

            {/* Direction & Showcase */}
            <div className="flex items-end justify-between gap-4">
              <DirectionPicker direction={direction} onChange={setDirection} />
              <button
                onClick={handleViewShowcase}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide bg-background/90 text-foreground rounded-lg hover:bg-background transition-colors border border-border/50"
              >
                <Eye size={14} />
                Showcase
              </button>
            </div>

            {/* Code Output */}
            <div className="pt-4 border-t border-border/30">
              <CodeOutput css={fullCSS} />
            </div>
          </div>
        </div>

        {/* Mobile Controls - Carousel style at top */}
        <div className="md:hidden absolute inset-x-0 top-0 z-10 p-3">
          <div className="glass-panel rounded-xl p-3">
            {/* Navigation header */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={goToPrevSection}
                className="mobile-nav-btn"
              >
                <ChevronLeft size={16} />
              </button>
              
              <div className="flex items-center gap-2 text-sm font-semibold">
                <CurrentIcon size={14} className="text-primary" />
                <span>{mobileSections[currentSectionIndex].label}</span>
              </div>
              
              <button
                onClick={goToNextSection}
                className="mobile-nav-btn"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Section dots */}
            <div className="flex justify-center gap-1.5 mb-3">
              {mobileSections.map((section, i) => (
                <button
                  key={section.key}
                  onClick={() => setMobileSection(section.key)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentSectionIndex 
                      ? 'bg-primary w-4' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>

            {/* Section content */}
            <div className="min-h-[120px]">
              {mobileSection === 'colours' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="control-label">Colours</span>
                    <button
                      onClick={handleRandomBoth}
                      className="flex items-center gap-1 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground hover:text-accent bg-secondary/80 hover:bg-accent/10 border border-border/60 hover:border-accent/50 rounded-md transition-all"
                    >
                      <Shuffle size={10} />
                      Random Both
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <ColourPicker label="Colour 1" colour={colour1} onChange={setColour1} compact />
                    <ColourPicker label="Colour 2" colour={colour2} onChange={setColour2} compact />
                  </div>
                </div>
              )}

              {mobileSection === 'style' && (
                <div className="space-y-3">
                  <StyleSelector style={style} onChange={setStyle} />
                  <FormatSelector format={format} onChange={setFormat} />
                </div>
              )}

              {mobileSection === 'direction' && (
                <div className="flex flex-col items-center gap-3">
                  <DirectionPicker direction={direction} onChange={setDirection} />
                  <button
                    onClick={handleViewShowcase}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wide bg-background/80 text-foreground rounded-lg hover:bg-background transition-colors border border-border/50"
                  >
                    <Eye size={14} />
                    View Showcase
                  </button>
                </div>
              )}

              {mobileSection === 'code' && (
                <CodeOutput css={fullCSS} />
              )}
            </div>
          </div>
        </div>

        {/* About - Desktop only */}
        <div className="hidden lg:block absolute bottom-4 left-4 z-10">
          <div className="glass-panel rounded-xl p-3 w-[280px]">
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Create beautiful CSS gradients with ease. Choose your colours, style, and direction,
              then copy the generated code directly into your project.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
