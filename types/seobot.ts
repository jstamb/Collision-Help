// SEOBot types based on their documentation
// https://docs.seobotai.com/

export interface ITag {
  id: string
  title: string
  slug: string
}

export interface ICategory {
  id: string
  title: string
  slug: string
}

export interface IRelatedPost {
  id: string
  headline: string
  slug: string
}

// Full article type (returned by getArticle)
export interface IArticle {
  id: string
  slug: string
  headline: string
  metaDescription: string
  metaKeywords: string
  tags: ITag[]
  category: ICategory
  readingTime: number
  html: string
  markdown: string
  outline: string
  deleted: boolean
  published: boolean
  publishedAt: string
  createdAt: string
  updatedAt: string
  relatedPosts: IRelatedPost[]
  image: string
}

// Index article type (returned by getArticles, getCategoryArticles, getTagArticles)
// This is a subset of IArticle without full content fields
export interface IArticleIndex {
  id: string
  slug: string
  headline: string
  metaDescription: string
  category?: ICategory
  readingTime?: number
  publishedAt: string
  updatedAt?: string
  image?: string
}
