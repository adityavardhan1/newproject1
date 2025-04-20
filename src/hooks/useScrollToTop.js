import { useEffect } from 'react';

const useScrollToTop = () => {
  useEffect(() => {
    // Immediate scroll
    window.scrollTo(0, 0);
    
    // Smooth scroll after a delay
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);
};

export default useScrollToTop; 