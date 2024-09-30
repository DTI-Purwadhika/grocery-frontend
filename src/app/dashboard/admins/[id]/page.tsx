import { AdminForm } from "@/containers/form";
import { idType } from "@/shares/types";

const page = ({ params: { id } }: idType) => {
  return <AdminForm id={id} type="update" />;
};

export default page;
