import React, { useRef } from 'react';
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn, faInstagram, faMedium, faGoogleDrive } from '@fortawesome/free-brands-svg-icons';
import { Mail, File } from 'lucide-react';

const socialLinks = [
  { icon: <FontAwesomeIcon icon={faGithub} />, href: "https://github.com/valuin" },
  { icon: <FontAwesomeIcon icon={faLinkedinIn} />, href: "https://linkedin.com/in/valtrizt" },
  { icon: <FontAwesomeIcon icon={faInstagram} />, href: "https://instagram.com/valtrizt" },
  { icon: <FontAwesomeIcon icon={faMedium} />, href: "https://medium.com/@valvaltrizt" },
  { icon: <Mail size={24} />, href: "https://mail.google.com/mail/u/0/?source=mailto&to=valvaltrizt@gmail.com&fs=1&tf=cm" },
  { icon: <File size={24} />, href: "https://drive.google.com/drive/folders/1N9YmbvgpbAzwr7J-d_M8RLoicMI95OIc?usp=sharing"}
  
];

export function FloatingDock() {
  let mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed backdrop-filter backdrop-blur-lg bg-opacity-30 bottom-8 left-1/2 -translate-x-1/2 flex h-20 items-end gap-4 rounded-2xl bg-gray-700 px-8 pb-5 z-50"
    >
      {socialLinks.map((link, i) => (
        <SocialIcon mouseX={mouseX} key={i} icon={link.icon} href={link.href} />
      ))}
    </motion.div>
  );
}

function SocialIcon({ mouseX, icon, href }: { mouseX: MotionValue, icon: React.ReactNode, href: string }) {
  let ref = useRef<HTMLDivElement>(null);
  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
  let widthSync = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 400, damping: 18 });

  return (
    <motion.div
      ref={ref}
      onClick={() => window.open(href, "_blank")}
      style={{ width: width || 24 }}
      className="aspect-square w-24  rounded-full backdrop-filter backdrop-blur-lg bg-opacity-30 bg-slate-600 flex items-center justify-center hover:bg-customRed transition-colors cursor-pointer"
    >
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-white text-shadow-glow text-2xl">
        {icon}
      </a>
    </motion.div>
  );
}