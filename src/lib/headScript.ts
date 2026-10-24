import { cardioPackage } from '../../config/packages';
import { offerScript } from './offer';
import type { Locale } from './paths';

/**
 * Inline script for <head>. Runs before first paint:
 * 1. Sends a returning visitor to the language they chose last time, before
 *    the wrong language can paint. The toggle links store the choice.
 * 2. Sets the offer state on <html> from today's date in Asia/Kolkata.
 * 3. Marks motion as allowed (html.motion); the reveals themselves are CSS view timelines,
 *    so nothing here touches the markup React will hydrate.
 * 4. Marks the page as scrolled, for the header's lift.
 * Everything is optional: without JS the page renders complete.
 */
export function headScript(locale: Locale): string {
  const lang = `(function(){var L='${locale}';try{var p=localStorage.getItem('jsl-lang');if(p&&p!==L&&(p==='en'||p==='ml')){var s=location.pathname,t=L==='en'?'/ml'+s:(s.replace(/^\\/ml(\\/|$)/,'/'));location.replace(t+location.search+location.hash);return}}catch(e){}document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('[data-set-lang]');if(a){try{localStorage.setItem('jsl-lang',a.getAttribute('data-set-lang'))}catch(x){}}},true)})();`;

  const motion = `(function(){if(window.matchMedia&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')})();`;

  const js = `document.documentElement.classList.add('js');`;
  // 4. html.scrolled once the page leaves the top, so the floating header can lift.
  const scrolled = `(function(){var d=document.documentElement,f=0;function u(){f=0;d.classList.toggle('scrolled',scrollY>8)}addEventListener('scroll',function(){if(!f)f=requestAnimationFrame(u)},{passive:true});u()})();`;
  return js + lang + offerScript(cardioPackage.window!) + motion + scrolled;
}
