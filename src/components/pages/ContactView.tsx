import { getDict } from '@/i18n';
import type { Locale } from '@/lib/paths';
import { PageHead } from '@/components/page/PageHead';
import { HomeContact } from '@/components/home/HomeContact';
import { PrintButton } from '@/components/contact/PrintButton';
import { LogoFull } from '@/components/shell/Logo';
import s from './ContactView.module.css';

/** The home page's "Find the lab" panel, with the map kept on phones and a way to print the details. */
export function ContactView({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  return (
    <>
      <PageHead title={d.contact.h1} lede={d.contact.lede} />
      {/* Shown only on paper, so a printout carries the lab's mark. */}
      <div className="wrap">
        <LogoFull className={s.printLogo} loading="eager" />
      </div>
      <HomeContact locale={locale} onPage>
        <div className={s.print} data-print="hide">
          <PrintButton label={d.contact.print} />
        </div>
      </HomeContact>
    </>
  );
}
