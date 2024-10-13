import Datatable from "@/components/data/Table";
import { Store } from "@/constants/field";

const page = () => {
  return (
    <>
      <Datatable columns={Store.columns} defaultCol={Store.selected} title="stores" />
    </>
  );
};

export default page;
