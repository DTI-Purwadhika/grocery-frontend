import restService from "@/services/restService";
import { CartItem, CartType } from "@/providers/CartProviders/type";

export const fetchCartItems = async (userId: string): Promise<CartType> => {
  const { resultData } = await restService(`cart/user/${userId}`, "GET");

  return resultData;
};

export const addItemToCart = async (cart: CartItem, userEmail: string): Promise<CartType> => {
  const payload = { productId: cart.product.id, quantity: cart.quantity };
  const { resultData } = await restService(`cart?userId=${userEmail}`, "POST", payload);

  return resultData;
};

export const updateItemQuantity = async (
  id: number,
  productId: number,
  quantity: number,
): Promise<CartType> => {
  const { resultData: updatedCart } = await restService(
    `cart/${id}/update-item/${productId}?quantity=${quantity}`,
    "PUT",
  );

  return updatedCart;
};

export const removeItemFromCart = async (id: number, productId: number): Promise<CartType> => {
  const { resultData: updatedCart } = await restService(
    `cart/${id}/remove-item/${productId}`,
    "DELETE",
  );

  return updatedCart;
};

export const clearCart = async (id: number): Promise<void> => {
  await restService(`cart/${id}/clear`, "DELETE");
};
