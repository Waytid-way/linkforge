import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
const DEMO_USER = { id: 'demo-user', email: 'demo@linkforge.app' };
const DEMO_PROFILE = {
  id: 'demo-user',
  username: 'demo',
  display_name: 'Demo User',
  bio: 'This is a demo profile. Connect Supabase for full features.',
  avatar_url: null,
  theme: 'default',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};
const DEMO_LINKS = [
  { id: '1', profile_id: 'demo-user', title: 'GitHub', url: 'https://github.com', icon: '💻', position: 0, click_count: 42, created_at: '', updated_at: '' },
  { id: '2', profile_id: 'demo-user', title: 'Twitter', url: 'https://twitter.com', icon: '🐦', position: 1, click_count: 18, created_at: '', updated_at: '' },
  { id: '3', profile_id: 'demo-user', title: 'Portfolio', url: 'https://example.com', icon: '✨', position: 2, click_count: 7, created_at: '', updated_at: '' },
];

export async function createClient() {
  if (DEMO_MODE) {
    return createDemoServerClient();
  }

  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
          }
        },
      },
    }
  );
}

function createDemoServerClient() {
  return {
    auth: {
      getUser: async () => ({ data: { user: DEMO_USER }, error: null }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: DEMO_PROFILE, error: null }),
        }),
        order: () => ({
          limit: async () => ({ data: DEMO_LINKS, error: null }),
        }),
      }),
    }),
  } as any;
}