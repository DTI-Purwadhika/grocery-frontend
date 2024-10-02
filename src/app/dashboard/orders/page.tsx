import { Order } from "@/constants/field";
import { Datatable } from "@/components/data";

const page = () => (
  <Datatable columns={Order.columns} defaultCol={Order.selected} title="checkouts" />
);

export default page;
