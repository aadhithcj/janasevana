// Fails the build check if the exported site says something it must not.
//   node scripts/content-guard.mjs        (after `npm run build`)
// Scans the visible text and attributes of every HTML page in out/.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const rules = [
  { name: 'unconfirmed placeholder', re: /TODO_CONFIRM/ },
  { name: 'claim word', re: /\b(best|leading|premier|trusted|accredited|world-class|no\.?\s?1|number one)\b/i },
  { name: 'accreditation', re: /\b(NABL|CAP|JCI|NABH)\b/ },
  { name: 'AI wording', re: /\b(AI|A\.I\.|artificial intelligence|machine learning|chatbot)\b/i },
  { name: 'patient-like data', re: /\b(patient name\s*:|bill no|age\s*\/\s*sex|reg(istration)?\.?\s*no\.?\s*:\s*\d{5,}|sample id|collected on)\b/i },
  { name: 'report misspelling', re: /\b(referance|immunoturbometry)\b/i },
  { name: 'turnaround claim', re: /\b(same[- ]day|within \d+ (hours?|hrs?|minutes?)|24\s?x\s?7|24\/7)\b/i },
  { name: 'invented social proof', re: /\b(\d[\d,]*\+?\s+(happy |satisfied )?(patients|customers|reviews)|★|stars? rating)\b/i },
];

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
  });
}

/** Visible text plus attribute values a reader or crawler sees (alt, title, aria-label, content, placeholder). */
function readable(html) {
  const noScripts = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ');
  const attrs = [...noScripts.matchAll(/\s(?:alt|title|aria-label|content|placeholder)="([^"]*)"/gi)].map((m) => m[1]);
  const text = noScripts.replace(/<[^>]+>/g, ' ');
  return `${text} ${attrs.join(' ')}`.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/\s+/g, ' ');
}

const pages = walk('out');
let failures = 0;
for (const file of pages) {
  const text = readable(readFileSync(file, 'utf8'));
  for (const rule of rules) {
    const m = text.match(rule.re);
    if (m) {
      failures++;
      const i = m.index ?? 0;
      console.log(`FAIL  ${path.relative('out', file)}  ${rule.name}: "…${text.slice(Math.max(0, i - 40), i + 40).trim()}…"`);
    }
  }
}
console.log(failures ? `\n${failures} content problem(s) in ${pages.length} pages` : `Content guard: ${pages.length} pages clean`);
process.exit(failures ? 1 : 0);
