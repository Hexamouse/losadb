// hooks/useMercenaries.js
'use client';
import { useState, useEffect } from "react";

const useMercenaries = () => {
  const [mercenaries, setMercenaries] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const fetchMercenaries = async () => {
      const response = await fetch("/api/Mercenary");
      const data = await response.json();
      setMercenaries(data);
    };

    fetchMercenaries();
    setIsMounted(true);
  }, []);

  return { mercenaries, isMounted };
};

export default useMercenaries;
