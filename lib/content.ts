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
 * Only extracts H2 headings to keep TOC concise
 */
export function extractHeadings(content: string): TOCItem[] {
  const headingRegex = /^##\s+(.+)$/gm
  const headings: TOCItem[] = []

  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const title = match[1].trim()
    const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    headings.push({ id, title, level: 2 })
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
 * Extract FAQ question/answer pairs from an article's "Frequently Asked Questions"
 * section. Questions are H3 (###) headings within that section; the answer is the
 * paragraph text that follows. Used to emit FAQPage JSON-LD for rich results.
 */
export function extractFAQs(content: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = []
  if (!content) return faqs

  // Isolate the FAQ section (from the FAQ H2 heading to the next H2 or end of doc)
  const sectionMatch = content.match(/##\s+Frequently Asked Questions([\s\S]*?)(?:\n##\s+|$)/i)
  if (!sectionMatch) return faqs

  const section = sectionMatch[1]
  const qaRegex = /###\s+(.+?)\n([\s\S]*?)(?=\n###\s+|$)/g
  let match
  while ((match = qaRegex.exec(section)) !== null) {
    const question = match[1].trim()
    // Collapse the answer to plain text: strip markdown emphasis/links, join lines.
    const answer = match[2]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[*_>#`]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
    if (question && answer) {
      faqs.push({ question, answer })
    }
  }

  return faqs
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
