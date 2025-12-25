import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "../lib/utils";

export const InteractiveScrollArea = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const checkScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = viewport;
      setShowIndicator(scrollTop + clientHeight < scrollHeight - 5);
    };

    checkScroll();
    viewport.addEventListener("scroll", checkScroll);
    return () => viewport.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToBottom = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <ScrollAreaPrimitive.Root
      className={cn("relative w-full overflow-hidden", className)}
    >
      <ScrollAreaPrimitive.Viewport ref={viewportRef} className="w-full h-full">
        {children}
      </ScrollAreaPrimitive.Viewport>

      <ScrollAreaPrimitive.Scrollbar
        orientation="vertical"
        className="w-[6px] bg-zinc-200 rounded-full"
      >
        <ScrollAreaPrimitive.Thumb className="bg-zinc-400 rounded-full" />
      </ScrollAreaPrimitive.Scrollbar>

      {showIndicator && (
        <div
          onClick={scrollToBottom}
          className="absolute bottom-4 cursor-pointer lg:bottom-8 left-1/2 p-2 bg-zinc-200/80 rounded-full -translate-x-1/2 animate-bounce"
        >
          <ChevronDown className="text-blue-400 lg:text-blue-500 opacity-80" />
        </div>
      )}
    </ScrollAreaPrimitive.Root>
  );
};
