export type InventoryType = {
  title: string;
  row: {
    id: string;
    name: string;
    storeName: string;
    description: string;
    totalStock: number;
  };
};
