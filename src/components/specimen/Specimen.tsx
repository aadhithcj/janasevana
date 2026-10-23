import s from './Specimen.module.css';

const ramps: { name: string; steps: [string, string][] }[] = [
  {
    name: 'Teal (logo #058E92)',
    steps: [
      ['50', '#eef7f6'], ['100', '#dcefee'], ['200', '#a9dedc'], ['300', '#80d1d4'], ['400', '#55b2b6'],
      ['500', '#058e92'], ['600', '#017b7f'], ['700', '#056a6d'], ['800', '#03494c'], ['900', '#013234'],
    ],
  },
  {
    name: 'Charcoal (logo #434448)',
    steps: [
      ['50', '#f6f7f9'], ['100', '#ecedef'], ['200', '#d9dadf'], ['300', '#bfc1c5'], ['400', '#a0a1a6'],
      ['500', '#7f8084'], ['600', '#5a5b60'], ['700', '#434448'], ['800', '#2a2b2f'], ['900', '#1e1f22'],
    ],
  },
  {
    name: 'Petrol (packages only, estimate #0A6C82)',
    steps: [
      ['50', '#eef8fb'], ['100', '#ddf1f7'], ['200', '#b2e4f4'], ['300', '#94cbdc'], ['500', '#438ba0'],
      ['600', '#24778c'], ['700', '#0a6c82'], ['800', '#004858'], ['900', '#02313c'],
    ],
  },
  {
    name: 'Single roles',
    steps: [
      ['paper', '#f7faf9'], ['sunk', '#eef5f4'], ['amber', '#fff4dc'], ['amber ink', '#7a4a00'],
      ['WhatsApp', '#25d366'], ['WA ink', '#0e2a1a'], ['error', '#b3261e'],
    ],
  },
];

function lum(hex: string) {
  const c = [1, 3, 5].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

function ratio(a: string, b: string) {
  const x = lum(a);
  const y = lum(b);
  return ((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)).toFixed(1);
}

/** Development reference for tokens and the type pairing in both scripts. Not linked from the site. */
export function Specimen() {
  return (
    <div className={`wrap ${s.page}`}>
      <h1 lang="en">Type and colour specimen</h1>

      <section className={s.block}>
        <h2 lang="en">Colour</h2>
        {ramps.map((r) => (
          <div key={r.name} className={s.ramp}>
            <h3 lang="en" className={s.rampName}>{r.name}</h3>
            <ul role="list" className={s.swatches}>
              {r.steps.map(([k, hex]) => (
                <li key={k} className={s.swatch}>
                  <span className={s.chip} style={{ background: hex }} />
                  <span lang="en" className={s.label}>
                    {k} <code>{hex}</code>
                    <br />
                    on white {ratio(hex, '#ffffff')} · on ink {ratio(hex, '#1e1f22')}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className={s.block}>
        <h2 lang="en">Display: Anek (Latin and Malayalam)</h2>
        <p lang="en" className={s.d5}>The lab at Kaichoondy Junction</p>
        <p className={s.d5ml}>കൈചൂണ്ടി ജംഗ്ഷനിലെ ലാബ്</p>
        <p lang="en" className={s.d4}>Royal Package, 16 tests, ₹2,000</p>
        <p className={s.d4ml}>റോയൽ പാക്കേജ്, 16 ടെസ്റ്റുകൾ, ₹2,000</p>
        <p lang="en" className={s.d3}>How home collection works</p>
        <p className={s.d3ml}>ഹോം കളക്ഷൻ എങ്ങനെ</p>
      </section>

      <section className={s.block}>
        <h2 lang="en">Reading: Atkinson Hyperlegible Next / Noto Sans Malayalam</h2>
        <p lang="en" className={s.body}>
          A blood sample collector comes to the home and takes the sample. Home collection is free. Il1 0O 5S 8B: every
          character is drawn to be told apart, for readers with low vision.
        </p>
        <p className={s.bodyMl}>
          ലാബിലെ ബ്ലഡ് സാമ്പിൾ കളക്ടർ വീട്ടിൽ വന്ന് സാമ്പിൾ എടുക്കും. ഇതിന് ചാർജ് ഇല്ല. ഫാസ്റ്റിംഗ് ബ്ലഡ് ഷുഗർ (FBS),
          ഫാസ്റ്റിംഗ് ലിപിഡ് പ്രൊഫൈൽ എന്നിവ ഫാസ്റ്റിംഗ് ടെസ്റ്റുകളാണ്.
        </p>
        <p lang="en" className={`${s.body} num`}>0477 2288 413 · +91 91884 90413 · ₹1,299 · 23 October 2026</p>
      </section>
    </div>
  );
}
