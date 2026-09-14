import { useEffect, useMemo, useState } from "react";

export function usePagination<T>(
  items: T[],
  pageSize: number,
  resetKeys: unknown[] = []
) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, resetKeys);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  return {
    page,
    setPage,
    paged,
    totalPages,
    startIndex: (page - 1) * pageSize,
  };
}
