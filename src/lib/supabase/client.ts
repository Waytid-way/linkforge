import { createBrowserClient } from '@supabase/ssr';

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
const DEMO_USER = { id: 'demo-user', email: 'demo@linkforge.app' };
const DEMO_PROFILE = {
  id: 'demo-user',
  username: 'demo',
  display_name: 'Demo User',
  bio: 'This is a demo profile. Connect Supabase to enable full functionality.',
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

let client: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (DEMO_MODE) {
    return createDemoClient();
  }
  if (!client) {
    client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
    );
  }
  return client;
}

function createDemoClient() {
  return {
    auth: {
      getUser: async () => ({ data: { user: DEMO_USER }, error: null }),
      signInWithPassword: async () => ({ data: { user: DEMO_USER, session: {} }, error: null }),
      signUp: async () => ({ data: { user: DEMO_USER }, error: null }),
      signOut: async () => ({ error: null }),
    },
    from: (table: string) => ({
      select: () => ({
        eq: () => ({
          single: async () => {
            if (table === 'profiles') return { data: DEMO_PROFILE, error: null };
            if (table === 'links') return { data: DEMO_LINKS, error: null };
            return { data: null, error: null };
          }),
          order: () => ({
            limit: async () => {
              if (table === 'links') return { data: DEMO_LINKS, error: null };
              return { data: null, error: null };
            }),
          }),
        }),
      }),
      insert: async () => ({ data: DEMO_LINKS[0], error: null }),
      update: async () => ({ data: DEMO_PROFILE, error: null }),
      delete: async () => ({ error: null }),
    }),
  } as any;
}