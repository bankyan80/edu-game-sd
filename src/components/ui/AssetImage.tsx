"use client";

import { useState } from "react";

interface AssetImageProps {
  src: string;
  alt: string;
  category: string;
  className?: string;
  fallbackEmoji?: string;
  fallbackLabel?: string;
  "data-sumber"?: string;
}

function Placeholder3D({
  emoji,
  label,
  className,
}: {
  emoji: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      {/* Soft ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.25) 0%, transparent 60%)",
        }}
      />

      {/* Bottom shadow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 100%)",
        }}
      />

      {/* Emoji */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="drop-shadow-lg"
          style={{ fontSize: "3.5rem", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}
        >
          {emoji}
        </span>
      </div>

      {/* Label */}
      <div className="absolute bottom-2 left-0 right-0 text-center">
        <span
          className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold text-white/90"
          style={{
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(4px)",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export default function AssetImage({
  src,
  alt,
  category,
  className = "",
  fallbackEmoji = "🏠",
  fallbackLabel = "Gambar perlu ditambahkan",
  "data-sumber": dataSumber,
}: AssetImageProps) {
  const [imgError, setImgError] = useState(false);

  if (!src || imgError) {
    return (
      <Placeholder3D
        emoji={fallbackEmoji}
        label={fallbackLabel}
        className={className}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setImgError(true)}
      data-sumber={dataSumber}
    />
  );
}
