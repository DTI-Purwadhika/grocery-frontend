import { Promotion } from "@/constants/field";
import { Datatable } from "@/components/data";

const page = () => (
  <Datatable columns={Promotion.columns} defaultCol={Promotion.selected} title="promotions" />
);

export default page;
