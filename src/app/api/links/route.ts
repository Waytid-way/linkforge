import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username required' }, { status: 400 });
  }

  const supabase = await createClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .single();

  if (!profile) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('profile_id', profile.id)
    .order('position', { ascending: true });

  return NextResponse.json({ links: links || [] });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { title, url, icon } = body;

  if (!title || !url) {
    return NextResponse.json({ error: 'Title and URL required' }, { status: 400 });
  }

  const { data: existingLinks } = await supabase
    .from('links')
    .select('position')
    .eq('profile_id', user.id)
    .order('position', { ascending: false })
    .limit(1);

  const nextPosition = existingLinks?.[0]?.position ?? -1;

  const { data, error } = await supabase
    .from('links')
    .insert({
      profile_id: user.id,
      title,
      url,
      icon: icon || null,
      position: nextPosition + 1,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ link: data }, { status: 201 });
}