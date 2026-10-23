import { synonyms, type Test } from '../../config/tests';

function normalise(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFC')
    .replace(/[()\/,.-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Matches a query against test names, keywords and the everyday-word
 * synonym map. Returns ids in directory order.
 */
export function searchTests(all: Test[], query: string): Set<string> {
  const q = normalise(query);
  const hits = new Set<string>();
  if (!q) {
    all.forEach((t) => hits.add(t.id));
    return hits;
  }

  for (const [word, ids] of Object.entries(synonyms)) {
    const w = normalise(word);
    // "sugar test" contains "sugar"; "kidn" is the start of "kidney".
    const wordInQuery = new RegExp(`(^| )${escape(w)}( |$)`).test(q);
    const queryStartsWord = q.length >= 3 && w.startsWith(q);
    if (wordInQuery || queryStartsWord) ids.forEach((id) => hits.add(id));
  }

  for (const t of all) {
    const haystack = normalise([t.name, ...(t.keywords ?? []), ...(t.parameters ?? []).map((p) => p.name)].join(' | '));
    if (haystack.includes(q)) hits.add(t.id);
    else if (q.split(' ').every((part) => part.length > 1 && haystack.includes(part))) hits.add(t.id);
  }
  return hits;
}

function escape(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
