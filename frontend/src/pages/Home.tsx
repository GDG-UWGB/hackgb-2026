import Hero from '../components/Hero';
import About from '../components/About';
import Tracks from '../components/Tracks';
import Schedule from '../components/Schedule';
import FAQ from '../components/FAQ';
import Eligibility from '../components/Eligibility';
import Registration from '../components/Registration';

import Sponsors from '../components/Sponsors';

const Home = () => {
  return (
    <main className="overflow-hidden">
      <Hero />

      <section id="about">
        <About />
      </section>

      <section id="tracks">
        <Tracks />
      </section>

      <Sponsors />

      <section id="judges" className="py-24 px-4 bg-google-off-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-google font-bold mb-8 text-google-black">
            Judges & <span className="text-google-green">Mentors</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-40 grayscale">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-google-off-white h-64 flex items-center justify-center">
                <div className="text-google-black/20 text-xl font-google font-bold italic">Expert Reveal Soon</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="schedule">
        <Schedule />
      </section>

      <section id="eligibility">
        <Eligibility />
      </section>

      <section id="faqs">
        <FAQ />
      </section>

      <section id="register">
        <Registration />
      </section>
    </main>
  );
};

export default Home;