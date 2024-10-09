import { Inventory } from "@/constants/field";
import { Datatable } from "@/components/data";

const page = () => (
  <Datatable columns={Inventory.columns} defaultCol={Inventory.selected} title="inventory" />
);

export default page;
