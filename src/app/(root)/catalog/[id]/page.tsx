import { ProductDetail } from "@/containers";
import { idType } from "@/shares/types";

const page = ({ params: { id } }: idType) => {
  return <ProductDetail id={id} />;
};

export default page;
