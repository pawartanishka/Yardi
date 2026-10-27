import React from 'react';

/**
 * Official Yardi Corporate Brand Logo SVG
 * Matches the official bold geometric 'Y' emblem with dual-trapezoid chevron
 * and italicized bold uppercase 'YARDI' typography in corporate Yardi Blue (#0066CC / #0070CE).
 */
export default function YardiLogo({ className = "h-8", variant = "blue" }) {
  const fillColor = variant === "white" ? "#FFFFFF" : "#0070CE";
  const emblemColor = variant === "white" ? "#FFFFFF" : "#0070CE";

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 320 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto select-none"
      >
        {/* Yardi Dynamic 'Y' Emblem */}
        <g id="yardi-emblem">
          {/* Left vertical-angled chevron bar */}
          <path
            d="M20 18 H38 V48 L20 60 Z"
            fill={emblemColor}
          />
          {/* Main diagonal forward-leaning slash forming the Y */}
          <path
            d="M74 18 L20 82 H38 L92 32 Z"
            fill={emblemColor}
          />
        </g>

        {/* Wordmark: YARDI */}
        <g id="yardi-wordmark" fill={fillColor}>
          {/* Y */}
          <path d="M106 18 H125 L138 48 L152 18 H170 L146 58 V82 H127 V58 Z" />
          {/* A */}
          <path d="M174 82 L193 18 H214 L232 82 H213 L209 67 H194 L191 82 H174 Z M197 53 H206 L202 33 Z" />
          {/* R */}
          <path d="M236 18 H263 C275 18 282 24 282 35 C282 44 276 50 268 53 L285 82 H265 L251 56 H249 V82 H236 V18 Z M249 44 H261 C265 44 269 41 269 36 C269 31 265 29 261 29 H249 V44 Z" />
          {/* D */}
          <path d="M287 18 H310 C324 18 333 28 333 50 C333 72 324 82 310 82 H287 V18 Z M300 70 H308 C316 70 320 63 320 50 C320 37 316 30 308 30 H300 V70 Z" transform="translate(-5, 0)" />
          {/* I */}
          <path d="M336 18 H349 V82 H336 Z" transform="translate(-10, 0)" />
        </g>
      </svg>
    </div>
  );
}
