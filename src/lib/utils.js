/** Merge class names (simple join; no Tailwind merge). */
export function cn(...parts) {
  return parts.flat().filter(Boolean).join(' ')
}
