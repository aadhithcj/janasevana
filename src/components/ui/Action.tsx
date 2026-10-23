import Link from 'next/link';
import { Icon, type IconName } from './Icon';
import s from './Action.module.css';

type Variant = 'primary' | 'field' | 'whatsapp' | 'outline' | 'outlineField' | 'petrol';

type Common = {
  variant?: Variant;
  size?: 'md' | 'lg';
  icon?: IconName;
  block?: boolean;
  className?: string;
  children: React.ReactNode;
};

const variantClass: Record<Variant, string | undefined> = {
  primary: undefined,
  field: s.field,
  whatsapp: s.whatsapp,
  outline: s.outline,
  outlineField: s.outlineField,
  petrol: s.petrol,
};

export function actionClass({ variant = 'primary', size = 'md', block, className }: Omit<Common, 'children' | 'icon'>) {
  return [s.action, variantClass[variant], size === 'lg' && s.lg, block && s.block, className].filter(Boolean).join(' ');
}

/** A link styled as an action. External and tel:/mailto: links use a plain <a>. */
export function ActionLink({
  href,
  external,
  ...rest
}: Common & { href: string; external?: boolean } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'>) {
  const { variant, size, icon, block, className, children, ...anchor } = rest;
  const cls = actionClass({ variant, size, block, className });
  const content = (
    <>
      {icon && <Icon name={icon} />}
      <span>{children}</span>
    </>
  );
  const plain = external || /^(tel:|mailto:|https?:)/.test(href);
  if (plain) {
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener' } : {})} {...anchor}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...anchor}>
      {content}
    </Link>
  );
}
