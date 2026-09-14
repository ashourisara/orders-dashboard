import { useState } from "react";
import { useOrders, useFilteredOrders } from "./orders";
import { usePagination } from "./pagination";
import { useSort } from "./sort";
import { ORDER_SORT_OPTIONS } from "../constants/orders";
import type { Order } from "../types/order";

const PAGE_SIZE = 10;

export function useOrdersTable() {
  const { orders, loading, error } = useOrders();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const sort = useSort<Order>(ORDER_SORT_OPTIONS);

  const processed = useFilteredOrders(
    orders,
    search,
    statusFilter,
    sort.sortBy,
    sort.sortDir
  );

  const pagination = usePagination(processed, PAGE_SIZE, [
    search,
    statusFilter,
    sort.sortBy,
    sort.sortDir,
  ]);

  return {
    loading,
    error,
    orders,
    processed,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    ...sort,
    ...pagination,
    pageSize: PAGE_SIZE,
  };
}
