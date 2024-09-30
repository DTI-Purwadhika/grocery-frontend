import { Admin, Category, Product } from "./entity";

export const categories: Category = {
  name: "",
  description: "",
};

export const products: Product = {
  id: 0,
  name: "",
  category: "",
  description: "",
  price: undefined,
  images: [],
};

export const admins: Admin = {
  id: 0,
  name: "",
  password: "",
  email: "",
  profilePicture: "",
  storeId: 0,
};
