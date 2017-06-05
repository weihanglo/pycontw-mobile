export const PREFER_MARKDOWN = 'PREFER_MARKDOWN'

export function preferMarkdown (preferred) {
  return {
    type: PREFER_MARKDOWN,
    preferred
  }
}
