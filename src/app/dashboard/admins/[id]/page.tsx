import { AdminForm } from "@/containers/form";
import { idType } from "@/shares/types";

const page = ({ params: { id } }: idType) => {
  return <AdminForm id={id as number} type="update" />;
};

export default page;
