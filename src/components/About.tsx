import React, { useEffect, useRef } from 'react';

interface FadeInElementProps {
  children: React.ReactNode;
  className?: string;
}

const FadeInElement: React.FC<FadeInElementProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.9 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`fade-element ${className}`}
    >
      {children}
    </div>
  );
};

const About: React.FC = () => {
  return (
    <div className="relative z-10 flex flex-col min-h-screen p-8">
      <div className="relative z-10 flex px-6 flex-col min-h-screen justify-center items-center text-white">
        <FadeInElement className="text-customRed text-shadow-redglow text-left mb-24 text-4xl md:text-6xl font-medium">
          About Me
        </FadeInElement>
        <div className="font-mono text-lg text-shadow-glow md:text-2xl lg:text-3xl space-y-4">
          <FadeInElement>
            this.<span className="text-customRed text-shadow-redglow">name</span> = "Valtrizt";
          </FadeInElement>
          <FadeInElement>
            this.<span className="text-customRed text-shadow-redglow">role</span> = "Full Stack Dev";
          </FadeInElement>
          <FadeInElement>
            this.<span className="text-customRed text-shadow-redglow">languages</span> = [
          </FadeInElement>
          <FadeInElement className="ml-36 md:ml-72 pl-8 mb-2">
            "C", "JavaScript", "Python",
          </FadeInElement>
          <FadeInElement className="ml-36 md:ml-72 pl-8 mb-8">
            "TypeScript", "Java", "HTML/CSS"
          </FadeInElement>
          <FadeInElement className="ml-36 md:ml-72">
            ];
          </FadeInElement>

          <FadeInElement>
            this.<span className="text-customRed text-shadow-redglow">frameworks</span> = [
          </FadeInElement>
          <FadeInElement className="ml-36 md:ml-72 pl-8 mb-8">
            "React", "Node.js", "Express", "Next.js"
          </FadeInElement>
          <FadeInElement className="ml-36 md:ml-72">
            ];
          </FadeInElement>

          <FadeInElement>
            this.<span className="text-customRed text-shadow-redglow">databases</span> = [
          </FadeInElement>
          <FadeInElement className="ml-36 md:ml-72 pl-8 mb-2">
            "MySQL", "PostgreSQL", "MongoDB", "Prisma", "Supabase"
          </FadeInElement>
          <FadeInElement className="ml-36 md:ml-72">
            ];
          </FadeInElement>
        </div>
      </div>
    </div>
  );
};

export default About;
