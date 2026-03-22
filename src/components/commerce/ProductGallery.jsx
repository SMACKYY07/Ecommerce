import { useState } from 'react';
import { cn } from '../../utils/cn';

export function ProductGallery({ images, alt }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="grid gap-4 lg:grid-cols-[92px_1fr]">
      <div className="order-2 flex gap-3 overflow-auto lg:order-1 lg:flex-col">
        {images.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveImage(image)}
            className={cn(
              'overflow-hidden rounded-[1.35rem] border border-black/5 bg-white/70 dark:border-white/10 dark:bg-white/5',
              activeImage === image && 'ring-2 ring-emerald-500',
            )}
          >
            <img src={image} alt={alt} className="h-20 w-20 object-cover lg:h-24 lg:w-24" />
          </button>
        ))}
      </div>
      <div className="order-1 overflow-hidden rounded-[2rem] border border-black/5 bg-black/5 dark:border-white/10 dark:bg-white/5">
        <img src={activeImage} alt={alt} className="h-full min-h-[26rem] w-full object-cover" />
      </div>
    </div>
  );
}
