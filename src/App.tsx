import { useState } from "react";
import { Container, Title, Card } from "@mantine/core";

import { TableToolbar } from "./components/Table/TableToolbar";
import {
  OrdersTable,
  ViewDetailsAction,
  StatusBadge,
} from "./components/Table/OrdersTable";
import { TableFooterInfo } from "./components/Table/TableFooterInfo";
import { OrderDetailsModal } from "./components/Modal/OrderDetailsModal";
import { LoadingState } from "./components/ui/state/LoadingState";
import { ErrorState } from "./components/ui/state/ErrorState";

import { useOrdersTable } from "./hooks/useOrdersTable";
import { ORDER_COLUMNS } from "./constants/orders";
import type { Order } from "./types/order";

export default function App() {
  const {
    loading,
    error,
    processed,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sortBy,
    sortDir,
    changeSort,
    toggleDir,
    page,
    setPage,
    paged,
    pageSize,
  } = useOrdersTable();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <Container size="xl" px={{ base: "sm", sm: "md" }} py="md">
      <Title order={1} mb="md" size="h3">
        Orders Dashboard
      </Title>

      <Card shadow="sm" p={{ base: "sm", sm: "lg" }} radius="md" withBorder>
        <TableToolbar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          sortBy={sortBy}
          onSortChange={changeSort}
          sortDir={sortDir}
          onSortDirToggle={toggleDir}
        />

        <OrdersTable<Order>
          records={paged}
          columns={ORDER_COLUMNS}
          totalRecords={processed.length}
          recordsPerPage={pageSize}
          page={page}
          onPageChange={setPage}
          noRecordsText="No orders match your filters"
          renderBadge={(record) => <StatusBadge status={record.status} />}
          renderRowAction={(record) => (
            <ViewDetailsAction
              onClick={() => setSelectedOrder(record)}
              label={`View ${record.id}`}
            />
          )}
        />

        <TableFooterInfo
          total={processed.length}
          page={page}
          pageSize={pageSize}
          entityName="orders"
        />
      </Card>

      <OrderDetailsModal
        order={selectedOrder}
        opened={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </Container>
  );
}
