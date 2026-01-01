import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface CodeOutputProps {
  css: string;
}

export function CodeOutput({ css }: CodeOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      toast({
        title: 'Copied!',
        description: 'CSS copied to clipboard',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Please try again',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-muted-foreground">Generated CSS</label>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-accent bg-secondary hover:bg-accent/10 border border-border hover:border-accent/50 rounded-lg transition-all duration-200"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="relative">
        <pre className="p-4 bg-secondary rounded-lg border border-border overflow-x-auto">
          <code className="text-sm font-mono text-foreground">{css}</code>
        </pre>
      </div>
    </div>
  );
}
