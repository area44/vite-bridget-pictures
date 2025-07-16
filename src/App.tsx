import { type KeyboardEvent, useState } from "react";
import "@/App.css";

function App() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleImageClick = (index: number | null) => {
    setActiveIndex(index);
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLImageElement>,
    index: number
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault(); // Prevent page scroll on Space
      handleImageClick(index);
    }
  };

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

  return (
    <div className="gallery">
      {imageSources.map((src, index) => (
        <img
          key={src}
          className="image"
          data-index={index}
          data-status={activeIndex === index ? "active" : "inactive"}
          src={src}
          alt={`Gallery ${index + 1}`}
          onClick={() => handleImageClick(index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
}

export default App;
