'use server'

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function createArticle(formData: FormData) {
  const cookieStore = await cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value },
        set(name: string, value: string, options: CookieOptions) { cookieStore.set({ name, value, ...options }) },
        remove(name: string, options: CookieOptions) { cookieStore.set({ name, value: '', ...options }) },
      },
    }
  )

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) throw new Error('Unauthorized access.')

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const content = formData.get('content') as string
  const isPublished = formData.get('is_published') === 'true'

  const { error: dbError } = await supabase
    .from('blog_posts')
    .insert([
      {
        title,
        slug,
        content,
        is_published: isPublished,
        author_id: user.id,
        hero_image_url: null,
        youtube_video_id: null,
      }
    ])

  if (dbError) {
    console.error('Database Error:', dbError)
    return { error: dbError.message }
  }

  revalidatePath('/blog')
  revalidatePath('/')
  return { success: true }
}