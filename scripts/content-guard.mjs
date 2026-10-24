// Fails the build check if the exported site says something it must not.
//   node scripts/content-guard.mjs        (after `npm run build`)
// Scans the visible text and attributes of every HTML page in out/.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const rules = [
  { name: 'unconfirmed placeholder', re: /TODO_CONFIRM/ },
  { name: 'claim word', re: /\b(best|leading|premier|trusted|accredited|accurate|accuracy|guaranteed?|world-class|no\.?\s?1|number one|phlebotomists?)\b/i },
  { name: 'parameter count', re: /\b\d+\+?\s*parameters\b/i },
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
const ALLOWED_PRICES = new Set(['₹1,299', '₹2,000']);
const hsCrp = [];
let failures = 0;
for (const file of pages) {
  const text = readable(readFileSync(file, 'utf8'));
  for (const m of text.matchAll(/₹\s?[\d,]+/g)) {
    const price = m[0].replace(/\s/g, '');
    if (!ALLOWED_PRICES.has(price)) {
      failures++;
      console.log(`FAIL  ${path.relative('out', file)}  price not in config: ${price}`);
    }
  }
  for (const m of text.matchAll(/hs-CRP/g)) {
    const i = m.index ?? 0;
    hsCrp.push(`${path.relative('out', file)}: …${text.slice(Math.max(0, i - 90), i + 50).trim()}…`);
  }
  for (const rule of rules) {
    const m = text.match(rule.re);
    if (m) {
      failures++;
      const i = m.index ?? 0;
      console.log(`FAIL  ${path.relative('out', file)}  ${rule.name}: "…${text.slice(Math.max(0, i - 40), i + 40).trim()}…"`);
    }
  }
}
if (process.argv.includes('--review')) {
  // Every hs-CRP mention, for a person to confirm it sits with the Cardiovascular Health Package.
  console.log(`\nhs-CRP mentions (${hsCrp.length}):`);
  hsCrp.forEach((h) => console.log('  ' + h));
}
console.log(failures ? `\n${failures} content problem(s) in ${pages.length} pages` : `Content guard: ${pages.length} pages clean`);
process.exit(failures ? 1 : 0);
