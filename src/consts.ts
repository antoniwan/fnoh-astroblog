// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Field Notes on Humanity';
export const SITE_DESCRIPTION = 'A collection of observations, reflections, and frameworks exploring human experience, relationships, and contemporary life through various lenses of inquiry.';

export const CATEGORIES = {
  'lessons-in-balance': {
    title: 'Lessons in Balance',
    emoji: '⚖️',
    description: 'Content covering fatherhood, stepfatherhood, respect, communication, and boundaries. Personal experiences examined for patterns and principles.'
  },
  'chaos-notes': {
    title: 'Chaos Notes',
    emoji: '🌀',
    description: 'Short fragments and field notes in process. Observations and thoughts marked as works-in-progress.'
  },
  'recovery-reconstruction': {
    title: 'Recovery & Reconstruction',
    emoji: '🏗️',
    description: 'Essays on emotional regulation, compassion, and creating safety. Frameworks, rituals, and scaffolding for personal growth and empathy. Documentation of survival strategies and rebuilding processes.'
  },
  'empathy-healing': {
    title: 'Empathy & Healing',
    emoji: '🌱',
    description: 'Content focused on emotional intelligence, compassion, and healing processes. Tools and frameworks for building empathy and supporting others through difficult times.'
  },
  'modern-life': {
    title: 'Modern Life (Systems & Culture)',
    emoji: '🌐',
    description: 'Analysis of contemporary systems including capitalism, media, technology, and cultural phenomena. Anthropological examination of living in the present moment.'
  },
  'curiosity-lab': {
    title: 'Curiosity Lab',
    emoji: '🧪',
    description: 'Intellectual experiments, philosophical inquiries, and exploration of big questions. Testing ground for ideas and examination of fundamental concepts.'
  }
} as const;

// Utility functions to reduce duplication
export const getCategoryDisplayName = (category: keyof typeof CATEGORIES) => {
  return CATEGORIES[category]?.title || category;
};

export const getCategoryUrl = (category: keyof typeof CATEGORIES) => {
  return `/${category}`;
};

export const getCategoryEmoji = (category: keyof typeof CATEGORIES) => {
  return CATEGORIES[category]?.emoji || '📁';
};

export const getCategoryDescription = (category: keyof typeof CATEGORIES) => {
  return CATEGORIES[category]?.description || `Posts in the ${category} category`;
};

// Type for category keys
export type CategoryKey = keyof typeof CATEGORIES;
