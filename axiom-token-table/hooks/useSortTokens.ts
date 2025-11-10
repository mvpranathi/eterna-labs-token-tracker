"use client";
import { useState, useMemo } from "react";

export function useSortTokens(tokens: any[]) {
  const [sortKey, setSortKey] = useState<"name" | "price" | "change">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const toggleSort = (key: "name" | "price" | "change") => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedTokens = useMemo(() => {
    return [...tokens].sort((a, b) => {
      let aValue = a[sortKey];
      let bValue = b[sortKey];

      if (typeof aValue === "string") aValue = aValue.toLowerCase();
      if (typeof bValue === "string") bValue = bValue.toLowerCase();

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [tokens, sortKey, sortOrder]);

  return { sortedTokens, sortKey, sortOrder, toggleSort };
}
