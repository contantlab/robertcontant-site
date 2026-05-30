/**
 * "Mar 12, 2025" — short, human, locale-stable for an English-language site.
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d);
}

/** "2025-03-12" — for <time datetime=""> attributes. */
export function isoDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().slice(0, 10);
}

/**
 * Rough reading-time estimate from raw markdown.
 * Strips code blocks and frontmatter-style noise before counting words at 220 wpm
 * (a touch faster than the conventional 200 — technical readers skim code).
 */
export function readingTime(markdown: string): { minutes: number; words: number; label: string } {
  const cleaned = markdown
    .replace(/```[\s\S]*?```/g, ' ')   // fenced code
    .replace(/`[^`]*`/g, ' ')          // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[[^\]]*\]\([^)]*\)/g, ' ')  // link targets (keep text would also be OK)
    .replace(/[#>*_~\-]/g, ' ')        // markdown punctuation
    .replace(/\s+/g, ' ')
    .trim();
  const words = cleaned ? cleaned.split(' ').length : 0;
  const minutes = Math.max(1, Math.round(words / 220));
  return { minutes, words, label: `${minutes} min read` };
}
