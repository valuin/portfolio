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
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden backdrop-filter backdrop-blur-lg bg-opacity-30"
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
                    className="text-customDark text-base mb-4"
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
                    className="mt-4 inline-block px-4 py-2 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    View Project
                  </motion.a>
                </div>
              </ScrollArea>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 w-full justify-center max-w-64 md:max-w-6xl mx-auto">
        {items.map((item, index) => (
          <motion.div
            layoutId={`card-${item.title}-${id}`}
            key={item.title}
            onClick={() => setActive(item)}
            className={`bg-gray-800 rounded-lg overflow-hidden object-contain hover:duration-200 shadow-lg hover:shadow-customRed/70 cursor-pointer ${item.className}`}
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
      title: "Project 1",
      description: "Description 1",
      image: "/Econity.png",
      className: "col-span-2 row-span-1",
      aspectRatio: "2 / 1",
      link: "https://example.com/project1",
    },
    {
      title: "Project 6",
      description: "Description 6",
      image: "/Salon.png",
      className: "col-span-2 row-span-1",
      aspectRatio: "2 / 1",
      link: "https://example.com/project6",
    },
    {
      title: "Project 5",
      description: "Description 5",
      image: "/Calculator.png",
      className: "col-span-1 row-span-3",
      aspectRatio: "9 / 16",
      link: "https://example.com/project5",
    },
    {
      title: "Project 7",
      description: "Description 7",
      image: "/Moneasy.png",
      className: "col-span-2 row-span-2",
      aspectRatio: "16 / 9",
      link: "https://example.com/project7",
    },
    {
      title: "Project 34",
      description: "Description 344",
      image: "/Code.jpg",
      className: "col-span-1 row-span-1",
      aspectRatio: "11 / 13",
      link: "https://example.com/project3",
    },
    {
      title: "Project 2",
      description: "Description 2",
      image: "/Mupi.png",
      className: "col-span-2 row-span-2",
      aspectRatio: "16 / 9",
      link: "https://example.com/project2",
    },
    {
      title: "Project 3",
      description: "Description 3",
      image: "/Dashboard.png",
      className: "col-span-1 row-span-1",
      aspectRatio: "9 / 16",
      link: "https://example.com/project3",
    },
  ];

  return (
    <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-8 w-full p-8">
        <h1 className="text-white text-center mt-8 mb-12 text-2xl md:text-6xl max-w-fit md:max-w-6xl font-medium text-shadow-glow">
          Selected Projects
        </h1>
      <div className="w-full">
        <BentoGrid items={projectItems} />
      </div>
      console.log(window.innerWidth);
    </div>
  );
};

export default Projects;
