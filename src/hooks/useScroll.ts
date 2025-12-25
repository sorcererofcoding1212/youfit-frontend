import { useRef } from "react";

export const useScroll = () => {
  const scrollRef = useRef<null | HTMLDivElement>(null);

  const scrollToArea = () => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return { scrollRef, scrollToArea };
};
