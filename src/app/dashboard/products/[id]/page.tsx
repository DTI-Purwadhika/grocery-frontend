import { ProductForm } from "@/containers/form";
import { idType } from "@/shares/types";

const page = ({ params: { id } }: idType) => {
  return <ProductForm id={id} type="update" />;
};

export default page;
