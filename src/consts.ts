// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Field Notes on Humanity';
export const SITE_DESCRIPTION = 'A collection of observations, reflections, and frameworks exploring human experience, relationships, and contemporary life through various lenses of inquiry.';

export const CATEGORIES = {
  'lessons-in-balance': {
    title: 'Lessons in Balance',
    emoji: '⚖️',
    description: 'Explorations of fatherhood, stepfatherhood, respect, communication, and boundaries. Content that distills personal experiences into universal values and principles.'
  },
  'chaos-notes': {
    title: 'Chaos Notes',
    emoji: '🌀',
    description: 'Short, raw fragments and field notes in process. Unfiltered observations and thoughts marked as works-in-progress to maintain authenticity.'
  },
  'recovery-reconstruction': {
    title: 'Recovery & Reconstruction',
    emoji: '🏗️',
    description: 'Frameworks, rituals, and scaffolding for personal growth and empathy. Documentation of survival strategies and rebuilding processes.'
  },
  'empathy-healing': {
    title: 'Empathy & Healing',
    emoji: '💝',
    description: 'Essays on emotional regulation, compassion, and creating safety. Exploration of how empathy functions as both shield and bridge in human relationships.'
  },
  'modern-life': {
    title: 'Modern Life (Systems & Culture)',
    emoji: '🌐',
    description: 'Critical analysis of contemporary systems including capitalism, media, technology, and cultural phenomena. Anthropological examination of living in the present moment.'
  },
  'curiosity-lab': {
    title: 'Curiosity Lab',
    emoji: '🧪',
    description: 'Intellectual experiments, philosophical inquiries, and exploration of big questions. A sandbox for testing ideas and examining fundamental concepts.'
  }
} as const;
