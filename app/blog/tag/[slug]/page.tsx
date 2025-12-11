import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { BlogClient } from 'seobot'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Calendar, Clock, ChevronRight, ChevronLeft, Tag, BookOpen, Hash } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

const POSTS_PER_PAGE = 12

async function getTagPosts(tagSlug: string, page: number = 0): Promise<{ posts: any[], total: number }> {
  const apiKey = process.env.SEOBOT_API_KEY
  if (!apiKey) {
    console.error('SEOBOT_API_KEY is not configured')
    return { posts: [], total: 0 }
  }

  try {
    const client = new BlogClient(apiKey)
    const response = await client.getTagArticles(tagSlug, page, POSTS_PER_PAGE)

    return {
      posts: response.articles || [],
      total: response.total || 0
    }
  } catch (error) {
    console.error('Error fetching tag posts:', error)
    return { posts: [], total: 0 }
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const tagTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

  return {
    title: `${tagTitle} Articles | Collision Help Blog`,
    description: `Browse all articles tagged with "${tagTitle}". Expert guidance on car accidents, insurance claims, and vehicle damage.`,
    alternates: {
      canonical: `https://collisionhelp.org/blog/tag/${slug}`,
    },
  }
}

export default async function TagPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const resolvedSearchParams = await searchParams
  const currentPage = parseInt(resolvedSearchParams.page || '1', 10) - 1
  const { posts, total } = await getTagPosts(slug, currentPage)
  const totalPages = Math.ceil(total / POSTS_PER_PAGE)
  const displayPage = currentPage + 1

  const tagTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">Tag: {tagTitle}</span>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-400/30 rounded-full px-4 py-2 mb-4">
                <Hash className="w-4 h-4 text-brand-400" />
                <span className="text-sm font-medium text-brand-300">Tag</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Articles Tagged <span className="text-brand-400">"{tagTitle}"</span>
              </h1>

              <p className="text-lg text-slate-300 max-w-2xl">
                Browse all articles tagged with {tagTitle.toLowerCase()}.
                {total > 0 && ` ${total} article${total !== 1 ? 's' : ''} found.`}
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-slate-700 mb-2">No Articles Found</h2>
                <p className="text-slate-500 mb-6">No articles with this tag yet.</p>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to All Articles
                </Link>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post: any) => (
                    <article
                      key={post.id}
                      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                    >
                      <Link href={`/blog/${post.slug}`}>
                        {post.image ? (
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={post.image}
                              alt={post.headline}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ) : (
                          <div className="h-48 bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                            <BookOpen className="w-12 h-12 text-brand-400" />
                          </div>
                        )}

                        <div className="p-6">
                          {post.category && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 bg-brand-50 px-2 py-1 rounded mb-3">
                              <Tag className="w-3 h-3" />
                              {post.category.title}
                            </span>
                          )}

                          <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
                            {post.headline}
                          </h2>

                          <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                            {post.metaDescription}
                          </p>

                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            {post.publishedAt && (
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                            )}
                            {post.readingTime && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {post.readingTime} min read
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    {displayPage > 1 && (
                      <Link
                        href={displayPage === 2 ? `/blog/tag/${slug}` : `/blog/tag/${slug}?page=${displayPage - 1}`}
                        className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Link>
                    )}

                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum: number
                        if (totalPages <= 5) {
                          pageNum = i + 1
                        } else if (displayPage <= 3) {
                          pageNum = i + 1
                        } else if (displayPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i
                        } else {
                          pageNum = displayPage - 2 + i
                        }

                        return (
                          <Link
                            key={pageNum}
                            href={pageNum === 1 ? `/blog/tag/${slug}` : `/blog/tag/${slug}?page=${pageNum}`}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                              pageNum === displayPage
                                ? 'bg-brand-600 text-white'
                                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {pageNum}
                          </Link>
                        )
                      })}
                    </div>

                    {displayPage < totalPages && (
                      <Link
                        href={`/blog/tag/${slug}?page=${displayPage + 1}`}
                        className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                )}

                {/* Back to Blog Link */}
                <div className="text-center mt-8">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    View All Articles
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
