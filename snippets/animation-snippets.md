# Animation Code Snippets

## Framer Motion

### Staggered Children
```jsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(i => <motion.li variants={item} key={i} />)}
</motion.ul>
```

### Parallax Scroll
```jsx
const { scrollY } = useScroll();
const y = useTransform(scrollY, [0, 500], [0, -150]);

<motion.div style={{ y }}>Parallax content</motion.div>
```

### Exit Animation
```jsx
<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>
```

### 3D Card Tilt
```jsx
<motion.div
  whileHover={{
    rotateX: 5,
    rotateY: -5,
    transition: { duration: 0.3 }
  }}
  style={{ transformPerspective: 1000 }}
/>
```

### Gradient Blob
```jsx
// In Tailwind config, add:
animation: { blob: 'blob 7s infinite' }
keyframes: {
  blob: {
    '0%': { transform: 'translate(0px, 0px) scale(1)' },
    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
    '100%': { transform: 'translate(0px, 0px) scale(1)' }
  }
}

// Usage:
<div className="animate-blob bg-purple-500 blur-xl" />
```

### Scroll-Triggered Section Reveal
```jsx
<motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  Section content
</motion.section>
```

### Animated Counter
```jsx
const count = useMotionValue(0);
const rounded = useTransform(count, Math.round);

useEffect(() => {
  const animation = animate(count, 1000, { duration: 2 });
  return animation.stop;
}, []);

<motion.span>{rounded}</motion.span>
```

## GSAP Text Effects

### Character Reveal
```jsx
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const split = new SplitText(".headline", { type: "chars" });
gsap.from(split.chars, {
  y: 100,
  opacity: 0,
  stagger: 0.02,
  duration: 0.8,
  ease: "power4.out"
});
```

### Scroll-Triggered Text
```jsx
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

gsap.from(".section-title", {
  scrollTrigger: {
    trigger: ".section-title",
    start: "top 80%",
  },
  y: 50,
  opacity: 0,
  duration: 1
});
```

### Line-by-Line Reveal
```jsx
const split = new SplitText(".paragraph", { type: "lines" });
gsap.from(split.lines, {
  y: 30,
  opacity: 0,
  stagger: 0.1,
  duration: 0.6,
  ease: "power3.out"
});
```

### Typewriter Effect
```jsx
gsap.to(".typewriter", {
  text: "Hello, I'm a typewriter effect",
  duration: 2,
  ease: "none"
});
```

## CSS-Only Animations

### Shimmer Loading
```css
.shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Pulse Glow
```css
.pulse-glow {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5); }
  50% { box-shadow: 0 0 20px 10px rgba(59, 130, 246, 0); }
}
```

### Float Animation
```css
.float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```
