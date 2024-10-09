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

export type Admin = {
  id: number;
  name: string;
  password: string;
  email: string;
  profilePicture: string;
  storeId: number;
  isVerified?: boolean;
};

export type StockReport = {
  id: number;
  totalAdditions: number;
  totalDeductions: number;
  finalStock: number;
};

export type Order = {
  id: number;
  status: string;
  code: string;
  invoiceUrl: string;
  proofUrl?: string;
  resiNumber?: string;
  description?: string;
  totalAmount: number;
  totalShipment: number;
  totalDiscount: number;
  totalPayment: number;
  expiryDate: string;
  createdAt: string;
  items: OrderDetail[];
};

export type OrderDetail = {
  id: number;
  name: string;
  image?: string | null;
  price: number;
  quantity: number;
  totalPrice: number;
};
