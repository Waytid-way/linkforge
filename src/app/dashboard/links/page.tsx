'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, ExternalLink, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { LinkForm } from '@/components/ui/LinkForm';
import { cn } from '@/lib/utils';
import type { Link } from '@/types';

export default function LinksPage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  async function fetchLinks() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('links')
      .select('*')
      .eq('profile_id', user.id)
      .order('position', { ascending: true });

    setLinks(data || []);
    setIsLoading(false);
  }

  async function handleCreateLink(data: { title: string; url: string; icon: string }) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from('links').insert({
      profile_id: user.id,
      title: data.title,
      url: data.url,
      icon: data.icon || null,
      position: links.length,
    });

    if (!error) {
      setIsFormOpen(false);
      fetchLinks();
    }
  }

  async function handleUpdateLink(data: { title: string; url: string; icon: string }) {
    const supabase = createClient();
    if (!editingLink) return;

    const { error } = await supabase
      .from('links')
      .update({
        title: data.title,
        url: data.url,
        icon: data.icon || null,
      })
      .eq('id', editingLink.id);

    if (!error) {
      setEditingLink(null);
      fetchLinks();
    }
  }

  async function handleDeleteLink(id: string) {
    const supabase = createClient();
    setDeletingId(id);
    await supabase.from('links').delete().eq('id', id);
    setDeletingId(null);
    fetchLinks();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl text-text-primary">Links</h1>
          <p className="text-text-muted mt-1">Manage your link buttons</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add Link
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      ) : links.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-border">
          <p className="text-text-muted mb-4">No links yet. Add your first link!</p>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Add Your First Link
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {links.map((link, index) => (
            <div
              key={link.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border hover:border-accent/30 transition-colors group animate-fade-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface-2 border border-border group-hover:bg-accent/10 transition-colors">
                {link.icon ? (
                  <span className="text-lg">{link.icon}</span>
                ) : (
                  <ExternalLink className="w-5 h-5 text-text-muted" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <span className="font-medium text-text-primary block truncate">{link.title}</span>
                <span className="text-sm text-text-muted truncate block">{link.url}</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setEditingLink(link)}
                  className="p-2 rounded-lg hover:bg-surface-2 transition-colors text-text-muted hover:text-text-primary"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteLink(link.id)}
                  disabled={deletingId === link.id}
                  className="p-2 rounded-lg hover:bg-red-500/10 transition-colors text-text-muted hover:text-red-500 disabled:opacity-50"
                >
                  {deletingId === link.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isFormOpen && (
        <LinkForm
          mode="create"
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleCreateLink}
        />
      )}

      {editingLink && (
        <LinkForm
          mode="edit"
          initialData={{
            title: editingLink.title,
            url: editingLink.url,
            icon: editingLink.icon || '',
          }}
          onClose={() => setEditingLink(null)}
          onSubmit={handleUpdateLink}
        />
      )}
    </div>
  );
}