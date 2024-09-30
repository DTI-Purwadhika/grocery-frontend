import { Copy } from "lucide-react";

import ProductCard from "./Card";

const PurchaseDetail = ({ id }: { id: number }) => {
  return (
    <div className="flex flex-col gap-6 px-2">
      <div className="flex flex-col gap-2 text-sm">
        <div className="font-semibold text-medium">Pesanan Selesai {id}</div>
        <hr />
        <div className="flex flex-row gap-2 items-center">
          <span>INV-000001111111</span>
          <Copy size={16} />
        </div>
        <div className="flex flex-row justify-between">
          <div>Purchase Date</div>
          <div>09 September 2020, 10:10 WIB</div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Purchased Products</h3>
        <div className="flex flex-col gap-4">
          <ProductCard />
        </div>
      </div>
    </div>
  );
};

export default PurchaseDetail;
