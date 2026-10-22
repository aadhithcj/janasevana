import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/home/Hero';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
      </main>
    </>
  );
}
