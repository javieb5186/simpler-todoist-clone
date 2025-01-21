import { useEffect } from "react";

type ClickAwayCallback = (event: Event) => void;

function useClickAway<T extends HTMLElement>(
  ref: React.RefObject<T>,
  callback: ClickAwayCallback,
): void {
  useEffect(() => {
    function handleClick(event: Event) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    }
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, callback]);
}

export default useClickAway;
