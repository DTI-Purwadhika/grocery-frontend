import { Product } from "@/constants/field";
import { Datatable } from "@/components/data";

const page = () => (
  <Datatable columns={Product.columns} defaultCol={Product.selected} title="products" />
);

export default page;
