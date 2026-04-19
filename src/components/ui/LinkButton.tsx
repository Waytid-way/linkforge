'use client';

import { cn } from '@/lib/utils';
import { Link2, ExternalLink } from 'lucide-react';
import type { Link } from '@/types';

interface LinkButtonProps {
  link: Link;
  onClick?: () => void;
  className?: string;
}

export function LinkButton({ link, onClick, className }: LinkButtonProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={cn(
        'group relative flex items-center gap-3 w-full p-4 rounded-xl',
        'bg-surface border border-border',
        'hover:border-accent hover:shadow-lg hover:shadow-accent/10',
        'hover:scale-[1.02] active:scale-[0.98]',
        'transition-all duration-200 ease-out',
        'cursor-pointer',
        className
      )}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface-2 border border-border group-hover:bg-accent/10 group-hover:border-accent/30 transition-colors">
        {link.icon ? (
          <span className="text-lg">{link.icon}</span>
        ) : (
          <Link2 className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <span className="block font-medium text-text-primary group-hover:text-accent transition-colors truncate">
          {link.title}
        </span>
      </div>

      <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors flex-shrink-0" />
    </a>
  );
}