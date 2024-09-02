export type TableType = {
  title: string;
  columns: {
    key: string;
    label: string;
    sortable?: boolean;
  }[];
  defaultCol: string[];
};
