import { getCollection, getEntry, getEntries, type CollectionEntry, type ReferenceDataEntry } from 'astro:content';

export interface CategoryData {
  title: string;
  emoji: string;
  description: string;
  slug: string;
}

export interface CategoryWithCount extends CategoryData {
  postCount: number;
}

// Cache for better performance
let categoriesCache: CategoryData[] | null = null;
let categoriesWithCountsCache: CategoryWithCount[] | null = null;
let categoriesWithPostsCache: CategoryData[] | null = null;

/**
 * Get all categories from the collection with caching
 */
export async function getAllCategories(): Promise<CategoryData[]> {
  if (categoriesCache) {
    return categoriesCache;
  }
  
  try {
    const categories = await getCollection('categories');
    
    // Properly extract category data from collection entries
    const categoryData: CategoryData[] = categories.map(category => ({
      title: category.data.title,
      emoji: category.data.emoji,
      description: category.data.description,
      slug: category.data.slug
    }));
    
    categoriesCache = categoryData;
    return categoryData;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Get a specific category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<CategoryData | undefined> {
  try {
    const categories = await getAllCategories();
    return categories.find(category => category.slug === slug);
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    return undefined;
  }
}

/**
 * Get categories with post counts with caching
 */
export async function getCategoriesWithPostCounts(): Promise<CategoryWithCount[]> {
  if (categoriesWithCountsCache) {
    return categoriesWithCountsCache;
  }
  
  try {
    const categories = await getAllCategories();
    const writings = await getCollection('writings');
    
    console.log('Categories found:', categories);
    console.log('Writings found:', writings.length);
    
    const result = categories.map(category => {
      const postCount = writings.filter(post => {
        // Check if post has a category reference that matches this category
        // The reference will be {collection: 'categories', id: 'filename'}
        // We need to match the id with the category slug
        return post.data.category && 
               post.data.category.collection === 'categories' && 
               post.data.category.id === category.slug;
      }).length;
      
      console.log(`Category "${category.slug}" has ${postCount} posts`);
      
      return {
        ...category,
        postCount
      };
    });
    
    categoriesWithCountsCache = result;
    return result;
  } catch (error) {
    console.error('Error fetching categories with post counts:', error);
    return [];
  }
}

/**
 * Get categories that have posts with caching
 */
export async function getCategoriesWithPosts(): Promise<CategoryData[]> {
  if (categoriesWithPostsCache) {
    return categoriesWithPostsCache;
  }
  
  try {
    const categories = await getAllCategories();
    const writings = await getCollection('writings');
    
    const result = categories.filter(category => 
      writings.some(post => 
        post.data.category && 
        post.data.category.collection === 'categories' && 
        post.data.category.id === category.slug
      )
    );
    
    categoriesWithPostsCache = result;
    return result;
  } catch (error) {
    console.error('Error fetching categories with posts:', error);
    return [];
  }
}

/**
 * Get category data from a writing entry's category reference
 */
export async function getCategoryFromReference(categoryRef: ReferenceDataEntry<'categories', string> | undefined): Promise<CategoryData | undefined> {
  if (!categoryRef || categoryRef.collection !== 'categories') {
    return undefined;
  }
  
  try {
    const category = await getEntry('categories', categoryRef.id);
    if (category) {
      return {
        title: category.data.title,
        emoji: category.data.emoji,
        description: category.data.description,
        slug: category.data.slug
      };
    }
    return undefined;
  } catch (error) {
    console.error('Error fetching category from reference:', error);
    return undefined;
  }
}

/**
 * Get all writings with resolved category data
 */
export async function getWritingsWithCategories() {
  try {
    const writings = await getCollection('writings');
    
    // Resolve category references for each writing
    const writingsWithCategories = await Promise.all(
      writings.map(async (writing) => {
        let categoryData = null;
        if (writing.data.category) {
          categoryData = await getCategoryFromReference(writing.data.category);
        }
        
        return {
          ...writing,
          categoryData
        };
      })
    );
    
    return writingsWithCategories;
  } catch (error) {
    console.error('Error fetching writings with categories:', error);
    return [];
  }
}

/**
 * Clear cache when needed (e.g., during development)
 */
export function clearCategoriesCache(): void {
  categoriesCache = null;
  categoriesWithCountsCache = null;
  categoriesWithPostsCache = null;
}

/**
 * Utility functions for backward compatibility
 */
export const getCategoryDisplayName = (category: string, categories: CategoryData[]): string => {
  const found = categories.find(c => c.slug === category);
  return found?.title || category;
};

export const getCategoryEmoji = (category: string, categories: CategoryData[]): string => {
  const found = categories.find(c => c.slug === category);
  return found?.emoji || '📁';
};

export const getCategoryDescription = (category: string, categories: CategoryData[]): string => {
  const found = categories.find(c => c.slug === category);
  return found?.description || `Posts in the ${category} category`;
};

/**
 * Get the URL for a category
 */
export const getCategoryUrl = (category: string): string => {
  return `/${category}`;
};
