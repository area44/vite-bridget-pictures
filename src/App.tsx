import { useRef } from "react";
import "@/App.css";
import { imageSources } from "@/constants/images";
import { useMouseGallery } from "@/hooks/useMouseGallery";

function App() {
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useMouseGallery(imagesRef, {
    trailLength: 6,
    distanceThreshold: 5,
    rotationRange: 12,
  });

  return (
    <div className="gallery">
      {imageSources.map((src, i) => (
        <img
          key={src}
          ref={(el) => {
            imagesRef.current[i] = el;
          }}
          className="image"
          data-status="inactive"
          src={src}
          alt={`Gallery Image ${i + 1}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default App;
