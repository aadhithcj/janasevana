import { cardioPackage } from '../../config/packages';
import { offerScript } from './offer';
import type { Locale } from './paths';

/**
 * Inline script for <head>. Runs before first paint:
 * 1. Sends a returning visitor to the language they chose last time, before
 *    the wrong language can paint. The toggle links store the choice.
 * 2. Sets the offer state on <html> from today's date in Asia/Kolkata.
 * 3. Marks motion as allowed, then reveals below-the-fold blocks once.
 * Everything is optional: without JS the page renders complete.
 */
export function headScript(locale: Locale): string {
  const lang = `(function(){var L='${locale}';try{var p=localStorage.getItem('jsl-lang');if(p&&p!==L&&(p==='en'||p==='ml')){var s=location.pathname,t=L==='en'?'/ml'+s:(s.replace(/^\\/ml(\\/|$)/,'/'));location.replace(t+location.search+location.hash);return}}catch(e){}document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('[data-set-lang]');if(a){try{localStorage.setItem('jsl-lang',a.getAttribute('data-set-lang'))}catch(x){}}},true)})();`;

  const motion = `(function(){var d=document.documentElement;if(!window.matchMedia||matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;d.classList.add('motion');document.addEventListener('DOMContentLoaded',function(){var h=innerHeight,els=[].slice.call(document.querySelectorAll('[data-reveal]'));var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.setAttribute('data-reveal','in');io.unobserve(x.target)}})},{rootMargin:'0px 0px -8% 0px'});els.forEach(function(el){if(el.getBoundingClientRect().top>h*0.92){el.setAttribute('data-reveal','pending');io.observe(el)}});setTimeout(function(){els.forEach(function(el){if(el.getAttribute('data-reveal')==='pending'){el.setAttribute('data-reveal','in')}})},6000)})})();`;

  return lang + offerScript(cardioPackage.window!) + motion;
}
