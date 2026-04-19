import { describe, it, expect } from 'vitest';
import { cn, truncate, isValidUrl, generateInitials, getGradient } from '@/lib/utils';

describe('cn utility', () => {
  it('joins class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('filters out falsy values', () => {
    expect(cn('foo', false, 'bar', undefined, 'baz')).toBe('foo bar baz');
  });

  it('returns empty string for all falsy', () => {
    expect(cn(false, undefined, null)).toBe('');
  });
});

describe('truncate', () => {
  it('returns original string if under max length', () => {
    expect(truncate('hello', 10)).toBe('hello');
  });

  it('truncates with ellipsis if over max length', () => {
    expect(truncate('hello world', 8)).toBe('hello...');
  });

  it('handles exact length', () => {
    expect(truncate('hello', 5)).toBe('hello');
  });
});

describe('isValidUrl', () => {
  it('accepts valid https URL', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
  });

  it('accepts valid http URL', () => {
    expect(isValidUrl('http://example.com')).toBe(true);
  });

  it('rejects invalid URL', () => {
    expect(isValidUrl('not a url')).toBe(false);
  });

  it('rejects empty string', () => {
    expect(isValidUrl('')).toBe(false);
  });
});

describe('generateInitials', () => {
  it('generates initials from name', () => {
    expect(generateInitials('John Doe')).toBe('JD');
  });

  it('handles single name', () => {
    expect(generateInitials('John')).toBe('JO');
  });

  it('handles multiple names', () => {
    expect(generateInitials('John Michael Doe')).toBe('JD');
  });

  it('limits to 2 characters', () => {
    expect(generateInitials('ABC')).toBe('AB');
  });
});

describe('getGradient', () => {
  it('returns gradient for valid name', () => {
    expect(getGradient('ocean')).toBe('from-blue-500 to-cyan-400');
  });

  it('returns default for unknown name', () => {
    expect(getGradient('unknown')).toBe('from-orange-500 to-pink-500');
  });
});