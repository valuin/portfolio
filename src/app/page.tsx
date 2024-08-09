"use client";
import React, { useEffect } from "react";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Projects from "@/components/Projects";
import { ShaderGradientCanvas, ShaderGradient } from "shadergradient";
import * as reactSpring from "@react-spring/three";
import * as drei from "@react-three/drei";
import * as fiber from "@react-three/fiber";
import { FlipWords } from "@/components/core/flip-words";
import { ScrollArea } from "@/components/core/scroll-area";

export default function Home() {

  const words = ["Developer", "Student", "Designer", "Thinker"];

  return (
    <main className="flex flex-col min-h-screen bg-customDark overflow-hidden">
      <ScrollArea className="h-screen">
      <div className="relative w-full h-screen">
        <ShaderGradientCanvas
          importedFiber={{ ...fiber, ...drei, ...reactSpring }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <ShaderGradient
            control="query"
            urlString={process.env.NEXT_PUBLIC_SHADER_GRADIENT_URL}
          />
        </ShaderGradientCanvas>

        <div className="absolute inset-0 flex flex-col justify-end items-start p-8 z-10 mb-24 ml-8">
          <h1 className="text-white text-3xl md:text-4xl font-bold text-shadow-glow pb-48 mb-36">
            Jakarta, Indonesia
          </h1>
          <h1 className="text-white text-5xl md:text-7xl lg:text-9xl font-bold mb-4 text-shadow-glow">
            Valtrizt
          </h1>
          <FlipWords words={words} /> <br />
        </div>

        <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-b from-transparent to-customDark pointer-events-none"></div>
      </div>

      <div className="relative w-full min-h-screen bg-customDark mt-8">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/2and3.png')`,
          }}
        ></div>
        <About />
        <Projects />
      </div>
      </ScrollArea>
    </main>
  );
}