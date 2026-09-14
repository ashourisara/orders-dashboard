import { useState } from "react";
import type { SortOption, SortDirection } from "../types/order";

export function useSort<T>(options: SortOption<T>[]) {
  const [sortBy, setSortBy] = useState<SortOption<T> | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>("desc");

  const changeSort = (value: string | null) => {
    const opt = options.find((o) => o.value === value) ?? null;
    setSortBy(opt);
    if (opt) setSortDir(opt.defaultDir);
  };

  const toggleDir = () => setSortDir((d) => (d === "asc" ? "desc" : "asc"));

  return { sortBy, sortDir, changeSort, toggleDir };
}
