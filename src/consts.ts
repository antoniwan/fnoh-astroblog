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
  'healing-growth': {
    title: 'Healing & Growth',
    emoji: '🌱',
    description: 'Essays on emotional regulation, compassion, and creating safety. Frameworks, rituals, and scaffolding for personal growth and empathy. Documentation of survival strategies and rebuilding processes.'
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
