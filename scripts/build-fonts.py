"""Instance and subset the site's variable fonts into public/fonts.

Sources (SIL Open Font License) live in fonts-src/. Run:
    python scripts/build-fonts.py
Prints @font-face metric overrides for the fallback faces.
"""
import io
import os
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools import subset

SRC = 'fonts-src'
OUT = 'public/fonts'
os.makedirs(OUT, exist_ok=True)

LATIN = 'U+0020-007E,U+00A0-00FF,U+2010-2027,U+2030-203A,U+20AC,U+2122,U+2212'
MALAYALAM = 'U+0D00-0D7F,U+200C-200D,U+25CC,U+0964-0965'
RUPEE = 'U+20B9'


def build(src, out, axes, unicodes):
    # Subset first, then limit the variation axes to the ranges the site uses.
    font = TTFont(os.path.join(SRC, src), lazy=False)
    opts = subset.Options()
    opts.layout_features = ['*']
    opts.name_IDs = ['*']
    opts.notdef_outline = True
    opts.hinting = False
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=parse(unicodes))
    sub.subset(font)
    buf = io.BytesIO()
    font.flavor = None
    font.save(buf)
    buf.seek(0)
    font = instancer.instantiateVariableFont(TTFont(buf, lazy=False), axes)
    font.flavor = 'woff2'
    path = os.path.join(OUT, out)
    font.save(path)
    print(f'{out}: {os.path.getsize(path) // 1024} KB')


def parse(ranges):
    cps = []
    for part in ranges.split(','):
        part = part.strip().replace('U+', '')
        if '-' in part:
            a, b = part.split('-')
            cps.extend(range(int(a, 16), int(b, 16) + 1))
        else:
            cps.append(int(part, 16))
    return cps


build('AnekLatin-latin-var.woff2', 'anek-latin.woff2', {'wght': (500, 780), 'wdth': (75, 100)}, LATIN)
build('AtkinsonHyperlegibleNext-latin-var.woff2', 'atkinson.woff2', {'wght': (400, 700)}, LATIN)
build('AnekMalayalam-malayalam-var.woff2', 'anek-malayalam.woff2', {'wght': (500, 760), 'wdth': (80, 100)}, MALAYALAM)
build('NotoSansMalayalam-malayalam-var.woff2', 'noto-sans-malayalam.woff2', {'wght': (400, 700)}, MALAYALAM)
# The Latin faces have no rupee sign; borrow it from the matching Malayalam designs.
build('AnekMalayalam-malayalam-var.woff2', 'anek-rupee.woff2', {'wght': (500, 780), 'wdth': (75, 100)}, RUPEE)
build('NotoSansMalayalam-malayalam-var.woff2', 'noto-rupee.woff2', {'wght': (400, 700)}, RUPEE)


def avg_width(font_path, text):
    f = TTFont(font_path)
    cmap = f.getBestCmap()
    hmtx = f['hmtx']
    upm = f['head'].unitsPerEm
    widths = [hmtx[cmap[ord(c)]][0] / upm for c in text if ord(c) in cmap]
    return sum(widths) / len(widths), f


SAMPLE = 'The lab at Kaichoondy Junction comes to your home and takes the sample'
arial = r'C:\Windows\Fonts\arial.ttf'
if os.path.exists(arial):
    for name, src in [('Atkinson', 'AtkinsonHyperlegibleNext-latin-var.woff2'), ('Anek Latin', 'AnekLatin-latin-var.woff2')]:
        w, f = avg_width(os.path.join(SRC, src), SAMPLE)
        wa, _ = avg_width(arial, SAMPLE)
        upm = f['head'].unitsPerEm
        adj = w / wa
        hh = f['hhea']
        print(
            f'{name} fallback: size-adjust: {adj * 100:.1f}%; '
            f'ascent-override: {hh.ascent / upm / adj * 100:.1f}%; '
            f'descent-override: {abs(hh.descent) / upm / adj * 100:.1f}%; line-gap-override: 0%;'
        )
