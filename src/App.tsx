import React, { useRef, useEffect, useState } from 'react';
import './assets/scss/index.scss';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollSmoother from 'gsap/ScrollSmoother';
import Loader from './components/Loader';
import Section1 from './sections/Section1';
import Section2 from './sections/Section2';
import Section3 from './sections/Section3';
import Section4 from './sections/Section4';

const App = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    smootherRef.current = ScrollSmoother.create({
      speed: 1,
      effects: true,
      smooth: 2,
      smoothTouch: 0.1,
    });

    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {!loadingComplete && <Loader onLoaded={() => setLoadingComplete(true)} />}
      <div id='smooth-wrapper'>
        <div id='smooth-content'>
          <div className='container'>
            <Section1 isLoading={loadingComplete} />
            <Section2 isLoading={loadingComplete} />
            <Section3 isLoading={loadingComplete} />
            <Section4 isLoading={loadingComplete} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
