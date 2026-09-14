import { useEffect, useMemo, useState } from "react";
import type { Order, SortOption, SortDirection } from "../types/order";

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/orders.json")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch orders");
        return r.json();
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { orders, loading, error };
}

export function useFilteredOrders(
  orders: Order[],
  search: string,
  statusFilter: string | null,
  sortBy: SortOption<Order> | null,
  sortDir: SortDirection
) {
  return useMemo(() => {
    const query = search.trim().toLowerCase();
    let result = orders.filter((o) => {
      const matchesSearch =
        !query ||
        o.id.toLowerCase().includes(query) ||
        o.customer.toLowerCase().includes(query);
      const matchesStatus = !statusFilter || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    if (sortBy) {
      const dir = sortDir === "asc" ? 1 : -1;
      result = [...result].sort((a, b) => sortBy.compare(a, b) * dir);
    }
    return result;
  }, [orders, search, statusFilter, sortBy, sortDir]);
}
