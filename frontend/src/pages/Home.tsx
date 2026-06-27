import Hero from '../components/Hero';
import About from '../components/About';
import Tracks from '../components/Tracks';
import Schedule from '../components/Schedule';
import FAQ from '../components/sections/FAQ';
import Eligibility from '../components/Eligibility';
import Registration from '../components/Registration';
import Travel from '../components/sections/Travel';
import Sponsors from '../components/Sponsors';
import BayWave from '../components/common/BayWave';

const Home = () => {
  return (
    <main className="relative overflow-hidden w-full text-slate-900" style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #f8faf5 25%, #eff6eb 55%, #f8faf5 100%)' }}>
      {/* Global developer grid layout background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(12,60,52,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(12,60,52,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <Hero />

      <BayWave />

      <section id="about">
        <About />
      </section>

      <BayWave />

      <section id="tracks">
        <Tracks />
      </section>

      <BayWave />

      <Sponsors />

      <BayWave />

      <section id="schedule">
        <Schedule />
      </section>

      <BayWave />

      <section id="travel">
        <Travel />
      </section>

      <BayWave />

      <section id="eligibility">
        <Eligibility />
      </section>

      <BayWave />

      <section id="faqs">
        <FAQ />
      </section>

      <BayWave />

      <section id="register">
        <Registration />
      </section>
    </main>
  );
};

export default Home;