import React, { useState } from "react";
import Image from "next/image";

export const ImageWithFallback = (props: {
  src: string;
  fallbackSrc: string;
  alt: string;
  height: string;
  width: string;
}) => {
  const { src, fallbackSrc, alt, height, width } = props;
  const [imgSrc, setImgSrc] = useState(src);

  if (!src.startsWith("http")) setImgSrc(fallbackSrc);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      height={parseInt(height)}
      width={parseInt(width)}
      onError={() => {
        console.log("errored");
        setImgSrc(fallbackSrc);
      }}
    />
  );
};
