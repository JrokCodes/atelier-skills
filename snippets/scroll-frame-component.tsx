import { useRef, useEffect, useState, useCallback } from "react";

interface ScrollFrameProps {
  /** Total number of frames in the sequence */
  frameCount: number;
  /** Directory path containing the frame images (e.g., "/frames/hero") */
  frameDir: string;
  /** Height of the scroll area in viewport units (controls scroll speed) */
  height?: string;
  /** File extension for frame images */
  extension?: string;
  /** Zero-pad length for frame filenames (e.g., 4 = "0001.webp") */
  padLength?: number;
  /** Loading indicator component */
  loadingSlot?: React.ReactNode;
}

export function ScrollFrame({
  frameCount,
  frameDir,
  height = "300vh",
  extension = "webp",
  padLength = 4,
  loadingSlot,
}: ScrollFrameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number>(0);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const prefersReduced = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Build frame filename
  const framePath = useCallback(
    (index: number) => {
      const padded = String(index).padStart(padLength, "0");
      const dir = frameDir.endsWith("/") ? frameDir : `${frameDir}/`;
      return `${dir}${padded}.${extension}`;
    },
    [frameDir, padLength, extension]
  );

  // Preload all frames
  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(frameCount);

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => {
        if (cancelled) return;
        loadedCount++;
        setProgress(Math.round((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          framesRef.current = images;
          setLoaded(true);
        }
      };
      img.onerror = () => {
        if (cancelled) return;
        loadedCount++;
        setProgress(Math.round((loadedCount / frameCount) * 100));
      };
      images[i] = img;
    }

    return () => {
      cancelled = true;
    };
  }, [frameCount, framePath]);

  // Draw frame to canvas
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const img = framesRef.current[index];
      if (!canvas || !ctx || !img) return;

      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Cover-fit the image
      const scale = Math.max(
        canvas.width / img.naturalWidth,
        canvas.height / img.naturalHeight
      );
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;

      ctx.drawImage(img, x, y, w, h);
    },
    []
  );

  // Scroll handler
  useEffect(() => {
    if (!loaded || !containerRef.current) return;

    // If user prefers reduced motion, show middle frame and skip scroll binding
    if (prefersReduced.current) {
      drawFrame(Math.floor(frameCount / 2));
      return;
    }

    const container = containerRef.current;

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const scrollable = rect.height - window.innerHeight;
        if (scrollable <= 0) return;

        const scrolled = Math.max(0, -rect.top);
        const ratio = Math.min(1, Math.max(0, scrolled / scrollable));
        const frameIndex = Math.min(
          frameCount - 1,
          Math.floor(ratio * frameCount)
        );

        drawFrame(frameIndex);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Draw initial frame

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [loaded, frameCount, drawFrame]);

  // Handle resize
  useEffect(() => {
    if (!loaded) return;

    const onResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      // Re-trigger scroll handler to redraw at correct size
      window.dispatchEvent(new Event("scroll"));
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [loaded]);

  return (
    <div ref={containerRef} style={{ height }} className="relative">
      <div className="sticky top-0 h-screen w-full">
        {!loaded && (
          <div className="flex h-full w-full items-center justify-center bg-neutral-950">
            {loadingSlot ?? (
              <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-white" />
                <span className="text-sm text-neutral-500 tabular-nums">
                  {progress}%
                </span>
              </div>
            )}
          </div>
        )}
        <canvas
          ref={canvasRef}
          className={`h-full w-full ${loaded ? "block" : "hidden"}`}
        />
      </div>
    </div>
  );
}
