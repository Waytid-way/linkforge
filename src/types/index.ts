export interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  theme: ThemeName;
  created_at: string;
  updated_at: string;
}

export interface Link {
  id: string;
  profile_id: string;
  title: string;
  url: string;
  icon: string | null;
  position: number;
  click_count: number;
  created_at: string;
  updated_at: string;
}

export type ThemeName = 'default' | 'ocean' | 'sunset' | 'forest' | 'midnight';

export interface Theme {
  name: ThemeName;
  label: string;
  colors: {
    bg: string;
    surface: string;
    accent: string;
  };
}

export const THEMES: Theme[] = [
  {
    name: 'default',
    label: 'Default',
    colors: { bg: '#0A0A0F', surface: '#16161D', accent: '#FF6B35' },
  },
  {
    name: 'ocean',
    label: 'Ocean',
    colors: { bg: '#0A1628', surface: '#162236', accent: '#38BDF8' },
  },
  {
    name: 'sunset',
    label: 'Sunset',
    colors: { bg: '#1A0A0F', surface: '#261620', accent: '#F472B6' },
  },
  {
    name: 'forest',
    label: 'Forest',
    colors: { bg: '#0A1A0F', surface: '#162616', accent: '#22C55E' },
  },
  {
    name: 'midnight',
    label: 'Midnight',
    colors: { bg: '#0F0F1A', surface: '#1A1A28', accent: '#A78BFA' },
  },
];