import type { CSSProperties, ElementType, ReactNode, MouseEvent } from 'react';

export type PillNavItem = { label: string; href?: string; icon?: ReactNode; ariaLabel?: string };

export type PillNavProps = {
  items?: PillNavItem[];
  logo?: string | ReactNode;
  logoAlt?: string;
  logoHref?: string;
  activeHref?: string;
  defaultActiveIndex?: number;
  onItemClick?: (item: PillNavItem, index: number, event: MouseEvent) => void;
  linkComponent?: ElementType;
  theme?: 'dark' | 'light';
  layout?: 'split' | 'joined';
  itemStyle?: 'pill' | 'plain';
  hoverEffect?: 'fill' | 'glide' | 'none';
  indicator?: 'dot' | 'pill' | 'none';
  surface?: 'glass' | 'solid' | 'none';
  size?: 'sm' | 'md' | 'lg';
  highlightColor?: string;
  highlightTextColor?: string;
  barColor?: string;
  textColor?: string;
  bounce?: number;
  stretch?: number;
  collapse?: 'auto' | 'always' | 'never';
  onMenuToggle?: (open: boolean) => void;
  intro?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties & Record<`--${string}`, string>;
};

declare const PillNav: (props: PillNavProps) => JSX.Element;
export default PillNav;
