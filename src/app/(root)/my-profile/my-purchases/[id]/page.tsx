import { PurchaseDetail } from "@/components/data";
import { idType } from "@/shares/types";

const page = ({ params: { id } }: idType) => {
  return <PurchaseDetail id={id} />;
};

export default page;
