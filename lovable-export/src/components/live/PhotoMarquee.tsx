import { WarmImg, IMAGES, IMAGE_DIMS } from "@/lib/images";

export function PhotoMarquee() {
  return (
    <div className="photo-marquee-wrap py-4" aria-hidden>
      <div className="photo-marquee">
        {IMAGES.marquee.map((src, i) => (
          <div key={i} className="photo-marquee-item">
            <WarmImg
              src={src}
              alt=""
              width={IMAGE_DIMS.avatar[0]}
              height={IMAGE_DIMS.avatar[1]}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-md"
            />
          </div>
        ))}
        {IMAGES.marquee.map((src, i) => (
          <div key={`dup-${i}`} className="photo-marquee-item">
            <WarmImg
              src={src}
              alt=""
              width={IMAGE_DIMS.avatar[0]}
              height={IMAGE_DIMS.avatar[1]}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
