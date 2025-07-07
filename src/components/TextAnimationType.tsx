import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';

const TextAnimationType = ({ text = 'default' }: { text: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <>
      {text.split('').map((char, i) => (
        <motion.span
          ref={ref}
          key={i}
          initial={{ opacity: 0, x: -18 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          exit='hidden'
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className='text-animation-type'
        >
          {char === ' ' ? <span>&nbsp;</span> : char}
        </motion.span>
      ))}
    </>
  );
};
export default TextAnimationType;
