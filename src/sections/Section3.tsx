import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import TextAnimationUp from '../components/TextAnimationUp';

interface SectionProps {
  isLoading: boolean;
}

const Section3 = ({ isLoading }: SectionProps) => {
  const hasMountedOnce = useRef(false);
  const sectionRef3 = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const seq = useRef<{ frame: number }>({ frame: 0 });
  const topTextRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const frameCount = 96;
  const dataXValues = [-250, 300, -250, 300, -250, 300, -250, 300];
  const liTextContent = [
    {
      title: 'Timeless Grace',
      des: 'Redefining Classic Elegance',
    },
    {
      title: 'Desert Bloom',
      des: 'Soft Tones, Strong Statements',
    },
    {
      title: 'Noir Allure',
      des: 'Darkness Has Its Charm',
    },
    {
      title: 'Nordic Calm',
      des: 'Clean Lines, Quiet Luxury',
    },
    {
      title: 'Future Form',
      des: 'Style in the Age of Innovation',
    },
    {
      title: 'Boho Drift',
      des: 'Free Spirit, Refined Aesthetic',
    },
    {
      title: 'Midnight Garden',
      des: 'Where Romance Meets Mystery',
    },
    {
      title: 'Urban Edge',
      des: 'Where City Meets Style',
    },
  ];

  const preloadImages = (): Promise<void> => {
    return new Promise((resolve) => {
      images.current = [];
      const currentFrame = (index: number): string =>
        `./images/${(index + 1).toString().padStart(2, '0')}-min.jpg`;

      let loaded = 0;
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
          loaded++;
          if (loaded === frameCount) resolve();
        };
        images.current.push(img);
      }
    });
  };

  /**
   * canvas draw image and gsap scroll motion
   */
  const initCanvasSequence = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const render = (getFrame: number) => {
      const context = canvasRef.current?.getContext('2d');
      if (!context) return;
      const img = images.current[getFrame];
      if (!img || !img.complete) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    };

    await preloadImages();
    render(seq.current.frame);

    const tlCanvasSequence = gsap.timeline({
      onUpdate() {
        const progress = this.progress();
        const newFrame = Math.floor(progress * (frameCount - 1));
        seq.current.frame = newFrame;
        render(newFrame);
      },
      scrollTrigger: {
        trigger: sequenceRef.current,
        endTrigger: sectionRef3.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
        markers: true,
        toggleClass: 'animated',
      },
    });

    tlCanvasSequence.to(
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
    return tlCanvasSequence;
  };

  const scrollMotion = (ctx: gsap.Context) => {
    ctx.add(() => {
      const liElements = gsap.utils.toArray(
        'li',
        galleryRef.current
      ) as HTMLElement[];

      liElements.forEach((list, i) => {
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
        const x = dataXValues[i];
        gsap.to(list, {
          x: x,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: list.querySelector('span'),
            start: 'top 530px',
            end: 'bottom 60%',
            scrub: 0,
            invalidateOnRefresh: true,
          },
        });
      });
    });
  };

  useEffect(() => {
    if (!isLoading || hasMountedOnce.current) return;
    hasMountedOnce.current = true;

    const ctx1 = gsap.context((ctx) => {
      initCanvasSequence();
      scrollMotion(ctx);
    }, galleryRef);

    /**
     * 언마운트의 경우 gsap clean up
     */
    // return () => {
    //   ctxText.revert();
    //   ctxGallery.revert();
    // };
  }, [isLoading]);

  useEffect(() => {
    // canvas image frame 저장
    localStorage.setItem('seq', seq.current.frame.toString());
  }, [seq]);

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
          <canvas ref={canvasRef} width={490} height={928}></canvas>
        </div>
        <div className='back'>
          <span></span>
        </div>
      </div>

      <div className='gallery-list' ref={galleryRef}>
        <ul>
          {liTextContent.map(({ title, des }, i) => (
            <li className={`g${i + 1}`} key={i}>
              <span>
                <img src={`./images/gl_${i + 1}.jpg`} alt='' />
              </span>
              <div className='text'>
                <h3>{title}</h3>
                <p>{des}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Section3;
