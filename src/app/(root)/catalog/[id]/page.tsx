import { ProductDetail } from "@/containers";
import { idType } from "@/shares/types";

const page = ({ params: { id } }: idType) => {
  return <ProductDetail id={id as number} />;
};

export default page;
