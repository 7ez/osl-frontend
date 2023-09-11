import { useState } from "react";
import Image from "next/image";

export const ServerImage = (props: {
  serverLogo: string;
  serverUrl: string;
  alt: string;
  height: string;
  width: string;
}) => {
  const { serverLogo, serverUrl, alt, width, height } = props;

  const resolveLogo = () => {
    let strippedUrl = serverUrl.includes("//")
      ? serverUrl.split("//")[1]
      : serverUrl;
    strippedUrl = strippedUrl.endsWith("/")
      ? strippedUrl.substring(0, strippedUrl.length - 1)
      : strippedUrl;

    const possibleIconUrls = [
      `https://osu.${strippedUrl}/assets/img/logo.png`,
      `https://osu.${strippedUrl}/assets/img/icon.png`,
      `https://${strippedUrl}/assets/img/logo.png`,
      `https://${strippedUrl}/assets/img/icon.png`,
      `https://${strippedUrl}/static/images/favicon-32x32.png`,
      `https://${strippedUrl}/favicon.ico`,
    ];
    let gotLogo = false;

    possibleIconUrls.forEach(async (imageUrl) => {
      try {
        const imgFetch = await fetch(imageUrl, {
          method: "HEAD",
        });
        if (imgFetch.ok && !gotLogo) {
          setImgSrc(imageUrl);
          gotLogo = true;
        }
      } catch (_err) {}
    });
    if (!gotLogo) setImgSrc("/fallback.png");
  };

  const logoUrl = serverLogo.startsWith("http")
    ? serverLogo
    : `https://${serverLogo}`;

  const [imgSrc, setImgSrc] = useState(logoUrl);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      height={parseInt(height)}
      width={parseInt(width)}
      onError={() => {
        resolveLogo();
      }}
    />
  );
};
