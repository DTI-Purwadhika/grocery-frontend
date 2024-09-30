import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import Link from "next/link";

const PurchaseCard = () => {
  return (
    <Card shadow="sm">
      <CardBody className="flex flex-col gap-4 py-4 px-5">
        <div className="flex flex-row justify-between items-center">
          <div className="font-semibold">INV-000000001</div>
          <Chip color="primary">Selesai</Chip>
        </div>
        <div className="flex flex-row items-start gap-4">
          <Image
            alt="hehe"
            fallbackSrc="https://via.placeholder.com/500x500"
            height={85}
            src={"hehe"}
            width={85}
          />
          <div>
            <p className="font-semibold">Product super GG Brutal</p>
            <p className="text-xs">+2 Other Product</p>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between items-end">
          <div>
            <p className="text-sm">total belanja </p>
            <p className="text-lg font-semibold">Rp 25000</p>
          </div>
          <Button
            as={Link}
            className="mb-1"
            color="primary"
            href="/my-profile/my-purchases/1"
            size="sm"
            variant="bordered"
          >
            Check Detail
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default PurchaseCard;
