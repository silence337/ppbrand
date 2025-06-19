import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import TextAnimationUp from '../components/TextAnimationUp';

interface SectionProps {
  isLoading: boolean;
}

const Section3 = ({ isLoading }: SectionProps) => {
  const hasAnimated = useRef(false);
  const sectionRef3 = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const seq = useRef<{ frame: number }>({ frame: 0 });
  const topTextRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const frameCount = 96;
  const currentFrame = (index: number): string => {
    return `./images/${(index + 1).toString().padStart(2, '0')}-min.jpg`;
  };

  useEffect(() => {
    if (!isLoading) return;

    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const canvas = canvasRef.current;
    const section = sequenceRef.current;
    if (!canvas || !section) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = 490;
    canvas.height = 928;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.current.push(img);
    }

    const render = () => {
      const frame = Math.floor(seq.current.frame);
      const img = images.current[frame];

      if (!img || !img.complete) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    };

    images.current[0].onload = render;

    // const ctxText = gsap.context(() => {
    //   let topTextArea = gsap.timeline({
    //     defaults: { duration: 10 },
    //     scrollTrigger: {
    //       trigger: topTextRef.current,
    //       start: 'top 30%',
    //       end: 'bottom bottom',
    //       scrub: 1,
    //       //markers: true,
    //       invalidateOnRefresh: true,
    //     },
    //   });
    //   topTextArea.fromTo('h4 span', { y: 194 }, { y: 0, duration: 10 });
    //   topTextArea.fromTo('p span', { y: -194 }, { y: 0, duration: 10 });
    // }, topTextRef);

    let scrollSequence = gsap.timeline({
      onUpdate: render,
      scrollTrigger: {
        trigger: sequenceRef.current,
        endTrigger: sectionRef3.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
        //markers: true,
        toggleClass: 'animated',
      },
    });

    scrollSequence.to(
      seq.current,
      {
        frame: frameCount - 1,
        snap: 'frame',
        ease: 'none',
        duration: 1,
        invalidateOnRefresh: true,
      },
      0
    );

    const ctxGallery = gsap.context(() => {
      const liElements = gsap.utils.toArray(
        'li',
        galleryRef.current
      ) as HTMLElement[];
      liElements.forEach((list) => {
        const image = list.querySelector('img');
        gsap.to(image, {
          yPercent: -55,
          ease: 'none',
          scrollTrigger: {
            trigger: list,
            start: 'top 40%',
            scrub: 1,
            // markers: true,
          },
        });
        let dataX = list.dataset.x;
        gsap.to(list, {
          x: dataX,
          ease: 'none',
          scrollTrigger: {
            trigger: list.querySelector('span'),
            start: 'top 530px',
            end: 'bottom 60%',
            scrub: 0,
            invalidateOnRefresh: true,
            //markers: true,
          },
        });
      });
    }, galleryRef);

    /**
     * 언마운트의 경우 gsap clean up
     */
    // return () => {
    //   ctxText.revert();
    //   ctxGallery.revert();
    // };
  }, [isLoading]);

  return (
    <section className='section3 group' ref={sectionRef3}>
      <div className='top-text' ref={topTextRef}>
        <h4>
          <TextAnimationUp text={'Browse the new collection'} />
        </h4>
        <p className='pintext'>
          <TextAnimationUp text={'Timeless fashion. Effortless confidence.'} />
        </p>
      </div>

      <div className='sequence-wrap' ref={sequenceRef}>
        <div className='sequence'>
          <canvas ref={canvasRef}></canvas>
        </div>
        <div className='back'>
          <span></span>
        </div>
      </div>

      <div className='gallery-list' ref={galleryRef}>
        <ul>
          <li className='g1' data-x='-250'>
            <span>
              <img src='./images/gl_1.jpg' />
            </span>
            <div className='text'>
              <h3>Timeless Grace</h3>
              <p>Redefining Classic Elegance</p>
            </div>
          </li>
          <li className='g2' data-x='300'>
            <span>
              <img src='./images/gl_2.jpg' />
            </span>
            <div className='text'>
              <h3>Desert Bloom</h3>
              <p>Soft Tones, Strong Statements</p>
            </div>
          </li>
          <li className='g3' data-x='-250'>
            <span>
              <img src='./images/gl_3.jpg' />
            </span>
            <div className='text'>
              <h3>Noir Allure</h3>
              <p>Darkness Has Its Charm</p>
            </div>
          </li>
          <li className='g4' data-x='300'>
            <span>
              <img src='./images/gl_4.jpg' />
            </span>
            <div className='text'>
              <h3>Nordic Calm</h3>
              <p>Clean Lines, Quiet Luxury</p>
            </div>
          </li>
          <li className='g5' data-x='-250'>
            <span>
              <img src='./images/gl_5.jpg' />
            </span>
            <div className='text'>
              <h3>Future Form</h3>
              <p>Style in the Age of Innovation</p>
            </div>
          </li>
          <li className='g6' data-x='300'>
            <span>
              <img src='./images/gl_6.jpg' />
            </span>
            <div className='text'>
              <h3>Boho Drift</h3>
              <p>Free Spirit, Refined Aesthetic</p>
            </div>
          </li>
          <li className='g7' data-x='-250'>
            <span>
              <img src='./images/gl_7.jpg' />
            </span>
            <div className='text'>
              <h3>Midnight Garden</h3>
              <p>Where Romance Meets Mystery</p>
            </div>
          </li>
          <li className='g8' data-x='300'>
            <span>
              <img src='./images/gl_8.jpg' />
            </span>
            <div className='text'>
              <h3>Urban Edge</h3>
              <p>Where City Meets Style</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Section3;
