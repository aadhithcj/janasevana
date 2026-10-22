import {
  Newsreader,
  Plus_Jakarta_Sans,
  Noto_Serif_Malayalam,
  Noto_Sans_Malayalam,
} from 'next/font/google';

export const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif-google',
  display: 'swap',
});

export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  style: ['normal'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans-google',
  display: 'swap',
});

export const notoSerifMalayalam = Noto_Serif_Malayalam({
  subsets: ['malayalam'],
  weight: ['400', '600', '700'],
  variable: '--font-ml-serif-google',
  display: 'swap',
});

export const notoSansMalayalam = Noto_Sans_Malayalam({
  subsets: ['malayalam'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ml-sans-google',
  display: 'swap',
});

export const fontClassNames = `${newsreader.variable} ${plusJakarta.variable} ${notoSerifMalayalam.variable} ${notoSansMalayalam.variable}`;
