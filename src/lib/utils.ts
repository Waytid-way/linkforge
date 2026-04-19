export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

export function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

export function generateInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getGradient(name: string): string {
  const gradients: Record<string, string> = {
    default: 'from-orange-500 to-pink-500',
    ocean: 'from-blue-500 to-cyan-400',
    sunset: 'from-pink-500 to-rose-400',
    forest: 'from-green-500 to-emerald-400',
    midnight: 'from-purple-500 to-violet-400',
  };
  return gradients[name] || gradients.default;
}