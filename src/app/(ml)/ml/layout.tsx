import { RootDocument } from '@/components/shell/RootDocument';

export default function MalayalamLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="ml">{children}</RootDocument>;
}
