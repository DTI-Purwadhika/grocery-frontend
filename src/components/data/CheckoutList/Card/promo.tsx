import { Card, CardBody } from "@nextui-org/card";
import { Pin, ChevronRight } from "lucide-react";

const Promo = () => {
  return (
    <Card>
      <CardBody className="flex flex-row justify-between px-5 py-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-md">Coupon</h3>
          <div className="flex flex-row items-start gap-2 text-xs">
            <Pin className="mt-1 text-primary text-sm" size={16} />
            <p>
              jalan. huha huha
              <br />
              (816) 231-0053
            </p>
          </div>
        </div>
        <ChevronRight />
      </CardBody>
    </Card>
  );
};

export default Promo;
