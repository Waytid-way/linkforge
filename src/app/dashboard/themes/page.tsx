'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { THEMES } from '@/types';
import { cn } from '@/lib/utils';
import { Check, Loader2 } from 'lucide-react';

export default function ThemesPage() {
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('profiles')
      .select('theme')
      .eq('id', user.id)
      .single();

    if (data) {
      setSelectedTheme(data.theme || 'default');
    }
    setIsLoading(false);
  }

  async function handleThemeSelect(themeName: string) {
    const supabase = createClient();
    setSelectedTheme(themeName);
    setIsSaving(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        theme: themeName,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    setIsSaving(false);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl text-text-primary">Themes</h1>
        <p className="text-text-muted mt-1">Choose a color scheme for your profile</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {THEMES.map((theme) => {
          const isSelected = selectedTheme === theme.name;
          return (
            <button
              key={theme.name}
              onClick={() => handleThemeSelect(theme.name)}
              disabled={isSaving}
              className={cn(
                'relative p-6 rounded-2xl border-2 transition-all duration-200 text-left',
                isSelected
                  ? 'border-accent shadow-lg shadow-accent/20'
                  : 'border-border hover:border-accent/50'
              )}
              style={{
                backgroundColor: theme.colors.bg,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="font-semibold text-lg"
                  style={{ color: theme.colors.accent }}
                >
                  {theme.label}
                </span>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div
                  className="h-8 rounded-lg"
                  style={{ backgroundColor: theme.colors.surface }}
                />
                <div
                  className="h-12 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: theme.colors.surface,
                    border: `1px solid ${theme.colors.accent}40`,
                  }}
                >
                  <span
                    className="text-sm px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: theme.colors.accent + '20',
                      color: theme.colors.accent,
                    }}
                  >
                    Sample Link
                  </span>
                </div>
                <div className="flex gap-2">
                  <div
                    className="h-4 w-12 rounded"
                    style={{ backgroundColor: theme.colors.accent }}
                  />
                  <div
                    className="h-4 w-12 rounded"
                    style={{ backgroundColor: theme.colors.accent + '60' }}
                  />
                  <div
                    className="h-4 w-12 rounded"
                    style={{ backgroundColor: theme.colors.accent + '30' }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}