import fs from 'fs'
import path from 'path'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'guides', 'articles')

export interface TOCItem {
  id: string
  title: string
  level: number
}

/**
 * Extract headings from markdown content for table of contents
 */
export function extractHeadings(content: string): TOCItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: TOCItem[] = []

  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const title = match[2].trim()
    const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    headings.push({ id, title, level })
  }

  return headings
}

/**
 * Load markdown content for an article
 * Looks for file at: content/guides/articles/{pillarSlug}/{articleSlug}.md
 */
export function getArticleContent(pillarSlug: string, articleSlug: string): string | null {
  const filePath = path.join(CONTENT_DIR, pillarSlug, `${articleSlug}.md`)

  try {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf-8')
    }
  } catch (error) {
    console.error(`Error loading content for ${pillarSlug}/${articleSlug}:`, error)
  }

  return null
}

/**
 * Check if article has custom content
 */
export function hasArticleContent(pillarSlug: string, articleSlug: string): boolean {
  const filePath = path.join(CONTENT_DIR, pillarSlug, `${articleSlug}.md`)
  return fs.existsSync(filePath)
}

/**
 * Get all articles that have content files
 */
export function getArticlesWithContent(): { pillar: string; article: string }[] {
  const articles: { pillar: string; article: string }[] = []

  try {
    if (!fs.existsSync(CONTENT_DIR)) {
      return articles
    }

    const pillarDirs = fs.readdirSync(CONTENT_DIR)

    for (const pillarSlug of pillarDirs) {
      const pillarPath = path.join(CONTENT_DIR, pillarSlug)
      if (fs.statSync(pillarPath).isDirectory()) {
        const files = fs.readdirSync(pillarPath)
        for (const file of files) {
          if (file.endsWith('.md')) {
            articles.push({
              pillar: pillarSlug,
              article: file.replace('.md', '')
            })
          }
        }
      }
    }
  } catch (error) {
    console.error('Error scanning content directory:', error)
  }

  return articles
}
