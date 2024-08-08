import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogSubtitle,
  DialogClose,
  DialogContainer,
} from "@/components/core/dialog";
import { ScrollArea } from "@/components/core/scroll-area";

interface Item {
  image?: string;
  title: string;
  description: string;
  link: string;
  className?: string;
  aspectRatio?: string;
}

interface BentoGridProps {
  items: Item[];
}

const BentoGrid: React.FC<BentoGridProps> = ({ items }) => (
  <div className="grid grid-cols-4 md:grid-cols-6 gap-4 p-4 w-full max-w-6xl mx-auto">
    {items.map((item, index) => (
      <Dialog
        key={index}
        transition={{
          type: "spring",
          mass: 0.5,
          duration: 0.25,
          stiffness: 400,
          damping: 25,
        }}
      >
        <DialogTrigger
          className={`bg-gray-800 rounded-lg overflow-hidden hover:duration-200 shadow-lg hover:shadow-customRed/70  ${item.className}`}
          style={{
            aspectRatio: item.aspectRatio || "1 / 1",
          }}
        >
          {item.image && (
            <div className="relative w-full h-full">
              <Image
                src={item.image}
                alt={item.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
        </DialogTrigger>
        <DialogContainer>
          <DialogContent
            style={{
              borderRadius: "12px",
            }}
            className="relative h-auto w-[500px] border border-customRed bg-customDark"
          >
            <ScrollArea className="h-[90vh]" type="scroll">
              <div className="relative p-6">
                <div className="flex justify-center py-10">
                  <Image
                    src={item.image ?? "Code.jpg"}
                    alt={item.title}
                    className="h-auto w-[350px]"
                    layout="fixed"
                    width={250}
                    height={200}
                  />
                </div>
                <div>
                  <DialogTitle className="text-black">{item.title}</DialogTitle>
                  <DialogSubtitle className="font-light text-gray-400">
                    {item.description}
                  </DialogSubtitle>
                  <div className="mt-4 text-sm text-gray-700">
                    <p>{item.description}</p>
                  </div>
                  <a
                    href={item.link}
                    className="text-blue-500 underline mt-4 block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                  </a>
                </div>
              </div>
            </ScrollArea>
            <DialogClose className="text-zinc-500" />
          </DialogContent>
        </DialogContainer>
      </Dialog>
    ))}
  </div>
);

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
      title: "Project 3",
      description: "Description 3",
      image: "/Code.jpg",
      className: "col-span-1 row-span-1",
      aspectRatio: "1 / 1",
      link: "https://example.com/project3",
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
      image: "/Mupi.png",
      className: "col-span-2 row-span-2",
      aspectRatio: "16 / 9",
      link: "https://example.com/project7",
    },
    {
      title: "Project 3",
      description: "Description 3",
      image: "/Dashboard.png",
      className: "col-span-1 row-span-1",
      aspectRatio: "9 / 16",
      link: "https://example.com/project3",
    },
    {
      title: "Project 2",
      description: "Description 2",
      image: "/Moneasy.png",
      className: "col-span-2 row-span-1",
      aspectRatio: "16 / 9",
      link: "https://example.com/project2",
    },
  ];

  return (
    <div className="relative z-10 flex flex-col items-center min-h-screen p-8 w-full">
      <h1 className="text-white text-center mt-8 mb-12 text-4xl md:text-6xl font-medium text-shadow-glow">
        Selected Projects
      </h1>
      <div className="w-full">
        <BentoGrid items={projectItems} />
      </div>
    </div>
  );
};

export default Projects;
