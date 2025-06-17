import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import imagesLoaded from 'imagesloaded';
import loaderimage from '../assets/images/loader_img.webp';

interface LoaderProps {
  onLoaded: () => void;
}

const Loader = ({ onLoaded }: LoaderProps) => {
  const preloaderElem = useRef<HTMLDivElement>(null);
  const progressElem = useRef<HTMLDivElement>(null);
  const percentElem = useRef<HTMLParagraphElement | null>(null);
  const loaderImgElem = useRef<HTMLDivElement>(null);
  const loadingElem = useRef<HTMLDivElement>(null);

  const preloaderAnimation = () => {
    if (loadingElem.current) {
      gsap.to(loadingElem.current, { opacity: 0, duration: 1, delay: 0.3 });
    }
    if (progressElem.current) {
      gsap.to(progressElem.current, {
        height: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power2.inOut',
      });
    }

    if (loaderImgElem.current) {
      gsap.to(loaderImgElem.current, {
        height: 0,
        duration: 1,
        delay: 1.5,
        ease: 'power2.inOut',
        onComplete: () => {
          onLoaded();
        },
      });
      gsap.to(loaderImgElem.current.children, {
        y: -500,
        duration: 1.7,
        delay: 2,
        ease: 'power2.inOut',
        onComplete: () => {
          if (preloaderElem.current) {
            preloaderElem.current.style.cssText = 'display:none;';
          }
        },
      });
    }
  };

  useEffect(() => {
    const imgLoad: any = imagesLoaded(document.body);
    const imgTotal: any = imgLoad.images.length;

    let imgLoaded: number = 0;
    let current: number = 0;
    let progressTimer: any = null;

    const updateProgress = () => {
      const target: number = (imgLoaded / imgTotal) * 100;
      current += Math.ceil((target - current) * 0.1);

      if (percentElem.current) {
        percentElem.current.textContent = `${Math.floor(current)}%`;
      }

      if (current >= 100) {
        clearInterval(progressTimer);
        preloaderAnimation();
      }
    };

    const onImageProgress = () => {
      imgLoaded++;
    };

    imgLoad.on('progress', onImageProgress);
    progressTimer = setInterval(updateProgress, 3000 / 60);

    return () => {
      // remove listener
      imgLoad.off('progress', onImageProgress);
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <div className='preloader' ref={preloaderElem}>
      <div className='progress' ref={progressElem}>
        <div className='loading' ref={loadingElem}>
          <div className='spinner-wrapper'>
            <span className='spinner-text'>Loading</span>
            <span className='spinner'></span>
          </div>
          <p className='percent' ref={percentElem}></p>
        </div>
      </div>
      <div className='loader-image' ref={loaderImgElem}>
        <img src={loaderimage} />
      </div>
    </div>
  );
};

export default Loader;
