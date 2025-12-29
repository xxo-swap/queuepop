"use client";

import { useEffect } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import CustomEase from "gsap/CustomEase";

export default function Preloader({ onDone }) {
  useEffect(() => {
    gsap.registerPlugin(SplitText, CustomEase);
    CustomEase.create("hop", "0.9,0,0.1,1");

    const counterEl = document.querySelector(".preloader-counter h1");
    const counterWrap = document.querySelector(".preloader-counter");
    const counter = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        counterWrap && counterWrap.remove();
        onDone();
      },
    });

    tl.to(counter, {
      value: 100,
      duration: 3,
      ease: "power3.out",
      onUpdate: () => {
        if (counterEl)
          counterEl.textContent = Math.floor(counter.value);
      },
    });

    return () => tl.kill();
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="preloader-counter">
        <h1 className="font-dm text-white text-6xl">0</h1>
      </div>
    </div>
  );
}
