"use client";
import { useEffect, useRef } from "react";

export default function TaglineReveal({ text }) {
  const words = text.split(" ");
  const refs = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.target.dataset.i - b.target.dataset.i)
          .forEach((e, k) => {
            io.unobserve(e.target);
            setTimeout(() => {
              e.target.dataset.on = "true";
            }, k * 40);
          });
      },
      { rootMargin: "0px 0px -35% 0px" }, // trigger line at 65% of the viewport
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <p className="heading-3 max-w-[680px]">
      {words.map((word, i) => (
        <span key={i}>
          <span
            ref={(el) => (refs.current[i] = el)}
            data-i={i}
            className="opacity-30 transition-opacity duration-500 ease-base data-[on=true]:opacity-100 motion-reduce:opacity-100"
          >
            {word}
          </span>{" "}
        </span>
      ))}
    </p>
  );
}
