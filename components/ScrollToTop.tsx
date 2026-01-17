"use client";

import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 md:bottom-12 md:left-12 p-3 bg-green-700 text-white rounded-full shadow-lg hover:bg-green-800 transition-all duration-300 transform hover:scale-110 active:scale-95 z-50 flex items-center justify-center group"
          aria-label="Scroll to top"
        >
          {/* Professional Arrow Icon */}
          <svg
            className="w-6 h-6 md:w-7 md:h-7 group-hover:-translate-y-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </>
  );
}
