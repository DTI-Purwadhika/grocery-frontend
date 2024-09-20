export type Category = {
  name: string;
  description: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number | undefined;
  category: string;
  images: {
    url: string;
    altText: string;
  }[];
  stocks?: {
    storeName: string;
    storeId: string;
    stock: number;
  }[];
};

export type Inventory = {
  stock: number;
};
