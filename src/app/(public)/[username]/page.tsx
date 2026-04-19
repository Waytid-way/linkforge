import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { Avatar } from '@/components/ui/Avatar';
import { LinkButton } from '@/components/ui/LinkButton';
import { THEMES } from '@/types';
import { Link2 } from 'lucide-react';

interface PageProps {
  params: Promise<{ username: string }>;
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { username } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (!profile) {
    notFound();
  }

  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('profile_id', profile.id)
    .order('position', { ascending: true });

  const theme = THEMES.find((t) => t.name === profile.theme) || THEMES[0];

  const sortedLinks = [...(links || [])].sort((a, b) => a.position - b.position);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: theme.colors.bg }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 right-1/4 h-[500px] bg-gradient-to-b from-accent/10 to-transparent blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <main className="relative flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4 animate-fade-up" style={{ animationDelay: '0ms' }}>
            <Avatar
              src={profile.avatar_url}
              name={profile.display_name || profile.username}
              size="xl"
              className="mx-auto ring-4 ring-accent/20"
            />
            <div>
              <h1
                className="font-display text-4xl text-text-primary"
                style={{ color: 'var(--text-primary)' }}
              >
                {profile.display_name || profile.username}
              </h1>
              <p className="mt-2 text-text-muted">@{profile.username}</p>
            </div>
            {profile.bio && (
              <p className="text-text-muted max-w-sm mx-auto leading-relaxed">
                {profile.bio}
              </p>
            )}
          </div>

          <div className="space-y-3">
            {sortedLinks.length === 0 ? (
              <div
                className="text-center py-8 px-6 rounded-2xl border border-dashed border-border"
                style={{ borderColor: theme.colors.accent + '40' }}
              >
                <Link2 className="w-8 h-8 mx-auto mb-3 text-text-muted" />
                <p className="text-text-muted">No links yet</p>
              </div>
            ) : (
              sortedLinks.map((link, index) => (
                <div
                  key={link.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${(index + 1) * 80}ms` }}
                >
                  <LinkButton
                    link={link}
                    className="border-border"
                  />
                </div>
              ))
            )}
          </div>

          <footer className="text-center pt-8 animate-fade-up" style={{ animationDelay: '600ms' }}>
            <p className="text-text-muted text-sm">
              <a
                href="/"
                className="hover:text-accent transition-colors"
                style={{ color: theme.colors.accent }}
              >
                LinkForge
              </a>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}