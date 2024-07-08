"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export const ServerImage = (props: {
  serverLogo: string;
  serverUrl: string;
  alt: string;
  height: number;
  width: number;
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
      `https://osu.${strippedUrl}/static/images/favicon-32x32.png`,
      `https://${strippedUrl}/static/images/logos/logo_256x.png`,
      `https://${strippedUrl}/static/images/logos/logo.png`,
      `https://${strippedUrl}/assets/img/logo.png`,
      `https://${strippedUrl}/assets/img/icon.png`,
      `https://${strippedUrl}/static/images/favicon-32x32.png`,
      `https://${strippedUrl}/static/favicon/favicon.ico`,
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

  const hasLogoUrl = serverLogo && serverLogo.length >= 0;
  const logoUrl = serverLogo.startsWith("http")
    ? serverLogo
    : `https://${serverLogo}`;

  const [imgSrc, setImgSrc] = useState<string>(hasLogoUrl ? logoUrl : "/fallback.png");

  useEffect(() => {
    if (!hasLogoUrl) {
      // Trying to resolve the logo if no logo url has been defined
      resolveLogo();
    }
  }, []); //execute only once

  return (
    <Image
      src={imgSrc}
      alt={alt}
      height={height}
      width={width}
      className="object-scale-down rounded-sm"
      onError={() => {
        resolveLogo();
      }}
    />
  );
};
