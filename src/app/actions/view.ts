
'use server';

import supabase from '@/lib/supabase';

export async function incrementView(slug: string) {
  const { error } = await supabase.rpc('increment_view', { slug_input: slug });
  if (error) {
    console.error('Error incrementing view count:', error);
  }
}

export async function getViewCount(slug: string): Promise<number | null> {
  const { data, error } = await supabase
    .from('views')
    .select('count')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching view count:', error);
    return null;
  }

  return data?.count ?? 0;
}
