"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { ShippingDataResponse, useShipping } from "@/hooks/useShipping";
import { FaCheck, FaTruckMoving } from "react-icons/fa6";
import { useShippingFee } from "@/providers/ShippingProvider";

const Shipping = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const shipping: ShippingDataResponse[] | undefined = useShipping();
  const [selectedShipping, setSelectedShipping] = useState<ShippingDataResponse>();
  const [selectedShippingId, setSelectedShippingId] = useState<number>();
  const { setShippingCost } = useShippingFee();

  const upperCase = (text: string | undefined) => {
    return text?.toUpperCase();
  };

  const shippingContent = (
    <div className="flex flex-col gap-2 ">
      {shipping.length > 0 ? (
        shipping.map((shipment) => (
          <>
            <Card key={shipment.id} shadow="sm">
              <CardBody className="relative flex flex-col gap-4 justify-between px-5 py-4">
                {selectedShippingId === shipment.id && (
                  <FaCheck className="text-primary absolute top-1 right-3" />
                )}

                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-start gap-2 text-xs">
                    <p>
                      <span className="font-bold">Courier:</span> {upperCase(shipment.courier)}
                      <br />
                      <span className="font-bold">Description:</span> {shipment.description}
                      <br />
                      <span className="font-bold">Origin:</span> {shipment.origin}
                      <br />
                      <span className="font-bold">Destination:</span> {shipment.destination}
                      <br />
                      <span className="font-bold">Cost: </span>Rp. {shipment.cost}
                      <br />
                      <span className="font-bold">Estimated time of delivery:</span> {shipment.etd}
                    </p>
                  </div>
                </div>
                {selectedShippingId !== shipment.id && (
                  <Button
                    color="primary"
                    size="sm"
                    onPress={() => {
                      setSelectedShipping({
                        id: shipment.id,
                        courier: shipment.courier,
                        description: shipment.description,
                        origin: shipment.origin,
                        destination: shipment.destination,
                        cost: shipment.cost,
                        etd: shipment.etd,
                      });
                      setSelectedShippingId(shipment.id);
                      setShippingCost(shipment.cost);
                      onClose();
                    }}
                  >
                    Choose
                  </Button>
                )}
              </CardBody>
            </Card>
          </>
        ))
      ) : (
        <>
          <p className="font-semibold text-sm">No shipping available.</p>
        </>
      )}
    </div>
  );

  return (
    <>
      <Card shadow="sm">
        <CardBody
          className="flex flex-row justify-between px-5 py-4 cursor-pointer hover:bg-default-100"
          onClick={() => onOpen()}
        >
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-md">Shipping</h3>
            <div className="flex flex-row items-start gap-2 text-xs">
              <FaTruckMoving className="text-primary w-6 h-6" />
              <p>
                <span className="font-bold">Courier:</span> {upperCase(selectedShipping?.courier)}
                <br />
                <span className="font-bold">Description:</span> {selectedShipping?.description}
                <br />
                <span className="font-bold">Origin:</span> {selectedShipping?.origin}
                <br />
                <span className="font-bold">Destination:</span> {selectedShipping?.destination}
                <br />
                <span className="font-bold">Cost: </span>Rp. {selectedShipping?.cost}
                <br />
                <span className="font-bold">Estimated time of delivery:</span>{" "}
                {selectedShipping?.etd}
              </p>
            </div>
          </div>
          <ChevronRight />
        </CardBody>
      </Card>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Choose Shipping</ModalHeader>
              <ModalBody>{shippingContent}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Shipping;
