import React, { useState } from 'react';
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn, faInstagram, faMedium } from '@fortawesome/free-brands-svg-icons';
import { Mail, File } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const socialLinks = [
  { icon: <FontAwesomeIcon icon={faGithub} />, href: "https://github.com/valuin", name: "GitHub" },
  { icon: <FontAwesomeIcon icon={faLinkedinIn} />, href: "https://linkedin.com/in/valtrizt", name: "LinkedIn" },
  { icon: <FontAwesomeIcon icon={faInstagram} />, href: "https://instagram.com/valtrizt", name: "Instagram" },
  { icon: <FontAwesomeIcon icon={faMedium} />, href: "https://medium.com/@valvaltrizt", name: "Medium" },
  { icon: <Mail size={24} />, href: "mailto:valvaltrizt@gmail.com", name: "Gmail" },
  { icon: <File size={24} />, href: "https://drive.google.com/drive/folders/1N9YmbvgpbAzwr7J-d_M8RLoicMI95OIc?usp=sharing", name: "CV" }
];

export function FloatingDock() {
  let mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed backdrop-filter backdrop-blur-lg bg-opacity-30 bottom-8 left-1/2 -translate-x-1/2 flex h-20 items-end gap-4 rounded-2xl bg-gray-700 px-4 md:px-8 pb-5 z-50"
    >
      {socialLinks.map((link, i) => (
        <SocialIcon mouseX={mouseX} key={i} icon={link.icon} href={link.href} name={link.name} />
      ))}
    </motion.div>
  );
}

function SocialIcon({ mouseX, icon, href, name }: { mouseX: MotionValue, icon: React.ReactNode, href: string, name: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const distance = useTransform(mouseX, (val) => {
    if (typeof window !== 'undefined') {
      const bounds = document.getElementById(name)?.getBoundingClientRect() ?? { x: 0, width: 0 };
      return val - bounds.x - bounds.width / 2;
    }
    return 0;
  });

  let widthSync = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 400, damping: 18 });

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <motion.div
          id={name}
          style={{ width }}
          className="aspect-square w-24 rounded-full backdrop-filter backdrop-blur-lg bg-opacity-30 bg-slate-600 flex items-center justify-center hover:bg-customRed transition-colors cursor-pointer"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white text-shadow-glow text-2xl"
            onClick={(e) => e.preventDefault()} // Prevent default to allow popover to work
          >
            {icon}
          </a>
        </motion.div>
      </PopoverTrigger>
      <PopoverContent className="px-2 py-1 bg-transparent text-customRed shadow-md text-md rounded">
        {name}
      </PopoverContent>
    </Popover>
  );
}