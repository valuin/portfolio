"use client";
import React from "react";
import About from "@/components/About";
import Projects from "@/components/Projects";
import { ShaderGradientCanvas, ShaderGradient } from "shadergradient";
import * as reactSpring from "@react-spring/three";
import * as drei from "@react-three/drei";
import * as fiber from "@react-three/fiber";
import { FlipWords } from "@/components/core/flip-words";
import { ScrollArea } from "@/components/core/scroll-area";
import GradualSpacing from "@/components/core/gradual-spacing";
import { FloatingDock } from "@/components/FloatingDock";

type ShaderGradientProps = {
  control?: "query" | "props";
  dampingFactor?: number;
  frameRate?: number;
  grain?: "on" | "off";
  lightType?: "env" | "3d";
  urlString?: string;
};

export default function Home() {
  const words = ["Developer", "Student", "Designer", "Thinker"];

  const MemoizedShaderGradient =
    React.memo<ShaderGradientProps>(ShaderGradient);

  return (
    <main className="flex flex-col min-h-screen bg-customDark">
      <ScrollArea className="h-screen relative">
        <>
          <div className="fixed inset-x-0 top-0 z-20 h-20 backdrop-blur-[6px] gradient-mask-b-10" />
          <div className="fixed inset-x-0 top-0 z-20 h-20 backdrop-blur-[1px] gradient-mask-b-20" />
          <div className="fixed inset-x-0 top-0 z-20 h-20 backdrop-blur-[1.5px] gradient-mask-b-30" />
          <div className="fixed inset-x-0 top-0 z-20 h-20 backdrop-blur-[2px] gradient-mask-b-40" />
          <div className="fixed inset-x-0 top-0 z-20 h-20 backdrop-blur-[10px] gradient-mask-b-50" />
        </>
        <div>
          <FloatingDock />
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
              gl={{ antialias: false }}
              dpr={[1, 1.5]}
              pixelDensity={1}
              fov={50}
              frameRate={30}
            >
              <MemoizedShaderGradient
                dampingFactor={0.1}
                lightType="env"
                grain="off"
                control="query"
                urlString={process.env.NEXT_PUBLIC_SHADER_GRADIENT_URL}
              />
            </ShaderGradientCanvas>

            <div className="absolute inset-0 flex flex-col justify-start items-start p-8 mt-16 z-10 px-8 md:px-20 text-white text-shadow-glow">
              <GradualSpacing
                className="text-lg md:text-4xl md:leading-[5rem] font-bold pb-48 mb-80 md:mb-56 text-white text-shadow-glow tracking-[-0.1em]"
                text="Jakarta, Indonesia"
              />
            </div>

            <div className="absolute inset-0 flex flex-col justify-end items-start p-8 z-10 mb-24 px-8 md:px-20">
              <GradualSpacing
                className="text-white text-5xl ml-1 md:ml-0 md:text-7xl lg:text-9xl font-bold mb-4 text-shadow-glow"
                text="Valtrizt"
              />
              <FlipWords words={words} />
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
        </div>
        <>
          <div className="fixed inset-x-0 bottom-0 z-20 h-24 backdrop-blur-[0.5px] gradient-mask-t-90" />
          <div className="fixed inset-x-0 bottom-0 z-20 h-24 backdrop-blur-[1px] gradient-mask-t-70" />
          <div className="fixed inset-x-0 bottom-0 z-20 h-24 backdrop-blur-[1.5px] gradient-mask-t-50" />
          <div className="fixed inset-x-0 bottom-0 z-20 h-24 backdrop-blur-[2px] gradient-mask-t-30" />
          <div className="fixed inset-x-0 bottom-0 z-20 h-24 backdrop-blur-[2.5px] gradient-mask-t-10" />
        </>
      </ScrollArea>
    </main>
  );
}
