import { Product } from "@/constants/entity";

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartType = {
  id: string;
  userId: string;
  items?: CartItem[];
};

export type CartContextType = {
  cart: CartType;
  addItemToCart: (product: CartItem, userEmail: string) => void;
  updateItemQuantity: (id: number, productId: number, quantity: number) => void;
  removeItemFromCart: (id: number, productId: number) => void;
  clearCart: (id: number) => void;
  cartCount: number;
};
