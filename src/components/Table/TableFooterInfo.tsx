import { Text } from "@mantine/core";

export interface TableFooterInfoProps {
  total: number;
  page: number;
  pageSize: number;
  entityName?: string;
}

export function TableFooterInfo({
  total,
  page,
  pageSize,
  entityName = "records",
}: TableFooterInfoProps) {
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <Text size="sm" c="dimmed" mt="sm">
      Showing {start}–{end} of {total} {entityName}
    </Text>
  );
}
