import type { DataTableColumn } from "mantine-datatable";
import type {
  Order,
  SortOption,
  TableColumn,
  DetailField,
} from "../types/order";
import { OrderStatus } from "../types/order";
import { formatToJalali } from "../utils/date";

export const ORDERS_PAGE_SIZE = 10;

export const STATUS_COLORS: Record<OrderStatus, string> = {
  [OrderStatus.Pending]: "yellow",
  [OrderStatus.Processing]: "blue",
  [OrderStatus.Completed]: "green",
  [OrderStatus.Cancelled]: "red",
};

export const STATUS_OPTIONS = Object.values(OrderStatus).map((value) => ({
  value,
  label: value,
}));

export const ORDER_SORT_OPTIONS: SortOption<Order>[] = [
  {
    value: "price",
    label: "Price",
    defaultDir: "desc",
    compare: (a, b) => a.price - b.price,
  },
  {
    value: "date",
    label: "Date",
    defaultDir: "desc",
    compare: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  },
  {
    value: "customer",
    label: "Customer",
    defaultDir: "asc",
    compare: (a, b) => a.customer.localeCompare(b.customer),
  },
];

export const ORDER_COLUMNS: TableColumn<Order>[] = [
  { accessor: "id", title: "شماره سفارش" },
  { accessor: "customer", title: "نام مشتری" },
  {
    accessor: "price",
    title: "مبلغ",
    render: (r) => `$${r.price.toFixed(2)}`,
  },
  { accessor: "items", title: "تعداد کالا" },
  { accessor: "status", title: "وضعیت" },
  {
    accessor: "date",
    title: "تاریخ ثبت",
    render: (r) => formatToJalali(r.date),
  },
];

export const ORDER_DETAIL_FIELDS: DetailField<Order>[] = [
  { label: "شماره سفارش", accessor: "id" },
  { label: "نام مشتری", accessor: "customer" },
  { label: "تعداد کالا", accessor: "items" },
  { label: "مبلغ", accessor: "price" },
  { label: "تاریخ ثبت", accessor: "date" },
  { label: "وضعیت", accessor: "status" },
];

export type AppColumn<T> = DataTableColumn<T> & {
  hideOnMobile?: boolean;
};
