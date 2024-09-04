export type ColumnType = {
  columns: {
    key: string;
    label: string;
    sortable?: boolean;
  }[];
  visibleColumns: Set<string>;
  setVisibleColumns: (columns: Set<string>) => void;
};

export type TopType = {
  title: string;
  onSearch: (keyword: string) => void;
  onSize: (size: number) => void;
};
