import { type RefObject, useEffect, useRef } from "react";

interface UseMouseGalleryOptions {
  trailLength?: number;
  distanceThreshold?: number;
  rotationRange?: number;
}

export const useMouseGallery = (
  imagesRef: RefObject<(HTMLImageElement | null)[]>,
  options: UseMouseGalleryOptions = {}
) => {
  const {
    trailLength = 5,
    distanceThreshold = 20, // percentage of window width
    rotationRange = 15,
  } = options;

  const globalIndex = useRef(0);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const activate = (image: HTMLImageElement, x: number, y: number) => {
      const rotation = (Math.random() - 0.5) * rotationRange * 2;

      image.style.left = `${x}px`;
      image.style.top = `${y}px`;
      image.style.zIndex = String(globalIndex.current);
      image.style.setProperty("--rotation", `${rotation}deg`);
      image.dataset.status = "active";

      last.current = { x, y };
    };

    const distanceFromLast = (x: number, y: number) =>
      Math.hypot(x - last.current.x, y - last.current.y);

    const handleOnMove = (x: number, y: number) => {
      const threshold = window.innerWidth / (100 / distanceThreshold);

      if (distanceFromLast(x, y) > threshold) {
        const images = imagesRef.current;
        if (!images) return;

        const lead = images[globalIndex.current % images.length];
        const tail =
          images[
            (globalIndex.current - trailLength + images.length) % images.length
          ];

        if (lead) activate(lead, x, y);
        if (tail) tail.dataset.status = "inactive";

        globalIndex.current++;
      }
    };

    const handleMouseMove = (e: MouseEvent) =>
      handleOnMove(e.clientX, e.clientY);

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) handleOnMove(touch.clientX, touch.clientY);
    };

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [imagesRef, trailLength, distanceThreshold, rotationRange]);

  return { globalIndex };
};
