'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { isValidUrl } from '@/lib/utils';

interface LinkFormProps {
  onClose: () => void;
  onSubmit: (data: { title: string; url: string; icon: string }) => void;
  initialData?: { title: string; url: string; icon: string };
  mode: 'create' | 'edit';
}

const COMMON_ICONS = ['🔗', '📝', '📷', '🎥', '🎵', '📱', '💼', '🌐', '✨', '🔥', '💡', '⭐'];

export function LinkForm({ onClose, onSubmit, initialData, mode }: LinkFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [url, setUrl] = useState(initialData?.url || '');
  const [icon, setIcon] = useState(initialData?.icon || '');
  const [errors, setErrors] = useState<{ title?: string; url?: string }>({});

  function validate(): boolean {
    const newErrors: { title?: string; url?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!url.trim()) {
      newErrors.url = 'URL is required';
    } else if (!isValidUrl(url)) {
      newErrors.url = 'Please enter a valid URL (https://...)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      onSubmit({ title: title.trim(), url: url.trim(), icon });
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">
            {mode === 'create' ? 'Add New Link' : 'Edit Link'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-2 transition-colors"
          >
            <X className="w-5 h-5 text-text-muted" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Website"
              className="w-full px-4 py-3 bg-surface-2 border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">
              URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-3 bg-surface-2 border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
            {errors.url && (
              <p className="mt-2 text-sm text-red-500">{errors.url}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">
              Icon (optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_ICONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(icon === emoji ? '' : emoji)}
                  className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all ${
                    icon === emoji
                      ? 'bg-accent border-2 border-accent'
                      : 'bg-surface-2 border border-border hover:border-accent'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border border-border text-text-muted hover:bg-surface-2 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-xl bg-accent text-white font-medium hover:opacity-90 transition-opacity"
            >
              {mode === 'create' ? 'Add Link' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}