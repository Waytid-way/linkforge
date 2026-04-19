import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, ExternalLink } from 'lucide-react';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('profile_id', user.id)
    .order('position', { ascending: true });

  const publicUrl = profile ? `/${profile.username}` : null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl text-text-primary">Dashboard</h1>
          <p className="text-text-muted mt-1">Manage your link page</p>
        </div>
        {publicUrl && (
          <Link
            href={publicUrl}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-2 border border-border hover:border-accent transition-colors text-text-primary"
          >
            <ExternalLink className="w-4 h-4" />
            View Profile
          </Link>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="p-6 rounded-2xl bg-surface border border-border">
          <div className="text-3xl font-bold text-accent">{links?.length || 0}</div>
          <div className="text-text-muted mt-1">Total Links</div>
        </div>
        <div className="p-6 rounded-2xl bg-surface border border-border">
          <div className="text-3xl font-bold text-green-500">
            {links?.reduce((sum, l) => sum + (l.click_count || 0), 0) || 0}
          </div>
          <div className="text-text-muted mt-1">Total Clicks</div>
        </div>
        <div className="p-6 rounded-2xl bg-surface border border-border">
          <div className="text-3xl font-bold text-purple-500">{profile?.username || '-'}</div>
          <div className="text-text-muted mt-1">Username</div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">Your Links</h2>
          <Link
            href="/dashboard/links"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Add Link
          </Link>
        </div>

        {!links || links.length === 0 ? (
          <div className="text-center py-12 rounded-2xl border border-dashed border-border">
            <p className="text-text-muted mb-4">No links yet. Add your first link!</p>
            <Link
              href="/dashboard/links"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              Add Your First Link
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {links.slice(0, 5).map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border hover:border-accent/30 transition-colors group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface-2 border border-border group-hover:bg-accent/10 transition-colors">
                  {link.icon ? (
                    <span className="text-lg">{link.icon}</span>
                  ) : (
                    <ExternalLink className="w-5 h-5 text-text-muted" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-text-primary group-hover:text-accent transition-colors block truncate">
                    {link.title}
                  </span>
                  <span className="text-sm text-text-muted truncate block">{link.url}</span>
                </div>
                <div className="text-sm text-text-muted">{link.click_count || 0} clicks</div>
              </a>
            ))}
            {links.length > 5 && (
              <Link
                href="/dashboard/links"
                className="block text-center py-3 text-accent hover:underline"
              >
                View all {links.length} links
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}