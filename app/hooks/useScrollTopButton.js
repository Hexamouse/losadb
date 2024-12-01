// hooks/useScrollTopButton.js

import { useState, useEffect } from "react";

const useScrollTopButton = () => {
  const [showScrollTopBtn, setShowScrollTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTopBtn(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return showScrollTopBtn;
};

export default useScrollTopButton;