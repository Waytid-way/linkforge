import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar } from '@/components/ui/Avatar';

describe('Avatar Component', () => {
  it('renders with initials when no src', () => {
    render(<Avatar name="John Doe" size="md" />);
    expect(screen.getByText('JD')).toBeTruthy();
  });

  it('renders with correct size class', () => {
    const { container } = render(<Avatar name="John" size="lg" />);
    expect(container.querySelector('.w-20')).toBeTruthy();
  });

  it('handles empty name', () => {
    const { container } = render(<Avatar name="" size="md" />);
    expect(container.querySelector('.w-12')).toBeTruthy();
  });
});