import React, { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useInView,
} from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { ScrollArea } from "@/components/core/scroll-area";

interface AnimatedTextProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

interface Item {
  image?: string;
  title: string;
  description: string;
  link: string;
  className?: string;
  aspectRatio?: string;
  content?: React.ReactNode | (() => React.ReactNode);
}

interface BentoGridProps {
  items: Item[];
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  delay = 0,
  className,
}) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
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
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.p>
  );
};

const BentoGrid: React.FC<BentoGridProps> = ({ items }) => {
  const [active, setActive] = useState<Item | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[300px] md:max-w-[500px] h-3/4 md:h-fit md:max-h-full flex flex-col bg-white dark:bg-neutral-900 rounded-2xl sm:rounded-3xl overflow-hidden backdrop-filter backdrop-blur-lg bg-opacity-30"
            >
              <motion.div
                layoutId={`image-${active.title}-${id}`}
                className="relative h-80"
              >
                <Image
                  src={active.image || "/placeholder.jpg"}
                  alt={active.title}
                  layout="fill"
                  objectFit="cover"
                  className="sm:rounded-tr-lg sm:rounded-tl-lg"
                />
              </motion.div>
              <ScrollArea className="h-[calc(90vh-20rem)]" type="scroll">
                <div className="p-6">
                  <motion.h3
                    layoutId={`title-${active.title}-${id}`}
                    className="font-medium text-customDark text-xl mb-2"
                  >
                    {active.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${active.description}-${id}`}
                    className="text-black shadow-customDark text-base mb-4"
                  >
                    {active.description}
                  </motion.p>
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 dark:text-neutral-400 text-sm"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block px-4 py-2 text-sm rounded-full font-bold bg-customDark text-white hover:bg-customRed transition-colors"
                  >
                    View Project
                  </motion.a>
                </div>
              </ScrollArea>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <div className="grid grid-cols-4 md:grid-cols-4 gap-4 p-4 w-full max-w-6xl mx-auto">
        {items.map((item, index) => (
          <motion.div
            layoutId={`card-${item.title}-${id}`}
            key={item.title}
            onClick={() => setActive(item)}
            className={`bg-gray-800 rounded-lg overflow-hidden hover:duration-200 shadow-lg hover:shadow-customRed/70 cursor-pointer ${item.className}`}
            style={{ aspectRatio: item.aspectRatio || "1 / 1" }}
          >
            <motion.div
              layoutId={`image-${item.title}-${id}`}
              className="relative w-full h-full"
            >
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title}
                  layout="fill"
                  style={{ objectFit: "cover" }}
                />
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const Projects: React.FC = () => {
  const projectItems: Item[] = [
    {
      title: "Econity",
      description: "A mobile app prototype for a trash-picking app with a gamification system, built using Flutter for prototype and Figma for UI design.",
      image: "/Econity.png",
      className: "col-span-2 row-span-1",
      aspectRatio: "2 / 1",
      link: "https://www.canva.com/design/DAF7bBTX3nk/N6cNf0-dDZtUM674SD32Pg/edit?utm_content=DAF7bBTX3nk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
    },
    {
      title: "SEA Salon",
      description: "This project is a submission for the selection of Compfest Academy, built using Next.js and Supabase. It features Tailwind CSS for styling and Vercel for deployment.",
      image: "/Salon.png",
      className: "col-span-2 row-span-1",
      aspectRatio: "2 / 1",
      link: "https://github.com/valuin/SEA-Salon-Compfest",
    },
    {
      title: "Calculator App",
      description: "A simple calculator UI design using Figma",
      image: "/Calculator.png",
      className: "col-span-1 row-span-3",
      aspectRatio: "9 / 16",
      link: "https://www.figma.com/design/85bDMA0vreOyaWYFXlPIX7/Calculator?node-id=0-1&t=N6uZGfZj0CMMZHCK-1",
    },
    {
      title: "Moneasy",
      description: "financial management web app integrated with AI. Top 5 at hackjakarta 2024 financial inclusion track. Built using React, Next.js, and Supabase.",
      image: "/Moneasy.png",
      className: "col-span-2 row-span-2",
      aspectRatio: "16 / 9",
      link: "https://github.com/valuin/moneasy",
    },
    {
      title: "Hotel Management App",
      description: "Full-stack web app for hotel management simulation, built using Next.js and MySQL.",
      image: "/Hotel.png",
      className: "col-span-1 row-span-1",
      aspectRatio: "11 / 13",
      link: "https://github.com/valuin/hotel_express_fullstack",
    },
    {
      title: "Movie Search Web",
      description: "Developed an IMDB-like web application using React, Tailwind, and Next.js, resulting in a responsive interface that can handle 1,000+ movies.",
      image: "/Mupi.png",
      className: "col-span-2 row-span-2",
      aspectRatio: "16 / 9",
      link: "https://example.com/project2",
    },
  ];

  return (
    <div className="relative z-10 flex flex-col items-center min-h-screen p-8 w-full">
        <h1 className="text-white text-center mt-8 mr-6 md:mr-0 mb-12 text-4xl md:text-6xl font-medium text-shadow-glow">
          Selected Projects
        </h1>
      <div className="w-full mr-6 md:mr-0">
        <BentoGrid items={projectItems} />
      </div>
    </div>
  );
};

export default Projects;
