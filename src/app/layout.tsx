import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetBrains = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Valtrizt",
  description: "Valtrizt's portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jetBrains.className}>
        <>
          <div className="fixed inset-x-0 top-0 z-20 h-20 backdrop-blur-[6px] gradient-mask-b-10" />
          <div className="fixed inset-x-0 top-0 z-20 h-20 backdrop-blur-[1px] gradient-mask-b-20" />
          <div className="fixed inset-x-0 top-0 z-20 h-20 backdrop-blur-[1.5px] gradient-mask-b-30" />
          <div className="fixed inset-x-0 top-0 z-20 h-20 backdrop-blur-[2px] gradient-mask-b-40" />
          <div className="fixed inset-x-0 top-0 z-20 h-20 backdrop-blur-[10px] gradient-mask-b-50" />
        </>
        {children}
        <>
          <div className="fixed inset-x-0 bottom-0 z-20 h-24 backdrop-blur-[0.5px] gradient-mask-t-90" />
          <div className="fixed inset-x-0 bottom-0 z-20 h-24 backdrop-blur-[1px] gradient-mask-t-70" />
          <div className="fixed inset-x-0 bottom-0 z-20 h-24 backdrop-blur-[1.5px] gradient-mask-t-50" />
          <div className="fixed inset-x-0 bottom-0 z-20 h-24 backdrop-blur-[2px] gradient-mask-t-30" />
          <div className="fixed inset-x-0 bottom-0 z-20 h-24 backdrop-blur-[2.5px] gradient-mask-t-10" />
        </>
      </body>
    </html>
  );
}
