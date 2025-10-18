import { useEffect, useRef } from "react";

interface UnicornStudioEmbedProps {
  projectId: string;
  className?: string;
}

declare global {
  interface Window {
    UnicornStudio: {
      init: () => void;
      isInitialized: boolean;
    };
  }
}

export function UnicornStudioEmbed({ projectId, className = "" }: UnicornStudioEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Unicorn Studio script
    if (!window.UnicornStudio) {
      window.UnicornStudio = { isInitialized: false, init: () => {} };
      
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
      script.onload = () => {
        if (!window.UnicornStudio.isInitialized) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
      };
      (document.head || document.body).appendChild(script);
    } else if (window.UnicornStudio.isInitialized) {
      // If already initialized, reinitialize for this component
      window.UnicornStudio.init();
    }
  }, []);

  return (
    <div
      ref={containerRef}
      data-us-project={projectId}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
