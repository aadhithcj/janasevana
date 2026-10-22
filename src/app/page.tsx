import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/home/Hero';
import { Departments } from '@/components/home/Departments';
import { Process } from '@/components/home/Process';
import { Team } from '@/components/home/Team';
import { LocationPanel } from '@/components/home/LocationPanel';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Departments />
        <Process />
        <Team />
        <LocationPanel />
      </main>
    </>
  );
}
