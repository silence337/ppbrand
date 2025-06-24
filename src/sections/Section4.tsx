import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface SectionProps {
  isLoading: boolean;
}

const Section4 = ({ isLoading }: SectionProps) => {
  const hasMountedOnce = useRef(false);
  const sectionRef4 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading || hasMountedOnce.current) return;
    hasMountedOnce.current = true;

    const ctx = gsap.context(() => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef4.current,
          start: 'top 60%',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
          //markers: true,
        },
      });
      tl.fromTo('.text span', { y: -100 }, { y: 0, ease: 'none' });
    }, sectionRef4);
    /**
     * 언마운트의 경우 gsap clean up
     */
    // return () => ctx.revert();
  }, [isLoading]);

  return (
    <section className='section4 group' ref={sectionRef4}>
      <div className='text'>
        <p>
          <span>TIMELESS FASHION.</span>
        </p>
        <p>
          <span>EFFORTLESS CONFIDENCE.</span>
        </p>
        <em>
          We use ethically sourced materials and sustainable practices to create
          fashion with a conscience.
        </em>
      </div>
    </section>
  );
};

export default Section4;
