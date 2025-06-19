import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';

const TextAnimationUp = ({ text = 'default' }: { text: string }) => {
  const splittedText = text.split('');

  const pullupVariant = {
    initial: { y: 10, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
      },
    }),
  };
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <>
      {splittedText.map((current, i) => (
        <motion.span
          key={i}
          ref={ref}
          variants={pullupVariant}
          initial='initial'
          animate={isInView ? 'animate' : ''}
          custom={i}
        >
          {current == ' ' ? <span>&nbsp;</span> : current}
        </motion.span>
      ))}
    </>
  );
};
export default TextAnimationUp;
