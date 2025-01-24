import React, { useEffect, useRef } from "react";

interface SVGPixelatorProps {
  svgString: string;
  gridSize?: number;
  dotSize?: number;
}

const SVGPixelator: React.FC<SVGPixelatorProps> = ({
  svgString,
  gridSize = 8,
  dotSize = 6,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgString || !containerRef.current) return;

    // Create a temporary div to parse SVG dimensions
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = svgString;
    const originalSvg = tempDiv.querySelector("svg");

    if (!originalSvg) return;

    // Get original SVG dimensions
    const width = Number.parseInt(originalSvg.getAttribute("width") || "446");
    const height = Number.parseInt(originalSvg.getAttribute("height") || "476");

    // Create canvas for hit testing
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Convert SVG to path
    const svgUrl = "data:image/svg+xml," + encodeURIComponent(svgString);
    const img = new Image();
    img.onload = () => {
      // Draw image to canvas
      ctx.drawImage(img, 0, 0);

      // Create new SVG element
      const pixelatedSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      pixelatedSvg.setAttribute("width", width.toString());
      pixelatedSvg.setAttribute("height", height.toString());

      // Create dots where points are not transparent
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          const imageData = ctx.getImageData(
            x + gridSize / 2,
            y + gridSize / 2,
            1,
            1
          ).data;

          // Check if pixel is not transparent
          if (imageData[3] > 0) {
            const dot = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "rect"
            );
            dot.setAttribute("x", (x + (gridSize - dotSize) / 2).toString());
            dot.setAttribute("y", (y + (gridSize - dotSize) / 2).toString());
            dot.setAttribute("width", dotSize.toString());
            dot.setAttribute("height", dotSize.toString());
            dot.setAttribute("fill", "#000");
            pixelatedSvg.appendChild(dot);
          }
        }
      }

      // Clear container and append new SVG
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        containerRef.current.appendChild(pixelatedSvg);
      }
    };
    img.src = svgUrl;

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [svgString, gridSize, dotSize]);

  return <div ref={containerRef} />;
};

export default SVGPixelator;
