'use client'

import { useState } from 'react'
import { createArticle } from './actions'
import { 
  FileText, 
  Link as LinkIcon, 
  Send, 
  LogOut, 
  Image as ImageIcon, 
  Youtube, 
  Calendar, 
  Star 
} from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [heroImageUrl, setHeroImageUrl] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [youtubeVideoId, setYoutubeVideoId] = useState('')
  const [isPublished, setIsPublished] = useState(true)
  const [isHeadline, setIsHeadline] = useState(false)
  const [customTimestamp, setCustomTimestamp] = useState('')
  
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // O(1) Slug Generator
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTitle(value)
    setSlug(
      value
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
    )
  }

  // O(1) YouTube ID Extractor (Parses standard, short, and embed links)
  const handleYoutubeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setYoutubeUrl(val)
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = val.match(regExp)
    if (match && match[2].length === 11) {
      setYoutubeVideoId(match[2])
    } else {
      setYoutubeVideoId(val) // fallback if user inputs raw ID
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus(null)

    const formData = new FormData()
    formData.append('title', title)
    formData.append('slug', slug)
    formData.append('content', content)
    formData.append('hero_image_url', heroImageUrl)
    formData.append('youtube_video_id', youtubeVideoId)
    formData.append('is_published', String(isPublished))
    formData.append('is_headline', String(isHeadline))
    if (customTimestamp) {
      formData.append('created_at', new Date(customTimestamp).toISOString())
    }

    const res = await createArticle(formData)

    if (res?.error) {
      setStatus({ type: 'error', msg: res.error })
    } else {
      setStatus({ type: 'success', msg: 'Article published successfully!' })
      setTitle('')
      setSlug('')
      setContent('')
      setHeroImageUrl('')
      setYoutubeUrl('')
      setYoutubeVideoId('')
      setCustomTimestamp('')
      setIsHeadline(false)
    }
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-[#ffad00] selection:text-black">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/60 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <span className="w-3 h-3 rounded-full bg-[#ffad00] animate-pulse" />
          <h1 className="font-bold text-lg tracking-wide uppercase">
            LNW <span className="text-[#0093c9]">CMS Studio</span>
          </h1>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center space-x-2 text-xs font-semibold text-neutral-400 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </header>

      {/* Main Form Canvas */}
      <main className="max-w-4xl mx-auto py-10 px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-black tracking-tight border-l-4 border-[#ffad00] pl-4">
            Create New Article
          </h2>
          <p className="text-sm text-neutral-400 mt-1 pl-5">
            Publish articles, attach video embeds, and set headline statuses.
          </p>
        </div>

        {status && (
          <div
            className={`mb-6 p-4 rounded-xl text-sm border font-medium ${
              status.type === 'success'
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                : 'bg-red-950/40 border-red-500/50 text-red-300'
            }`}
          >
            {status.msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">Article Title</label>
            <div className="relative">
              <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter article headline..."
                className="w-full pl-10 pr-4 py-3 bg-neutral-900/80 border border-neutral-800 rounded-xl text-white font-semibold focus:outline-none focus:border-[#ffad00] transition-colors"
              />
            </div>
          </div>

          {/* URL Slug Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">URL Slug</label>
            <div className="relative">
              <LinkIcon className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="auto-generated-slug"
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-900/50 border border-neutral-800 rounded-xl text-neutral-300 text-sm font-mono focus:outline-none focus:border-[#0093c9] transition-colors"
              />
            </div>
          </div>

          {/* Grid Layout for Media Embeds */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hero Image URL */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">Hero Image URL</label>
              <div className="relative">
                <ImageIcon className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
                <input
                  type="url"
                  value={heroImageUrl}
                  onChange={(e) => setHeroImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-900/50 border border-neutral-800 rounded-xl text-neutral-200 text-sm focus:outline-none focus:border-[#ffad00] transition-colors"
                />
              </div>
            </div>

            {/* YouTube Video Link */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                YouTube Link / Video ID {youtubeVideoId && <span className="text-[#0093c9] font-mono">({youtubeVideoId})</span>}
              </label>
              <div className="relative">
                <Youtube className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  value={youtubeUrl}
                  onChange={handleYoutubeChange}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-900/50 border border-neutral-800 rounded-xl text-neutral-200 text-sm focus:outline-none focus:border-[#0093c9] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Timestamp Override Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Publish Date & Time <span className="text-neutral-500 text-[10px] uppercase">(Optional Override)</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
              <input
                type="datetime-local"
                value={customTimestamp}
                onChange={(e) => setCustomTimestamp(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-900/50 border border-neutral-800 rounded-xl text-neutral-300 text-sm focus:outline-none focus:border-[#ffad00] transition-colors"
              />
            </div>
          </div>

          {/* Article Body */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">Article Body (Markdown)</label>
            <textarea
              required
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write core article content here..."
              className="w-full p-4 bg-neutral-900/80 border border-neutral-800 rounded-xl text-white text-sm font-sans focus:outline-none focus:border-[#ffad00] transition-colors leading-relaxed"
            />
          </div>

          {/* Flags and Submission Control */}
          <div className="p-5 bg-neutral-900/80 border border-neutral-800 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6">
              <label className="flex items-center space-x-2.5 text-sm font-medium text-neutral-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-4 h-4 accent-[#ffad00] rounded cursor-pointer"
                />
                <span>Publish Immediately</span>
              </label>

              <label className="flex items-center space-x-2.5 text-sm font-medium text-neutral-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isHeadline}
                  onChange={(e) => setIsHeadline(e.target.checked)}
                  className="w-4 h-4 accent-[#0093c9] rounded cursor-pointer"
                />
                <span className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-[#ffad00]" />
                  Set as Hero Headline
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto flex items-center justify-center space-x-2 px-8 py-3 bg-[#ffad00] hover:bg-[#ffad00]/90 text-black font-extrabold rounded-xl transition-all shadow-lg hover:shadow-[#ffad00]/20 disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Saving...' : 'Publish Article'}</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}