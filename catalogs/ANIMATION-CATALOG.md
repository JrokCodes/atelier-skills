# Animation Catalog

> Framer Motion, GSAP, and CSS animation recipes

## Framer Motion (Baseline)

### Staggered Children
```tsx
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
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
```tsx
const { scrollY } = useScroll();
const y = useTransform(scrollY, [0, 500], [0, -150]);
<motion.div style={{ y }}>Parallax content</motion.div>
```

### Scroll-Triggered Section Reveal
```tsx
<motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  Section content
</motion.section>
```

### 3D Card Tilt
```tsx
<motion.div
  whileHover={{ rotateX: 5, rotateY: -5, transition: { duration: 0.3 } }}
  style={{ transformPerspective: 1000 }}
/>
```

### Animated Counter
```tsx
const count = useMotionValue(0);
const rounded = useTransform(count, Math.round);
useEffect(() => {
  const animation = animate(count, 1000, { duration: 2 });
  return animation.stop;
}, []);
<motion.span>{rounded}</motion.span>
```

---

## GSAP (Baseline)

### Character Reveal
```tsx
const split = new SplitText(".headline", { type: "chars" });
gsap.from(split.chars, {
  y: 100, opacity: 0, stagger: 0.02, duration: 0.8, ease: "power4.out"
});
```

### Scroll-Triggered Text
```tsx
gsap.from(".section-title", {
  scrollTrigger: { trigger: ".section-title", start: "top 80%" },
  y: 50, opacity: 0, duration: 1
});
```

---

## CSS-Only (Baseline)

### Shimmer Loading
```css
.shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
```

### Gradient Blob
```css
@keyframes blob {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
}
```

---

## New Finds

<!-- Agent adds new animation discoveries below this line -->

### Footer Reveal (Fixed Underlay)
**Source:** ciridae.com (SOTD Feb 6, 2026)
**Animation Score:** 7.80/10

Footer is fixed at bottom, content scrolls away to reveal it. Zero JS required.

```tsx
// Layout structure
<div className="relative">
  {/* Main content with margin-bottom equal to footer height */}
  <main className="relative z-10 bg-background" style={{ marginBottom: '400px' }}>
    {/* All page content */}
  </main>
  
  {/* Fixed footer underneath */}
  <footer className="fixed bottom-0 left-0 right-0 z-0 h-[400px] bg-foreground text-background">
    {/* Footer content */}
  </footer>
</div>
```

**Framer Motion enhancement (optional parallax):**
```tsx
const { scrollYProgress } = useScroll();
const footerY = useTransform(scrollYProgress, [0.8, 1], [50, 0]);
const footerOpacity = useTransform(scrollYProgress, [0.8, 1], [0.8, 1]);

<motion.footer style={{ y: footerY, opacity: footerOpacity }}>
```

### Cards Stagger on Scroll
**Source:** ciridae.com
**Use:** Service cards, feature grids, blog listings

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
};

<motion.div 
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  className="grid grid-cols-1 md:grid-cols-3 gap-6"
>
  {cards.map((card, i) => (
    <motion.div key={i} variants={cardVariants} className="p-6 rounded-xl border">
      {/* Card content */}
    </motion.div>
  ))}
</motion.div>
```

### Section Label Reveal
**Source:** ciridae.com numbering system ("01 - WD")

```tsx
const labelVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

<motion.div 
  variants={labelVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="flex items-center gap-2 text-sm tracking-widest text-muted-foreground uppercase"
>
  <span>01</span>
  <span className="w-4 h-px bg-current" />
  <span>SERVICES</span>
</motion.div>
```
