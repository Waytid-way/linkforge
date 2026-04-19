import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LinkButton } from '@/components/ui/LinkButton';
import type { Link } from '@/types';

describe('LinkButton Component', () => {
  const mockLink: Link = {
    id: '1',
    profile_id: 'profile-1',
    title: 'Test Link',
    url: 'https://example.com',
    icon: '🔗',
    position: 0,
    click_count: 10,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  };

  it('renders link title', () => {
    render(<LinkButton link={mockLink} />);
    expect(screen.getByText('Test Link')).toBeTruthy();
  });

  it('renders icon', () => {
    render(<LinkButton link={mockLink} />);
    expect(screen.getByText('🔗')).toBeTruthy();
  });

  it('has correct href', () => {
    render(<LinkButton link={mockLink} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('opens in new tab', () => {
    render(<LinkButton link={mockLink} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders with default icon when no icon provided', () => {
    const linkWithoutIcon: Link = { ...mockLink, icon: null };
    render(<LinkButton link={linkWithoutIcon} />);
    expect(screen.queryByText('🔗')).toBeFalsy();
  });
});