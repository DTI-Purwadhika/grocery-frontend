import { Payment } from "@/containers";
import { idType } from "@/shares/types";

const page = ({ params: { id } }: idType) => {
  return <Payment id={id as string} />;
};

export default page;
