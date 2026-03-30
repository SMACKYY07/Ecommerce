import { useState } from 'react';

export function ProductGallery({ images, alt }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="details-gallery">
      <div className="details-main-img">
        <img src={activeImage} alt={alt} />
      </div>
      <div className="details-thumbs">
        {images.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveImage(image)}
            className={`details-thumb ${activeImage === image ? 'active' : ''}`}
          >
            <img src={image} alt={alt} />
          </button>
        ))}
      </div>
    </div>
  );
}
