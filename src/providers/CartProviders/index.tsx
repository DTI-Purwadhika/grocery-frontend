"use client";
import { createContext, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

import { ChildType } from "@/shares/types";
import {
  fetchCartItems,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart,
} from "@/services/cartService";

import { CartContextType, CartItem, CartType } from "./type";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};

export const CartProvider = ({ children }: ChildType) => {
  const queryClient = useQueryClient();

  const { data: session } = useSession();
  const userId = session?.user?.email || "1";

  const { data } = useQuery<CartType>({
    queryKey: ["cart", userId],
    queryFn: () => fetchCartItems(userId),
  });

  const addItemToCartMutation = useMutation({
    mutationFn: ({ product, storeId }: { product: CartItem; storeId: string }) =>
      addItemToCart(product, storeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
      toast.success(`Item added to cart`);
    },
    onError: () => {
      toast.error(`Failed to add item to cart`);
    },
  });

  const updateItemQuantityMutation = useMutation({
    mutationFn: ({
      id,
      productId,
      quantity,
    }: {
      id: number;
      productId: number;
      quantity: number;
    }) => updateItemQuantity(id, productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
      toast.success(`Item updated`);
    },
    onError: () => {
      toast.error(`Failed to update item in cart`);
    },
  });

  const removeItemFromCartMutation = useMutation({
    mutationFn: ({ id, productId }: { id: number; productId: number }) =>
      removeItemFromCart(id, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
      toast.success(`Item removed from cart`);
    },
    onError: () => {
      toast.error(`Failed to remove item in cart`);
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: ({ id }: { id: number }) => clearCart(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
      toast.success(`All Item removed from cart`);
    },
    onError: () => {
      toast.error(`Failed to remove all item in cart`);
    },
  });

  return (
    <CartContext.Provider
      value={{
        cart: data || { id: "", userId: "", items: [] },
        addItemToCart: (product: CartItem, storeId: string) =>
          addItemToCartMutation.mutate({ product, storeId }),
        updateItemQuantity: (id: number, productId: number, quantity: number) =>
          updateItemQuantityMutation.mutate({ id, productId, quantity }),
        removeItemFromCart: (id: number, productId: number) =>
          removeItemFromCartMutation.mutate({ id, productId }),
        clearCart: (id: number) => clearCartMutation.mutate({ id }),
        cartCount: data?.items ? data.items.reduce((acc, item) => acc + item.quantity, 0) : 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
