export type BottomType = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  selectedSize: number;
  totalData: number;
  notMultiple?: boolean;
};
