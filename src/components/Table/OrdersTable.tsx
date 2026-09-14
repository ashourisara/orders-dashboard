import { DataTable, type DataTableColumn } from "mantine-datatable";
import { ActionIcon, Badge, Tooltip, Box } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { STATUS_COLORS } from "../../constants/orders";
import { useIsMobile } from "../../hooks/useMediaQuery";

export interface OrdersTableProps<T extends { id: string | number }> {
  records: T[];
  columns: DataTableColumn<T>[];
  renderRowAction?: (record: T) => ReactNode;
  totalRecords: number;
  recordsPerPage: number;
  page: number;
  onPageChange: (page: number) => void;
  noRecordsText?: string;
  minHeight?: number;
  renderBadge?: (record: T) => ReactNode;
  /** Columns to hide on mobile — accessor names */
  mobileHiddenColumns?: string[];
}

export function OrdersTable<T extends { id: string | number }>({
  records,
  columns,
  renderRowAction,
  totalRecords,
  recordsPerPage,
  page,
  onPageChange,
  noRecordsText = "No records found",
  minHeight = 200,
  renderBadge,
  mobileHiddenColumns = [],
}: OrdersTableProps<T>) {
  const isMobile = useIsMobile();

  const visibleColumns = isMobile
    ? columns.filter((c) => !mobileHiddenColumns.includes(String(c.accessor)))
    : columns;

  const finalColumns: DataTableColumn<T>[] = [
    ...visibleColumns.map((col) =>
      renderBadge && col.accessor === "status"
        ? { ...col, render: renderBadge }
        : col
    ),
    ...(renderRowAction
      ? [
          {
            accessor: "actions",
            title: "",
            width: 48,
            textAlign: "center" as const,
            render: (record: T) => renderRowAction(record),
          },
        ]
      : []),
  ];

  return (
    <Box style={{ overflowX: "auto" }}>
      <DataTable
        columns={finalColumns}
        records={records}
        highlightOnHover
        striped
        withTableBorder
        withColumnBorders
        minHeight={isMobile ? 160 : minHeight}
        totalRecords={totalRecords}
        recordsPerPage={recordsPerPage}
        page={page}
        onPageChange={onPageChange}
        noRecordsText={noRecordsText}
        verticalSpacing={isMobile ? "xs" : "sm"}
        horizontalSpacing={isMobile ? "xs" : "md"}
        fz={isMobile ? "xs" : "sm"}
        paginationSize={isMobile ? "sm" : "md"}
        paginationText={
          isMobile
            ? ({ from, to, totalRecords: t }) => `${from}–${to} / ${t}`
            : undefined
        }
      />
    </Box>
  );
}

export function ViewDetailsAction({
  onClick,
  label,
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <Tooltip label={label ?? "View details"} withArrow>
      <ActionIcon
        variant="subtle"
        color="blue"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        aria-label={label ?? "View details"}
      >
        <IconEye size={18} />
      </ActionIcon>
    </Tooltip>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const color = STATUS_COLORS[status as keyof typeof STATUS_COLORS] ?? "gray";
  return (
    <Badge color={color} variant="light">
      {status}
    </Badge>
  );
}
