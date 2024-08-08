import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogImage,
  DialogSubtitle,
  DialogClose,
  DialogDescription,
  DialogContainer,
} from "@/components/core/dialog";

interface Item {
  image?: string;
  title: string;
  description: string;
  className?: string;
  aspectRatio?: string;
}

interface BentoGridProps {
  items: Item[];
}

const BentoGrid: React.FC<BentoGridProps> = ({ items }) => (
  <div className="grid grid-cols-4 md:grid-cols-6 gap-4 p-4 w-full max-w-6xl mx-auto">
    {items.map((item, index) => (
      <div
        key={index}
        className={`bg-gray-800 rounded-lg overflow-hidden hover:scale-105 duration-200 shadow-lg ${item.className}`}
        style={{
          aspectRatio: item.aspectRatio || "1 / 1",
        }}
      >
        {item.image && (
          <div className="relative w-full h-full hover:grayscale duration-500">
            <Image
              src={item.image}
              alt={item.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
      </div>
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
    },
    {
      title: "Project 6",
      description: "Description 6",
      image: "/Salon.png",
      className: "col-span-2 row-span-1",
      aspectRatio: "2 / 1",
    },
    {
      title: "Project 3",
      description: "Description 3",
      image: "/Code.jpg",
      className: "col-span-1 row-span-1",
      aspectRatio: "1 / 1",
    },
    {
      title: "Project 5",
      description: "Description 5",
      image: "/Calculator.png",
      className: "col-span-1 row-span-3",
      aspectRatio: "9 / 16",
    },
    {
      title: "Project 7",
      description: "Description 7",
      image: "/Mupi.png",
      className: "col-span-2 row-span-2",
      aspectRatio: "16 / 9",
    },
    {
      title: "Project 3",
      description: "Description 3",
      image: "/Dashboard.png",
      className: "col-span-1 row-span-1",
      aspectRatio: "9 / 16",
    },
    {
      title: "Project 2",
      description: "Description 2",
      image: "/Moneasy.png",
      className: "col-span-2 row-span-1",
      aspectRatio: "16 / 9",
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