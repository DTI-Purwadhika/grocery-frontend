import { Category } from "@/constants/field";
import { Datatable } from "@/components/data";

const page = () => (
  <Datatable columns={Category.columns} defaultCol={Category.selected} title="categories" />
);

export default page;
