// hooks/useFilters.js
'use client';
import { useState } from "react";

const useFilters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAttackType, setSelectedAttackType] = useState("");

  const filterMercenaries = (mercenaries) => {
    return mercenaries.filter((mercenary) => {
      const matchesSearchTerm =
        mercenary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mercenary.id.toString().includes(searchTerm);

      const matchesCategory = selectedCategory
        ? mercenary.type === selectedCategory
        : true;
      const matchesAttackType = selectedAttackType
        ? mercenary.AttackType === selectedAttackType
        : true;

      return matchesSearchTerm && matchesCategory && matchesAttackType;
    });
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedAttackType,
    setSelectedAttackType,
    filterMercenaries,
  };
};

export default useFilters;
