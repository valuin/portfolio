import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      className="w-full py-4 mt-8 rounded-xl text-white text-center relative z-10 bg-[rgba(255,255,255,0.1)] border border-[rgba(201, 176, 255)] shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)", // For Safari compatibility
      }}
    >
      <p>&copy; {new Date().getFullYear()} Made by Valtrizt</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a
          href="https://twitter.com/yourhandle"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="https://instagram.com/yourhandle"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </div>
    </footer>
  );
};

export default Footer;