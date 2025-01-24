import { useCallback, useEffect, useRef } from "react";

interface Props {
  onScrollToBottom(): void;
}

export function useInfiniteScroll<Element extends HTMLElement>(props: Props) {
  const { onScrollToBottom } = props;

  const elementRef = useRef<Element | null>(null);
  const handleScroll = useCallback(() => {
    if (elementRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = elementRef.current;

      // Check if scrolled to bottom
      if (scrollTop + clientHeight >= scrollHeight) {
        onScrollToBottom();
      }
    }
  }, []);

  useEffect(() => {
    const element = elementRef.current;

    if (element) {
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  return elementRef;
}
