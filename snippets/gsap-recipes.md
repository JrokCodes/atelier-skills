# GSAP Recipes

Production-ready GSAP patterns for React 19 + TypeScript projects. GSAP excels at timeline sequences, scroll-driven animations, and text effects that Framer Motion cannot match.

**Setup**:
```bash
npm install gsap @gsap/react
```

**Plugin registration** (do this once, at app entry):
```tsx
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin);
```

**Note**: SplitText requires a GSAP Club membership. For free alternatives, use a manual split approach (shown below).

---

## Character Reveal

Animate each character individually for dramatic headline entrances.

**Use case**: Hero headlines, page titles, brand name reveals.

```tsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

function CharReveal({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const split = new SplitText(ref.current, { type: "chars" });
    gsap.from(split.chars, {
      y: 100,
      opacity: 0,
      stagger: 0.02,
      duration: 0.8,
      ease: "power4.out",
    });
    return () => split.revert();
  }, { scope: ref });

  return (
    <h1 ref={ref} className="text-7xl font-bold">
      {text}
    </h1>
  );
}
```

**Free alternative** (no SplitText plugin):

```tsx
function CharReveal({ text }: { text: string }) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll("span");
    gsap.from(chars, {
      y: 100,
      opacity: 0,
      stagger: 0.02,
      duration: 0.8,
      ease: "power4.out",
    });
  }, { scope: containerRef });

  return (
    <h1 ref={containerRef} className="text-7xl font-bold">
      {text.split("").map((char, i) => (
        <span key={i} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
}
```

---

## ScrollTrigger Pin Section

Pin a section while scroll-driven content animates within it.

**Use case**: Feature showcases, product demos, storytelling sequences.

```tsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function PinnedSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const panels = contentRef.current.querySelectorAll(".panel");

    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${sectionRef.current!.offsetWidth}`,
      },
    });
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="overflow-hidden">
      <div ref={contentRef} className="flex">
        <div className="panel flex h-screen w-screen shrink-0 items-center justify-center">
          Panel 1
        </div>
        <div className="panel flex h-screen w-screen shrink-0 items-center justify-center">
          Panel 2
        </div>
        <div className="panel flex h-screen w-screen shrink-0 items-center justify-center">
          Panel 3
        </div>
      </div>
    </div>
  );
}
```

---

## Scroll-Triggered Text Reveal (Line by Line)

Reveal paragraph text one line at a time as the user scrolls.

**Use case**: About sections, mission statements, long-form content.

```tsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function LineReveal({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const split = new SplitText(ref.current, { type: "lines" });

    gsap.from(split.lines, {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    return () => split.revert();
  }, { scope: ref });

  return (
    <p ref={ref} className="text-xl leading-relaxed text-neutral-300">
      {text}
    </p>
  );
}
```

---

## Horizontal Scroll Section

Convert vertical scroll into horizontal movement for a gallery or feature strip.

**Use case**: Portfolio galleries, feature strips, timeline displays.

```tsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function HorizontalScroll({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !trackRef.current) return;

    const totalWidth = trackRef.current.scrollWidth - window.innerWidth;

    gsap.to(trackRef.current, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${totalWidth}`,
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="overflow-hidden">
      <div ref={trackRef} className="flex gap-8 px-8">
        {children}
      </div>
    </div>
  );
}
```

---

## SVG Path Draw Animation

Animate an SVG path as if it's being drawn on screen.

**Use case**: Logo reveals, icon animations, decorative line art.

```tsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function DrawPath() {
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    if (!pathRef.current) return;

    const length = pathRef.current.getTotalLength();
    gsap.set(pathRef.current, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: pathRef.current,
        start: "top 80%",
      },
    });
  });

  return (
    <svg viewBox="0 0 200 200" className="h-48 w-48">
      <path
        ref={pathRef}
        d="M10,80 Q95,10 180,80 T350,80"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
```

---

## Text Scramble Effect

Random characters resolve into the final text for a cyberpunk/tech aesthetic.

**Use case**: Loading states, hero headlines, data-driven UIs.

```tsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";

function TextScramble({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const el = ref.current;
    const finalText = text;
    let iteration = 0;

    const interval = setInterval(() => {
      el.textContent = finalText
        .split("")
        .map((char, i) => {
          if (i < iteration) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      if (iteration >= finalText.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  });

  return (
    <span ref={ref} className="font-mono text-4xl font-bold">
      {text}
    </span>
  );
}
```

---

## Timeline Sequences

Chain multiple animations with precise timing control.

**Use case**: Complex entrance sequences, coordinated multi-element animations.

```tsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

function HeroEntrance() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".hero-badge", { y: -20, opacity: 0, duration: 0.5 })
      .from(".hero-headline", { y: 40, opacity: 0, duration: 0.7 }, "-=0.2")
      .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.5 }, "-=0.3")
      .from(".hero-cta", { y: 20, opacity: 0, duration: 0.5 }, "-=0.2")
      .from(".hero-image", { scale: 0.95, opacity: 0, duration: 0.8 }, "-=0.4");
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex flex-col items-center py-32">
      <span className="hero-badge rounded-full bg-blue-500/10 px-4 py-1 text-sm text-blue-400">
        New Release
      </span>
      <h1 className="hero-headline mt-6 text-7xl font-bold">Headline</h1>
      <p className="hero-subtitle mt-4 text-xl text-neutral-400">Subtitle text</p>
      <button className="hero-cta mt-8 rounded-xl bg-blue-500 px-8 py-3">
        Get Started
      </button>
      <div className="hero-image mt-16 h-96 w-full rounded-2xl bg-white/5" />
    </div>
  );
}
```

**Timeline position parameters**:
- `"-=0.3"` — Start 0.3s before previous animation ends (overlap)
- `"+=0.5"` — Start 0.5s after previous animation ends (gap)
- `"<"` — Start at same time as previous animation
- `"<0.2"` — Start 0.2s after previous animation starts
