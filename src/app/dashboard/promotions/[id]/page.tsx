import { CategoryForm } from "@/containers/form";
import { idType } from "@/shares/types";

const page = ({ params: { id } }: idType) => {
  return <CategoryForm id={id} type="update" />;
};

export default page;
