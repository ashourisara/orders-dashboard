export enum OrderStatus {
  Pending = "Pending",
  Processing = "Processing",
  Completed = "Completed",
  Cancelled = "Cancelled",
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  product: string;
  items: number;
  price: number;
  status: OrderStatus;
  date: string;
}

export interface SortOption<T> {
  value: keyof T;
  label: string;
  defaultDir: SortDirection;
  compare: (a: T, b: T) => number;
}

export type SortDirection = "asc" | "desc";

export interface TableColumn<T> {
  accessor: keyof T | string;
  title: string;
  render?: (record: T) => React.ReactNode;
  width?: number;
  textAlign?: "left" | "center" | "right";
}

export interface DetailField<T> {
  label: string;
  accessor: keyof T;
  render?: (value: T[keyof T], record: T) => React.ReactNode;
  span?: number;
}
