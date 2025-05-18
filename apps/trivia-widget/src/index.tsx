import { h, render } from 'preact'
import { Widget } from './Widget'

export { Widget }

export function loadTriviaWidget({ targetId, triviaId, apiUrl }: { targetId: string; triviaId: string; apiUrl?: string }) {
  const el = document.getElementById(targetId)
  if (!el) throw new Error('target element not found')
  render(<Widget triviaId={triviaId} apiUrl={apiUrl} />, el)
}