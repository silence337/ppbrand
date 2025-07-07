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
  const sections = [Section1, Section2, Section3, Section4];

  const smotherPaused = () => {
    smootherRef.current?.paused(false);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    smootherRef.current = ScrollSmoother.create({
      speed: 1,
      effects: true,
      smooth: 3,
      smoothTouch: 0.1,
    });

    smootherRef.current?.paused(true);

    /**
     * 언마운트의 경우 gsap clean up
     */
    // return () => {
    //   if (smootherRef.current) {
    //     smootherRef.current.kill();
    //     smootherRef.current = null;
    //   }
    //   ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    // };
  }, []);

  return (
    <>
      <Loader
        onLoaded={() => {
          smotherPaused();
          setLoadingComplete(true);
        }}
      />

      <div id='smooth-wrapper'>
        <div id='smooth-content'>
          <div className='container'>
            {sections.map((Section, index) => (
              <Section key={index} isLoading={loadingComplete} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
