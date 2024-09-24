import { Suspense } from "react";
import { Card, CardBody } from "@nextui-org/card";
import dynamic from "next/dynamic";

import { Loading } from "@/components/elements";

import { TableType } from "./type";

const Datatable = dynamic(() => import("./index"), { ssr: false });

const TableWrapper = ({ title, columns, defaultCol }: TableType) => (
  <Card>
    <CardBody className="px-8 py-6 min-h-96">
      <Suspense fallback={<Loading title={title} />}>
        <Datatable columns={columns} defaultCol={defaultCol} title={title} />
      </Suspense>
    </CardBody>
  </Card>
);

export default TableWrapper;
