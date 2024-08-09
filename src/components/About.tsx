import React from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface AnimatedTextProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ children, delay = 0, className }) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  return (
    <motion.p
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.p>
  );
};

const About: React.FC = () => {
  return (
    <div className="relative z-10 flex flex-col min-h-screen p-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-customRed text-left pl-10 mt-8 text-4xl md:text-6xl font-medium text-shadow-redglow"
      >
        About Me
      </motion.h1>
      <div className="relative z-10 flex flex-col min-h-screen justify-center items-center text-white text-shadow-glow">
        <div className="font-mono text-lg md:text-3xl space-y-4">
          <AnimatedText delay={0.1}>this.<span className="text-customRed text-shadow-redglow">name</span> = "Valtrizt Khalifah";</AnimatedText>
          <AnimatedText delay={0.2}>this.<span className="text-customRed text-shadow-redglow">role</span> = "Full Stack Dev";</AnimatedText>
          <AnimatedText delay={0.3}>this.<span className="text-customRed text-shadow-redglow">languages</span> = [</AnimatedText>
          <AnimatedText delay={0.4} className="ml-72 pl-8 mb-2">"C", "JavaScript", "Python",</AnimatedText>
          <AnimatedText delay={0.5} className="ml-72 pl-8 mb-8">"TypeScript", "Java", "HTML/CSS"</AnimatedText>
          <AnimatedText delay={0.6} className="ml-72">];</AnimatedText>

          <AnimatedText delay={0.7}>
            this.<span className="text-customRed text-shadow-redglow">frameworks</span> = [
          </AnimatedText>
          <AnimatedText delay={0.8} className="ml-72 pl-8 mb-8">"React", "Node.js", "Express", "Next.js"</AnimatedText>
          <AnimatedText delay={0.9} className="ml-72">];</AnimatedText>

          <AnimatedText delay={1.0}>
            this.<span className="text-customRed text-shadow-redglow">databases</span> = [
          </AnimatedText>
          <AnimatedText delay={1.1} className="ml-72 pl-8 mb-2">"MySQL", "PostgreSQL", "MongoDB", "Prisma", "Supabase"</AnimatedText>
          <AnimatedText delay={1.2} className="ml-72">];</AnimatedText>
        </div>
      </div>
    </div>
  );
};

export default About;