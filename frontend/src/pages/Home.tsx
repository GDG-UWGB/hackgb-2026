import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import Tracks from '../components/Tracks';
import Schedule from '../components/Schedule';
import FAQ from '../components/sections/FAQ';
import Eligibility from '../components/Eligibility';
import Registration from '../components/Registration';
import Travel from '../components/sections/Travel';
import Sponsors from '../components/Sponsors';
import Prizes from '../components/Prizes';
import Speakers from '../components/Speakers';
import Judges from '../components/Judges';
import CityDivider from '../components/common/CityDivider';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // Slight delay ensures components have rendered
    }
  }, [location]);

  return (
    <main className="relative overflow-hidden w-full noise-overlay bg-white">
      <Hero />

      <CityDivider variant="stadium" />

      <section id="about">
        <About />
      </section>

      <CityDivider variant="bridge" />

      <section id="tracks">
        <Tracks />
      </section>

      <CityDivider variant="waves" />

      <Sponsors />

      <CityDivider variant="trees" />

      <section id="prizes">
        <Prizes />
      </section>

      <CityDivider variant="skyline" />

      <section id="schedule">
        <Schedule />
      </section>

      <CityDivider variant="waves" />

      <section id="speakers">
        <Speakers />
      </section>

      <CityDivider variant="bridge" />

      <section id="judges">
        <Judges />
      </section>

      <CityDivider variant="trees" />

      <section id="travel">
        <Travel />
      </section>

      <CityDivider variant="bridge" flip />

      <section id="eligibility">
        <Eligibility />
      </section>

      <CityDivider variant="waves" />

      <section id="faqs">
        <FAQ />
      </section>

      <CityDivider variant="skyline" flip />

      <section id="register">
        <Registration />
      </section>

      <CityDivider variant="waves" />
    </main>
  );
};

export default Home;