# Framer Motion Recipes

Production-ready Framer Motion 12+ patterns for React 19 + TypeScript + Tailwind v4.

---

## Fade In on Mount

Simple opacity + vertical slide for any element appearing on screen.

**Use case**: Cards, text blocks, images that should gracefully appear.

```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  className="rounded-2xl bg-white/5 p-8"
>
  Content here
</motion.div>
```

---

## Scroll-Triggered Reveal (useInView)

Trigger animation when element enters the viewport. Uses `whileInView` for declarative scroll binding.

**Use case**: Section headings, feature cards, any below-the-fold content.

```tsx
import { motion } from "framer-motion";

<motion.section
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
  className="py-24"
>
  <h2 className="text-4xl font-bold">Section Title</h2>
  <p className="mt-4 text-lg text-neutral-400">Description text.</p>
</motion.section>
```

For imperative control with `useInView`:

```tsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function RevealSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
```

---

## Staggered Children

Animate a list of items one after another with a configurable delay.

**Use case**: Feature grids, card lists, navigation links, stat counters.

```tsx
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

<motion.div
  variants={container}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  className="grid grid-cols-3 gap-8"
>
  {features.map((feature) => (
    <motion.div
      key={feature.id}
      variants={item}
      className="rounded-2xl bg-white/5 p-6"
    >
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </motion.div>
  ))}
</motion.div>
```

---

## Hover Lift with Scale

Subtle lift effect on hover for interactive cards and buttons.

**Use case**: Clickable cards, portfolio items, pricing tiers.

```tsx
import { motion } from "framer-motion";

<motion.div
  whileHover={{
    y: -8,
    scale: 1.02,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  }}
  whileTap={{ scale: 0.98 }}
  className="cursor-pointer rounded-2xl bg-white/5 p-8 border border-white/10"
>
  Card content
</motion.div>
```

---

## 3D Card Tilt

Mouse-position-aware tilt that follows the cursor. Creates a depth effect.

**Use case**: Hero cards, feature highlights, testimonial cards.

```tsx
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [8, -8]);
  const rotateY = useTransform(x, [0, 1], [-8, 8]);

  function handleMouse(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="rounded-2xl bg-white/5 p-8 border border-white/10"
    >
      {children}
    </motion.div>
  );
}
```

---

## Parallax Scroll

Create depth by moving elements at different scroll speeds.

**Use case**: Hero backgrounds, floating decorative elements, layered sections.

```tsx
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function ParallaxSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent"
      />
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex h-full items-center justify-center"
      >
        <h2 className="text-6xl font-bold">Parallax Content</h2>
      </motion.div>
    </section>
  );
}
```

---

## Animated Counter

Smooth number animation from 0 to target value.

**Use case**: Stats sections, metric displays, dashboard numbers.

```tsx
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

function AnimatedCounter({
  target,
  duration = 2,
  suffix = "",
}: {
  target: number;
  duration?: number;
  suffix?: string;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    const controls = animate(count, target, {
      duration,
      ease: "easeOut",
    });
    return controls.stop;
  }, [target, duration, count]);

  return (
    <motion.span className="text-5xl font-bold tabular-nums">
      {rounded}
    </motion.span>
  );
}

// Usage:
<AnimatedCounter target={1000} suffix="+" />
<AnimatedCounter target={99} suffix="%" duration={1.5} />
```

---

## Page Transitions

Animate between routes with smooth enter/exit transitions.

**Use case**: Multi-page apps, route changes, modal-style page overlays.

```tsx
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, Outlet } from "react-router";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

function AnimatedLayout() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
```

---

## Layout Animations

Smooth transitions when elements change size or position in the DOM.

**Use case**: Filtering grids, expanding cards, tab content switching.

```tsx
import { motion } from "framer-motion";

function FilterableGrid({ items, filter }: { items: Item[]; filter: string }) {
  const filtered = items.filter((i) => filter === "all" || i.category === filter);

  return (
    <motion.div layout className="grid grid-cols-3 gap-6">
      {filtered.map((item) => (
        <motion.div
          key={item.id}
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="rounded-xl bg-white/5 p-6"
        >
          {item.name}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

---

## Shared Layout Transitions

Seamlessly morph an element from one location to another across components.

**Use case**: Card-to-detail expand, tab underline indicators, avatar transitions.

```tsx
import { motion } from "framer-motion";
import { useState } from "react";

function Tabs({ tabs }: { tabs: string[] }) {
  const [active, setActive] = useState(tabs[0]);

  return (
    <div className="flex gap-4 border-b border-white/10">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className="relative px-4 py-2 text-sm"
        >
          {tab}
          {active === tab && (
            <motion.div
              layoutId="tab-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
```

---

## Drag with Constraints

Draggable elements bounded within a container.

**Use case**: Slider handles, reorderable lists, interactive demos.

```tsx
import { motion } from "framer-motion";
import { useRef } from "react";

function DraggableCard() {
  const constraintsRef = useRef(null);

  return (
    <div ref={constraintsRef} className="h-96 w-full rounded-2xl bg-white/5">
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        whileDrag={{ scale: 1.05, cursor: "grabbing" }}
        className="h-24 w-24 cursor-grab rounded-xl bg-blue-500"
      />
    </div>
  );
}
```

---

## Exit Animations

Animate elements as they leave the DOM.

**Use case**: Modals, notifications, list item removal, route transitions.

```tsx
import { AnimatePresence, motion } from "framer-motion";

function NotificationList({ notifications }: { notifications: Notification[] }) {
  return (
    <AnimatePresence>
      {notifications.map((n) => (
        <motion.div
          key={n.id}
          initial={{ opacity: 0, x: 100, height: 0 }}
          animate={{ opacity: 1, x: 0, height: "auto" }}
          exit={{ opacity: 0, x: -100, height: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="mb-2 rounded-lg bg-white/10 p-4"
        >
          {n.message}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
```

---

## Spring Physics Config

Reference for tuning spring animations. Higher stiffness = snappier. Higher damping = less bounce.

**Use case**: Tuning the "feel" of any spring-based animation.

```tsx
// Snappy, minimal bounce — buttons, tabs
{ type: "spring", stiffness: 400, damping: 30 }

// Bouncy, playful — cards, modals
{ type: "spring", stiffness: 200, damping: 15 }

// Smooth, heavy — page transitions, large elements
{ type: "spring", stiffness: 100, damping: 20 }

// Quick snap — toggles, switches
{ type: "spring", stiffness: 500, damping: 35 }

// Gentle float — decorative elements
{ type: "spring", stiffness: 50, damping: 10 }

// Named presets in a variants object:
const springPresets = {
  snappy: { type: "spring" as const, stiffness: 400, damping: 30 },
  bouncy: { type: "spring" as const, stiffness: 200, damping: 15 },
  smooth: { type: "spring" as const, stiffness: 100, damping: 20 },
  snap: { type: "spring" as const, stiffness: 500, damping: 35 },
  gentle: { type: "spring" as const, stiffness: 50, damping: 10 },
};
```

---

## Gradient Blob Animation

Morphing background blobs for ambient visual interest.

**Use case**: Hero backgrounds, section accents, ambient decoration.

```tsx
import { motion } from "framer-motion";

function GradientBlob({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <motion.div
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -50, 20, 0],
        scale: [1, 1.1, 0.9, 1],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay,
      }}
      className={`absolute h-72 w-72 rounded-full blur-3xl opacity-30 ${color}`}
    />
  );
}

// Usage in a hero section:
<div className="relative overflow-hidden">
  <GradientBlob color="bg-blue-500" delay={0} />
  <GradientBlob color="bg-purple-500" delay={2} />
  <GradientBlob color="bg-emerald-500" delay={4} />
  {/* Content on top */}
</div>
```

---

## Respect prefers-reduced-motion

Always check the user's motion preference. Disable or reduce animations for accessibility.

**Use case**: Every project. This is not optional.

```tsx
import { useReducedMotion } from "framer-motion";

function AnimatedSection({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 40 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}
```

Or as a global check:

```tsx
// In a hook or utility
const prefersReduced = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// Use to conditionally disable animations
const animationProps = prefersReduced
  ? {}
  : { initial: { opacity: 0 }, animate: { opacity: 1 } };
```

Framer Motion also supports the `useReducedMotion()` hook natively, which returns `true` when the user prefers reduced motion. Use it in components to conditionally skip animations.
