import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FestivalMap from '@/components/FestivalMap';
import Schedule from '@/components/Schedule';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FestivalMap />
        <Schedule />
      </main>
      <Footer />
    </>
  );
}
