'use client';

import { cn, generateInitials } from '@/lib/utils';
import Image from 'next/image';

interface AvatarProps {
  src?: string | null;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-20 h-20 text-xl',
  xl: 'w-32 h-32 text-3xl',
};

const gradients = [
  'from-orange-500 to-pink-500',
  'from-blue-500 to-cyan-400',
  'from-pink-500 to-rose-400',
  'from-green-500 to-emerald-400',
  'from-purple-500 to-violet-400',
];

function getGradientForName(name: string): string {
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return gradients[index % gradients.length];
}

export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  const initials = generateInitials(name || '?');
  const gradient = getGradientForName(name || '');

  if (src) {
    return (
      <div
        className={cn(
          'relative overflow-hidden rounded-full flex items-center justify-center',
          sizeClasses[size],
          className
        )}
      >
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-full flex items-center justify-center bg-gradient-to-br font-semibold text-white',
        sizeClasses[size],
        gradient,
        className
      )}
    >
      {initials}
    </div>
  );
}