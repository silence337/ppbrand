/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Variants } from 'framer-motion';
import gsap from 'gsap';
import sbi1 from '../assets/images/sbi_img1.jpg';
import sbi2 from '../assets/images/sbi_img2.jpg';
import sbi3 from '../assets/images/sbi_img3.jpg';
import sbi4 from '../assets/images/sbi_img4.jpg';
import sbi5 from '../assets/images/sbi_img5.jpg';
import tlm3Box from '../assets/images/tlm3_box.jpg';
import TextAnimationUp from '../components/TextAnimationUp';

interface SectionProps {
  isLoading: boolean;
}

const Section2 = ({ isLoading }: SectionProps) => {
  const hasMountedOnce = useRef(false);
  const motion1 = useRef<HTMLDivElement>(null);
  const motion1PinText = useRef<HTMLDivElement>(null);
  const motion2 = useRef<HTMLDivElement>(null);
  const motion3 = useRef<HTMLDivElement>(null);
  const sbiImg = useRef<HTMLUListElement>(null);
  const sbiImages = [sbi1, sbi2, sbi3, sbi4, sbi5];
  //const [active, setActive] = useState(false);

  //TextAnimationUp variants settings
  const pinTextVariant: Variants = {
    initial: {
      y: 250,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 1 },
    },
    animate: (i: number) => ({
      y: 0,
      transition: {
        ease: [0.455, 0.03, 0.515, 0.955],
        duration: 1,
        delay: i * 0.025,
      },
    }),
  };
  //TextAnimationUp variants settings
  const pullupVariant: Variants = {
    initial: {
      y: 250,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
    },
    animate: (i: number) => ({
      y: 0,
      transition: {
        ease: [0.455, 0.03, 0.515, 0.955],
        duration: 0.75,
        delay: i * 0.025,
      },
    }),
  };
  /**
   * Elevate Your Everyday
   */
  const scrollMotion1 = useCallback((ctx: gsap.Context) => {
    ctx.add(() => {
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
        }
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
            //console.log(progress, direction, isActive);

            if (progress < 0.12) {
              gsap.to(motion1.current, {
                backgroundColor: '#fff',
                color: 'rgb(255 192 5)',
                duration: 1,
              });
              gsap.to('.pin-text', {
                color: 'rgb(255, 192, 5)',
                duration: 1,
              });
              return;
            }

            if (progress > 0.12) {
              gsap.to(motion1.current, {
                backgroundColor: '#f56e0b',
                color: 'rgb(255, 192, 5)',
                duration: 1,
              });
              gsap.to(motion1PinText.current, {
                color: '#fff',
                duration: 1,
              });
            }
          },
        },
      });
    });

    const pinText = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: motion1PinText.current,
        start: 'top 10%',
        endTrigger: motion2.current,
        end: 'top top',
        scrub: 0,
        //markers: true,
        pin: true,
        pinSpacing: false,
      },
    });
    pinText
      .to(motion1PinText.current, {
        y: 0,
        opacity: 1,
        duration: 0.2,
      })
      .to(
        motion1PinText.current,
        {
          scale: 10,
          yPercent: 300,
          xPercent: 70,
          duration: 0.8,
        }
        // '0.2'
      );
  }, []);

  const clientW = document.documentElement.clientWidth + 271;
  const clientH = document.documentElement.clientHeight + 271;

  /**
   * Strong brand identity
   */
  const scrollMotion2 = useCallback(
    (ctx: gsap.Context) => {
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
    },
    [clientW, clientH]
  );

  /**
   * Urban Edge
   */
  const scrollMotion3 = useCallback(
    (ctx: gsap.Context) => {
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
    },
    [clientW, clientH]
  );

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
  }, [isLoading, scrollMotion1, scrollMotion2, scrollMotion3]);

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
        <div className='pin-text' ref={motion1PinText}>
          <TextAnimationUp
            variants={pinTextVariant}
            text={'We Believe Fashion'}
          />
          <br />
          <TextAnimationUp variants={pinTextVariant} text={'Is More Than'} />
          <br />
          <TextAnimationUp variants={pinTextVariant} text={"Style—it's"} />
          <br />
          <TextAnimationUp variants={pinTextVariant} text={'A Statement.'} />

          {/* <div className='wm'>
            <picture></picture>
            <div className='back-obj'></div>
          </div> */}
        </div>
      </div>

      <div className='tl-motion2' ref={motion2}>
        <h3>
          <TextAnimationUp variants={pullupVariant} text={'Strong brand'} />
          <TextAnimationUp variants={pullupVariant} text={'identity'} />
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
          <h3 className='text'>
            <TextAnimationUp
              variants={pullupVariant}
              text={'Elevate Your Everyday'}
            />
          </h3>
          <h3 className='text'>
            <TextAnimationUp
              variants={pullupVariant}
              text={'Designed to Last'}
            />
          </h3>
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
