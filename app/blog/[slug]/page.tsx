import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { BlogClient } from 'seobot'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Calendar, Clock, ChevronRight, Tag, User, ArrowLeft } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getArticle(slug: string): Promise<any | null> {
  const apiKey = process.env.SEOBOT_API_KEY
  if (!apiKey) {
    console.error('SEOBOT_API_KEY is not configured')
    return null
  }

  try {
    const client = new BlogClient(apiKey)
    const article = await client.getArticle(slug)
    return article
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return { title: 'Article Not Found' }
  }

  return {
    title: `${article.headline} | Collision Help`,
    description: article.metaDescription,
    keywords: article.metaKeywords,
    openGraph: {
      title: article.headline,
      description: article.metaDescription,
      url: `https://collisionhelp.org/blog/${slug}`,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: article.image ? [{ url: article.image }] : [],
    },
    alternates: {
      canonical: `https://collisionhelp.org/blog/${slug}`,
    },
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  // Generate Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.metaDescription,
    image: article.image,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Collision Help',
      url: 'https://collisionhelp.org'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Collision Help',
      url: 'https://collisionhelp.org',
      logo: {
        '@type': 'ImageObject',
        url: 'https://collisionhelp.org/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://collisionhelp.org/blog/${slug}`
    }
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://collisionhelp.org'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://collisionhelp.org/blog'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.headline,
        item: `https://collisionhelp.org/blog/${slug}`
      }
    ]
  }

  return (
    <>
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white line-clamp-1">{article.headline}</span>
            </nav>

            <div className="max-w-4xl">
              {article.category && (
                <Link
                  href={`/blog/category/${article.category.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-brand-300 bg-brand-500/20 border border-brand-400/30 rounded-full px-3 py-1 mb-4 hover:bg-brand-500/30 transition-colors"
                >
                  <Tag className="w-3 h-3" />
                  {article.category.title}
                </Link>
              )}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {article.headline}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                {article.publishedAt && (
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                )}
                {article.readingTime && (
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {article.readingTime} min read
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Collision Help Team
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Featured Image */}
              {article.image && (
                <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8 shadow-lg">
                  <Image
                    src={article.image}
                    alt={article.headline}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Article Body */}
              <article
                className="prose prose-slate prose-lg max-w-none
                  prose-headings:font-bold prose-headings:text-slate-900
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-slate-700 prose-p:leading-relaxed
                  prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-slate-900
                  prose-ul:my-4 prose-li:text-slate-700
                  prose-img:rounded-xl prose-img:shadow-md"
                dangerouslySetInnerHTML={{ __html: article.html }}
              />

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-500 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag: any) => (
                      <Link
                        key={tag.id}
                        href={`/blog/tag/${tag.slug}`}
                        className="inline-flex items-center gap-1 text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-full transition-colors"
                      >
                        <Tag className="w-3 h-3" />
                        {tag.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Posts */}
              {article.relatedPosts && article.relatedPosts.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Related Articles</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {article.relatedPosts.slice(0, 2).map((related: any) => (
                      <Link
                        key={related.id}
                        href={`/blog/${related.slug}`}
                        className="group bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors"
                      >
                        <h4 className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                          {related.headline}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Back to Blog */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to All Articles
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Been in a Car Accident?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Get instant AI analysis of your vehicle damage or connect with legal professionals in your area.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/ai-damage-analyzer"
                className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Analyze Your Damage
              </Link>
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Find Local Help
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
