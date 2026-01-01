interface GradientPreviewProps {
  gradient: string;
}

export function GradientPreview({ gradient }: GradientPreviewProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">Preview</label>
      <div 
        className="w-full aspect-video rounded-xl border border-border/50 shadow-2xl transition-all duration-500"
        style={{ background: gradient }}
      />
    </div>
  );
}
