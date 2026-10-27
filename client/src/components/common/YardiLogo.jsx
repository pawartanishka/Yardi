import React from 'react';

/**
 * Official Yardi Corporate Brand Logo
 * Matches the official bold geometric 'Y' emblem with dual-trapezoid chevron
 * and italicized bold uppercase 'YARDI' typography in corporate Yardi Blue (#0070CE).
 *
 * Supports:
 * - variant: "blue" | "white"
 * - iconOnly: boolean (shows only the iconic 'Y' emblem for collapsed states)
 */
export default function YardiLogo({
  className = "h-8",
  variant = "blue",
  iconOnly = false
}) {
  const fillColor = variant === "white" ? "#FFFFFF" : "#0070CE";
  const emblemColor = variant === "white" ? "#FFFFFF" : "#0070CE";

  if (iconOnly) {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-auto select-none"
        >
          <g id="yardi-emblem-icon">
            {/* Left vertical-angled chevron bar */}
            <path
              d="M15 18 H38 V48 L15 62 Z"
              fill={emblemColor}
            />
            {/* Main diagonal forward-leaning slash forming the Y */}
            <path
              d="M78 18 L15 82 H38 L96 32 Z"
              fill={emblemColor}
            />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center ${className}`}>
      <svg
        viewBox="0 0 380 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto select-none"
      >
        {/* Yardi Dynamic 'Y' Emblem */}
        <g id="yardi-emblem">
          {/* Left vertical-angled chevron bar */}
          <path
            d="M15 18 H38 V48 L15 62 Z"
            fill={emblemColor}
          />
          {/* Main diagonal forward-leaning slash forming the Y */}
          <path
            d="M78 18 L15 82 H38 L96 32 Z"
            fill={emblemColor}
          />
        </g>

        {/* Wordmark: YARDI */}
        <g id="yardi-wordmark" fill={fillColor}>
          {/* Y */}
          <path d="M102 18 H122 L137 48 L152 18 H172 L147 60 V82 H127 V60 Z" />
          {/* A */}
          <path d="M174 82 L194 18 H214 L232 82 H213 L209 68 H195 L191 82 Z M198 54 H206 L202 34 Z" />
          {/* R */}
          <path d="M236 18 H264 C278 18 285 25 285 37 C285 46 279 52 270 55 L287 82 H266 L252 58 H250 V82 H236 Z M250 46 H262 C267 46 271 43 271 37 C271 31 267 29 262 29 H250 Z" />
          {/* D */}
          <path d="M290 18 H314 C330 18 340 29 340 50 C340 71 330 82 314 82 H290 Z M304 70 H313 C322 70 326 62 326 50 C326 38 322 30 313 30 H304 Z" />
          {/* I */}
          <path d="M346 18 H362 V82 H346 Z" />
        </g>
      </svg>
    </div>
  );
}
