import { useEffect, useState } from "react"

// Keep track of window width
const useWindowWidth = (): number => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {setWidth(window.innerWidth)}
    addEventListener('resize', handleResize);

    return () => {
      removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
}

export default useWindowWidth;