import React from 'react';

const About: React.FC = () => {
  return (
    <div className="relative z-10 flex flex-col min-h-screen p-8">
      <h1 className="text-customRed text-left pl-10 mt-8 text-4xl md:text-6xl font-medium text-shadow-redglow">
        About Me
      </h1>
      <div className="relative z-10 flex flex-col min-h-screen justify-center items-center text-white text-shadow-glow">
        <div className="font-mono text-lg md:text-3xl space-y-4">
          <p>this.<span className="text-customRed text-shadow-redglow">name</span> = "Valtrizt";</p>
          <p>this.<span className="text-customRed text-shadow-redglow">role</span> = "Full Stack Dev";</p>
          <p className="mb-8">this.<span className="text-customRed text-shadow-redglow">languages</span> = [</p>
          <p className="ml-72 pl-8 mb-2">"C", "JavaScript", "Python",</p>
          <p className="ml-72 pl-8 mb-8">"TypeScript", "Java", "HTML/CSS"</p>
          <p className="ml-72">];</p>

          <p className="mt-8">
            this.<span className="text-customRed text-shadow-redglow">frameworks</span> = [
          </p>
          <p className="ml-72 pl-8 mb-8">"React", "Node.js", "Express", "Next.js"</p>
          <p className="ml-72">];</p>

          <p className="mt-12">
            this.<span className="text-customRed text-shadow-redglow">databases</span> = [
          </p>
          <p className="ml-72 pl-8 mb-2">"MySQL", "PostgreSQL", "MongoDB", "Prisma", "Supabase"</p>
          <p className="ml-72">];</p>
        </div>
      </div>
    </div>
  );
};

export default About;