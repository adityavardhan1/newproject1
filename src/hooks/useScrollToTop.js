import { useEffect } from 'react';

const useScrollToTop = () => {
  useEffect(() => {
    // Small delay to ensure the component is fully mounted
    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);
};

export default useScrollToTop; 