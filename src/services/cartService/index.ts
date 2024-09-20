import restService from "@/services/restService";
import { CartItem, CartType } from "@/providers/CartProviders/type";

export const fetchCartItems = async (userId: string): Promise<CartType> => {
  const { content } = await restService(`cart/user/${userId}`, "GET");

  return content[0];
};

export const addItemToCart = async (cart: CartItem, storeId: string): Promise<CartType> => {
  const payload = { productId: cart.product.id, quantity: cart.quantity, storeId: storeId };
  const { resultData } = await restService(`cart?userId=${1}`, "POST", payload);

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
