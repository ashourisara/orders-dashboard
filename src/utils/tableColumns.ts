import type { DataTableColumn } from "mantine-datatable";
import type { TableColumn } from "../types/order";

export function toDataTableColumns<T>(
  columns: TableColumn<T>[]
): DataTableColumn<T>[] {
  return columns.map((c) => ({
    accessor: c.accessor as string,
    title: c.title,
    render: c.render as DataTableColumn<T>["render"],
    width: c.width,
    textAlign: c.textAlign,
  }));
}
