import { motion, useInView, Variants } from 'framer-motion';
import React, { useRef } from 'react';

interface TextAnimteProps {
  setInView?: boolean | undefined;
  variants: Variants;
  text: string;
}

const TextAnimationUp = ({
  setInView,
  variants,
  text = 'default',
}: TextAnimteProps) => {
  const splittedText = text.split('');
  const ref = useRef(null);
  const isInView = useInView(ref, {
    //margin: '100px 0px -100px 0px',
    once: false,
  });
  const isView = setInView ? setInView : isInView;

  return (
    <div ref={ref} className='text-animation-up'>
      {splittedText.map((current, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>
          <motion.span
            variants={variants}
            initial='initial'
            animate={isView ? 'animate' : 'initial'}
            custom={i}
            style={{ display: 'inline-block' }}
          >
            {current == ' ' ? <span>&nbsp;</span> : current}
          </motion.span>
        </span>
      ))}
    </div>
  );
};
export default TextAnimationUp;
