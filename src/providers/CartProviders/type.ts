import { Product } from "@/constants/entity";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addItemToCart: (product: Product, quantity: number) => void;
  updateItemQuantity: (productId: number, quantity: number) => void;
  removeItemFromCart: (productId: number) => void;
  clearCart: () => void;
}
