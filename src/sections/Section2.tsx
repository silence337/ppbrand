import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
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
  const hasMountedOnce = useRef(false);
  const motion1 = useRef<HTMLDivElement>(null);
  const motion2 = useRef<HTMLDivElement>(null);
  const motion3 = useRef<HTMLDivElement>(null);
  const sbiImg = useRef<HTMLUListElement>(null);
  const sbiImages = [sbi1, sbi2, sbi3, sbi4, sbi5];

  /**
   * Elevate Your Everyday
   */
  const scrollMotion1 = (ctx: gsap.Context) => {
    ctx.add(() => {
      gsap.to('.inner', {
        yPercent: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: '.inner',
          start: 'center 50%',
          scrub: 0,
        },
      });
      gsap.to('.pin-text span', {
        yPercent: -150,
        duration: 1,
        stagger: 0.2,
        opacity: 1,
        scaleY: 1,
        scrollTrigger: {
          trigger: '.pin-text',
          endTrigger: motion1.current,
          start: 'top 60%',
          end: 'bottom bottom',
          scrub: 3,
          //markers: true,
        },
      });
      const tlWoman = gsap.timeline({
        scrollTrigger: {
          trigger: '.wm',
          start: 'top 50%',
          end: 'bottom bottom',
          scrub: 3,
          //markers: true,
        },
      });
      tlWoman
        .to('.wm picture', {
          x: 0,
          duration: 1,
        })
        .to(
          '.wm .back-obj',
          {
            x: 0,
            rotate: '48deg',
            scale: 1,
            duration: 1,
          },
          '<'
        );

      const tlPolygon = gsap.timeline({
        scrollTrigger: {
          trigger: motion1.current,
          start: 'top 40%',
          end: 'bottom bottom',
          scrub: 0,
          //markers: true,
          invalidateOnRefresh: true,
        },
      });
      tlPolygon.fromTo(
        motion1.current,
        {
          clipPath: 'polygon(0 0, 0% 0, 20% 100%, 0% 100%)',
        },
        {
          clipPath: 'polygon(0 0, 56% 0, 160% 150%, 0% 100%)',
        },
        '<'
      );

      const tlEveryDay = gsap.timeline({
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

            if (progress < 0.12) {
              gsap.to(motion1.current, {
                backgroundColor: '#fff',
                color: 'rgb(255 192 5)',
                duration: 1,
              });
              gsap.to('.pin-text', {
                color: '#f56e0b',
                duration: 1,
              });
              return;
            }

            if (progress > 0.12) {
              gsap.to(motion1.current, {
                backgroundColor: '#f56e0b',
                color: '#fff',
                duration: 1,
              });
              gsap.to('.pin-text', {
                color: '#fff',
                duration: 1,
              });
            }
          },
        },
      });
      tlEveryDay
        .fromTo(
          '.back',
          { x: 0, y: -400, ease: 'none' },
          { x: 200, y: 200, autoAlpha: 1 }
        )
        .to('.back img', { x: -1000, ease: 'none' }, '<');
    });
  };

  const clientW = document.documentElement.clientWidth + 271;
  const clientH = document.documentElement.clientHeight + 271;

  /**
   * Strong brand identity
   */
  const scrollMotion2 = (ctx: gsap.Context) => {
    ctx.add(() => {
      const tlStrongBrand = gsap.timeline({
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

      tlStrongBrand
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
    });
  };

  /**
   * Urban Edge
   */
  const scrollMotion3 = (ctx: gsap.Context) => {
    ctx.add(() => {
      const tlUrbanEdge = gsap.timeline({
        scrollTrigger: {
          trigger: motion3.current,
          start: 'top 60%',
          end: 'bottom bottom',
          scrub: 0,
          //markers: true,
          invalidateOnRefresh: true,
        },
      });
      tlUrbanEdge
        .to(sbiImg.current, {
          x: `${-(clientW / 1.2)}px`,
          y: `${clientH}px`,
          ease: 'none',
        })
        .fromTo('.bg', { scale: 0.3, ease: 'none' }, { scale: 1 }, '<')
        .to('.text', { x: 500, ease: 'none' }, '<')
        .to('.sub-text', { y: 500, opacity: 1, ease: 'none' }, '<+=0.3')
        .to('.bg img', { y: 300, ease: 'none' }, '<-=0.1');
    });
  };

  useEffect(() => {
    if (!isLoading || hasMountedOnce.current) return;
    hasMountedOnce.current = true;

    const ctx1 = gsap.context((ctx) => scrollMotion1(ctx), motion1);
    const ctx2 = gsap.context((ctx) => scrollMotion2(ctx), motion2);
    const ctx3 = gsap.context((ctx) => scrollMotion3(ctx), motion3);

    /**
     * 언마운트의 경우 gsap clean up
     */
    // return () => {
    //   ctx1.revert();
    //   ctx2.revert();
    //   ctx3.revert();
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
        </div>
        <div className='pin-text'>
          <span>we</span> <span>believe</span> <span>fashion</span>
          <br />
          <span>is more&nbsp;</span>
          <span>than</span>
          <br />
          <span>style—it's</span>
          <br />
          <span>a statement.</span>
          <div className='wm'>
            <picture></picture>
            <div className='back-obj'></div>
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
          {sbiImages.map((src, i) => (
            <li className={`n${i + 1}`} key={i}>
              <img src={src} alt='' />
            </li>
          ))}
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
