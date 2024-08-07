import React from "react";
import Image from "next/image";

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
  const projectItems = [
    {
      title: "Project 1",
      description: "Description 1",
      image: "/Magdalene.png",
      className: "col-span-2 row-span-2",
    },
    {
      title: "Project 2",
      description: "Description 2",
      image: "/Calculator.png",
      className: "col-span-1 row-span-2",
    },
    {
      title: "Project 3",
      description: "Description 3",
      image: "/Magdalene.png",
      className: "col-span-2 row-span-1",
    },
    {
      title: "Project 4",
      description: "Description 4",
      image: "/Calculator.png",
      className: "col-span-3 row-span-2",
    },
    {
      title: "Project 5",
      description: "Description 5",
      image: "/Magdalene.png",
      className: "col-span-1 row-span-2",
    },
    {
      title: "Project 6",
      description: "Description 6",
      image: "/Magdalene.png",
      className: "col-span-2 row-span-1",
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