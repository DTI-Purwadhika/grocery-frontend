export type Category = {
  name: string;
  description: string;
};

export type Product = {
  name: string;
  description: string;
  price: number | undefined;
  category: string;
  images: {
    url: string;
    altText: string;
  }[];
};
