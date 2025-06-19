import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import bg from '../assets/images/section3_bg.webp';
import sbi1 from '../assets/images/sbi_img1.jpg';
import sbi2 from '../assets/images/sbi_img2.jpg';
import sbi3 from '../assets/images/sbi_img3.jpg';
import sbi4 from '../assets/images/sbi_img4.jpg';
import sbi5 from '../assets/images/sbi_img5.jpg';
import tlm3Box from '../assets/images/tlm3_box.jpg';

interface SectionProps {
  isLoading: boolean;
}

const Section2 = ({ isLoading }: SectionProps) => {
  const hasAnimated = useRef(false);
  const motion1 = useRef<HTMLDivElement>(null);
  const motion2 = useRef<HTMLDivElement>(null);
  const motion3 = useRef<HTMLDivElement>(null);
  const sbiImg = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!isLoading) return;

    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const ctxTimeline1 = gsap.context(() => {
      const textElements = gsap.utils.toArray(
        '.text',
        motion1.current
      ) as HTMLElement[];
      textElements.forEach((text) => {
        gsap.to(text, {
          backgroundSize: '100%',
          duration: 3, //ease: 'none',
          scrollTrigger: {
            trigger: text,
            start: 'center 70%',
            scrub: 1,
          },
        });
      });

      const prevSection = gsap.timeline({
        scrollTrigger: {
          trigger: motion1.current,
          start: 'top 60%',
          end: 'bottom 180%',
          scrub: 0,
          //markers: true,
          invalidateOnRefresh: true,
        },
      });
      prevSection.fromTo(
        motion1.current,
        {
          clipPath: 'polygon(0 0, 0% 0, 20% 100%, 0% 100%)',
        },
        {
          clipPath: 'polygon(0 0, 56% 0, 160% 150%, 0% 100%)',
        },
        '<'
      );

      let tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: motion1.current,
          endTrigger: motion2.current,
          start: 'top 40%',
          end: 'bottom 100%',
          scrub: 1,
          //markers: true,
          invalidateOnRefresh: true,
          onUpdate: ({ progress, direction, isActive }) => {
            console.log(progress, direction, isActive);

            if (progress < 0.21) {
              gsap.to(motion1.current, {
                backgroundColor: '#fff',
                duration: 1,
              });
              return;
            }

            if (progress > 0.21) {
              gsap.to(motion1.current, {
                backgroundColor: '#000',
                duration: 1,
              });
            }
          },
        },
      });
      tl1
        .fromTo(
          '.back',
          { x: 0, y: -400, ease: 'none' },
          { x: 200, y: 200, autoAlpha: 1 }
        )
        .to('.back img', { x: -1000, ease: 'none' }, '<');
    }, motion1);

    let clientW = document.documentElement.clientWidth + 271;
    let clientH = document.documentElement.clientHeight + 271;

    const ctxTimeline2 = gsap.context(() => {
      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: motion2.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          //markers: true,
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        },
      });

      tl2
        .to('h3', { ease: 'none', scale: 0.2 })
        .fromTo(
          '.n1',
          { ease: 'none', x: `${-clientW}px`, y: `${-clientH}px` },
          { x: 0, y: 0 },
          '<-=0.1'
        )
        .fromTo('.n2', { ease: 'none', x: `${-clientW}px` }, { x: -200 }, '<')
        .fromTo(
          '.n3',
          { ease: 'none', x: `${-clientW}px`, y: `${clientH}px` },
          { x: 0, y: 0 },
          '<'
        )
        .fromTo(
          '.n4',
          { ease: 'none', x: `${clientW}px`, y: `${-clientH}px` },
          { x: 0, y: 0 },
          '<'
        )
        .fromTo(
          '.n5',
          { ease: 'none', x: `${clientW}px`, y: `${clientH}px` },
          { x: 0, y: 0 },
          '<'
        );
    }, motion2);

    const ctxTimeline3 = gsap.context(() => {
      let tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: motion3.current,
          start: 'top 60%',
          end: 'bottom bottom',
          scrub: 0,
          //markers: true,
          invalidateOnRefresh: true,
        },
      });
      tl3.to(sbiImg.current, {
        x: `${-(clientW / 1.2)}px`,
        y: `${clientH}px`,
        ease: 'none',
      });
      tl3.fromTo('.bg', { scale: 0.3, ease: 'none' }, { scale: 1 }, '<');
      tl3
        .to('.text', { x: 500, ease: 'none' }, '<')
        .to('.sub-text', { y: 500, opacity: 1, ease: 'none' }, '<+=0.3')
        .to('.bg img', { y: 300, ease: 'none' }, '<-=0.1');
    }, motion3);
    /**
     * 언마운트의 경우 gsap clean up
     */
    // return () => {
    //   ctxTimeline1.revert();
    //   ctxTimeline2.revert();
    //   ctxTimeline3.revert();
    // };
  }, [isLoading]);

  return (
    <section className='section2 group'>
      <div className='tl-motion1' ref={motion1}>
        <div className='inner'>
          <h3 className='text'>Elevate Your Everyday</h3>
          <h3 className='text'>Designed to Last</h3>
          <p className='text'>
            We use ethically sourced materials and sustainable
          </p>
          <p className='text'>practices to create fashion with a conscience.</p>

          <div className='back'>
            <span>
              <img src={bg} />
            </span>
          </div>
          <div className='back-text'>
            <span>
              AT [BRAND NAME], WE BELIEVE FASHION IS MORE THAN STYLE—IT'S A
              STATEMENT. OUR PIECES ARE CRAFTED WITH INTENTION, BLENDING
              INNOVATION WITH TRADITION.
            </span>
          </div>
        </div>
      </div>

      <div className='tl-motion2' ref={motion2}>
        <h3>
          Strong brand
          <br />
          identity
        </h3>
        <ul className='sbi-img' ref={sbiImg}>
          <li className='n1'>
            <img src={sbi1} alt='' />
          </li>
          <li className='n2'>
            <img src={sbi2} alt='' />
          </li>
          <li className='n3'>
            <img src={sbi3} alt='' />
          </li>
          <li className='n4'>
            <img src={sbi4} alt='' />
          </li>
          <li className='n5'>
            <img src={sbi5} alt='' />
          </li>
        </ul>
      </div>

      <div className='tl-motion3' ref={motion3}>
        <div className='inner'>
          <div className='text'>
            <h3>Urban Edge</h3>
            <p>Where City Meets Style</p>
          </div>
          <div className='sub-text'>
            A bold fusion of streetwear and contemporary design, capturing the
            rhythm of urban life with every stitch.
          </div>
          <div className='bg'>
            <div className='box'>
              <img src={tlm3Box} alt='' />
            </div>
          </div>
        </div>
      </div>
      <div className='back-inner'>
        <div className='background'>
          <h3 className='text'>Elevate Your Everyday</h3>
          <h3 className='text'>Designed to Last</h3>
          <p className='text'>
            We use ethically sourced materials and sustainable
          </p>
          <p className='text'>practices to create fashion with a conscience.</p>
        </div>
      </div>
    </section>
  );
};

export default Section2;
