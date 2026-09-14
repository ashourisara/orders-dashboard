import { Group, Select, ActionIcon, Tooltip, Text, Stack } from "@mantine/core";
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import { SearchBar } from "../Search/SearchBar";
import { ORDER_SORT_OPTIONS, STATUS_OPTIONS } from "../../constants/orders";
import type { Order, SortOption, SortDirection } from "../../types/order";
import { useIsMobile } from "../../hooks/useMediaQuery";

export interface TableToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string | null;
  onStatusChange: (value: string | null) => void;
  sortBy: SortOption<Order> | null;
  onSortChange: (value: string | null) => void;
  sortDir: SortDirection;
  onSortDirToggle: () => void;
  title?: string;
}

export function TableToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
  sortDir,
  onSortDirToggle,
  title = "Recent Orders",
}: TableToolbarProps) {
  const isMobile = useIsMobile();

  const controls = (
    <>
      <SearchBar
        value={search}
        onChange={onSearchChange}
        placeholder="Search by order ID or customer..."
        width={isMobile ? "100%" : 280}
      />

      <Select<string>
        placeholder="Filter by status"
        data={STATUS_OPTIONS}
        value={statusFilter}
        onChange={(value) => onStatusChange(value ?? null)}
        clearable
        w={isMobile ? "100%" : 170}
      />

      <Select<string>
        placeholder="Sort by"
        data={ORDER_SORT_OPTIONS.map((o) => ({
          value: o.value as string,
          label: o.label,
        }))}
        value={(sortBy?.value as string) ?? null}
        onChange={onSortChange}
        clearable
        w={isMobile ? "100%" : 150}
      />

      <Tooltip label={sortDir === "asc" ? "Ascending" : "Descending"} withArrow>
        <ActionIcon
          variant="default"
          size="lg"
          disabled={!sortBy}
          onClick={onSortDirToggle}
          aria-label="Toggle sort direction"
          style={isMobile ? { alignSelf: "flex-end" } : undefined}
        >
          {sortDir === "asc" ? (
            <IconSortAscending size={18} />
          ) : (
            <IconSortDescending size={18} />
          )}
        </ActionIcon>
      </Tooltip>
    </>
  );

  if (isMobile) {
    return (
      <Stack gap="sm" mb="md">
        <Text size="lg" fw={500}>
          {title}
        </Text>
        <Stack gap="xs">{controls}</Stack>
      </Stack>
    );
  }

  return (
    <Group justify="space-between" mb="md" align="center" wrap="wrap">
      <Text size="lg" fw={500}>
        {title}
      </Text>
      <Group gap="sm" wrap="nowrap">
        {controls}
      </Group>
    </Group>
  );
}
