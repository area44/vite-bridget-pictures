import { useEffect, useRef } from "react";
import "@/App.css";

function App() {
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const globalIndex = useRef(0);
  const last = useRef({ x: 0, y: 0 });

  const imageSources = [
    "https://images.unsplash.com/photo-1663583513676-9f6361cd859d?ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80",
    "https://images.unsplash.com/photo-1663530294185-5af3692326c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1506&q=80",
    "https://images.unsplash.com/photo-1663579111009-863bc978c78e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1663492412083-17bfcad3c533?ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80",
    "https://images.unsplash.com/photo-1663571473113-d3fc49bbe775?ixlib=rb-1.2.1&auto=format&fit=crop&w=986&q=80",
    "https://images.unsplash.com/photo-1663431263243-ef4aa402afc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80",
    "https://images.unsplash.com/photo-1663330082092-11fa01e1ee8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80",
    "https://images.unsplash.com/photo-1663450806250-da193dc36368?ixlib=rb-1.2.1&auto=format&fit=crop&w=1149&q=80",
    "https://images.unsplash.com/photo-1663352248740-645afa021c9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80",
    "https://images.unsplash.com/photo-1663431905837-09cf339461ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=2207&q=80",
  ];

  useEffect(() => {
    const activate = (image: HTMLImageElement, x: number, y: number) => {
      image.style.left = `${x}px`;
      image.style.top = `${y}px`;
      image.style.zIndex = String(globalIndex.current);
      image.dataset.status = "active";
      last.current = { x, y };
    };

    const distanceFromLast = (x: number, y: number) =>
      Math.hypot(x - last.current.x, y - last.current.y);

    const handleOnMove = (x: number, y: number) => {
      if (distanceFromLast(x, y) > window.innerWidth / 20) {
        const images = imagesRef.current;
        const lead = images[globalIndex.current % images.length];
        const tail =
          images[(globalIndex.current - 5 + images.length) % images.length];

        if (lead) activate(lead, x, y);
        if (tail) tail.dataset.status = "inactive";

        globalIndex.current++;
      }
    };

    const handleMouseMove = (e: MouseEvent) =>
      handleOnMove(e.clientX, e.clientY);

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
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
  }, []);

  return (
    <div className="gallery">
      {imageSources.map((src, i) => {
        const localIndex = i;
        return (
          <img
            key={src}
            ref={(el) => {
              const imageElement = el;
              imagesRef.current[localIndex] = imageElement;
            }}
            className="image"
            data-status="inactive"
            src={src}
            alt={`Gallery ${localIndex + 1}`}
          />
        );
      })}

    </div>
  );
}

export default App;
