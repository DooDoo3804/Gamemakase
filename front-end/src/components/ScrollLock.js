import { useCallback } from "react";

const useBodyScrollLock = () => {
  const lockScroll = useCallback(() => {
    // for IOS safari
    let scrollPosition = window.pageYOffset;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = "100%";
    return scrollPosition;
  }, []);

  const openScroll = useCallback((scrollPosition) => {
    // for IOS safari
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("position");
    document.body.style.removeProperty("top");
    document.body.style.removeProperty("width");
    window.scrollTo(0, scrollPosition);
  }, []);

  return { lockScroll, openScroll };
};

export default useBodyScrollLock;
