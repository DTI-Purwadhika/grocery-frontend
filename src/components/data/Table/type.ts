export type TableType = {
  title: string;
  columns: {
    key: string;
    label: string;
    sortable?: boolean;
    align?: "center" | "start" | "end" | undefined;
  }[];
  defaultCol: string[];
};
