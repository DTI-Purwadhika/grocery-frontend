"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { FaCheck, FaTruckMoving } from "react-icons/fa6";
import Image from "next/image";

import { ShippingDataResponse, useShipping } from "@/hooks/useShipping";
import { useShippingFee } from "@/providers/ShippingProvider";

import pos from "../../../../../../public/pos.png";
import tiki from "../../../../../../public/tiki.png";
import jne from "../../../../../../public/jne.png";
import { Spinner } from "@nextui-org/spinner";
import { AddressDataResponse, useAddress } from "@/hooks/useAddress";

const Shipping = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { shipping, isLoading } = useShipping();
  const [selectedShipping, setSelectedShipping] = useState<ShippingDataResponse>();
  const addresses: AddressDataResponse[] | undefined = useAddress();
  const [selectedShippingId, setSelectedShippingId] = useState<number>();
  const { setShippingCost } = useShippingFee();

  const upperCase = (text: string | undefined) => {
    return text?.toUpperCase();
  };

  const shippingContent = (
<<<<<<< HEAD
    <>
      {isLoading ? (
=======
    <div className="flex flex-col gap-2 ">
      {shipping.length > 0 ? (
        shipping.map((shipment) => (
          <>
            <Card key={shipment.id} shadow="sm">
              <CardBody className="relative flex flex-col gap-4 justify-between px-5 py-4">
                {selectedShippingId === shipment.id && (
                  <FaCheck className="text-primary absolute top-2 right-4" />
                )}

                {upperCase(shipment.courier) === "POS" && (
                  <Image
                    alt="pos"
                    className="absolute right-8 top-16 w-10 h-10 lg:w-14 lg:h-12"
                    src={pos}
                  />
                )}
                {upperCase(shipment.courier) === "TIKI" && (
                  <Image
                    alt="tiki"
                    className="absolute right-8 top-16 w-14 h-10 lg:w-20 lg:h-12"
                    src={tiki}
                  />
                )}
                {upperCase(shipment.courier) === "JNE" && (
                  <Image
                    alt="jne"
                    className="absolute right-8 top-16 w-12 h-10 lg:w-16 lg:h-12"
                    src={jne}
                  />
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
>>>>>>> main
        <>
          <Spinner size="lg" color="primary" />
          <p className="font-semibold text-center">Getting shipping options...</p>
        </>
      ) : (
        <div className="flex flex-col gap-2 ">
          {shipping.length > 0 ? (
            shipping.map((shipment) => (
              <>
                <Card key={shipment.id} shadow="sm">
                  <CardBody className="relative flex flex-col gap-4 justify-between px-5 py-4">
                    {selectedShippingId === shipment.id && (
                      <FaCheck className="text-primary absolute top-2 right-4" />
                    )}

                    {upperCase(shipment.courier) === "POS" && (
                      <Image
                        src={pos}
                        alt="pos"
                        className="absolute right-8 top-14 w-10 h-10 lg:w-14 lg:h-12"
                      />
                    )}
                    {upperCase(shipment.courier) === "TIKI" && (
                      <Image
                        src={tiki}
                        alt="tiki"
                        className="absolute right-8 top-14 w-14 h-10 lg:w-20 lg:h-12"
                      />
                    )}
                    {upperCase(shipment.courier) === "JNE" && (
                      <Image
                        src={jne}
                        alt="jne"
                        className="absolute right-8 top-14 w-12 h-10 lg:w-16 lg:h-12"
                      />
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
                          <span className="font-bold">Estimated time of delivery:</span>{" "}
                          {shipment.etd}
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
            <p className="font-semibold text-sm">No shipping available.</p>
          )}
        </div>
      )}
    </>
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
                <span className="font-bold">Courier:</span>{" "}
                {upperCase(selectedShipping?.courier || "Store Courier")}
                <br />
                <span className="font-bold">Description:</span>{" "}
                {selectedShipping?.description || "A Store Courier at your door"}
                <br />
                <span className="font-bold">Origin:</span>{" "}
                {selectedShipping?.origin || "Nearest Store"}
                <br />
                <span className="font-bold">Destination:</span>{" "}
                {selectedShipping?.destination || "Your Location"}
                <br />
                <span className="font-bold">Cost: </span>Rp. {selectedShipping?.cost || 11500}
                <br />
                <span className="font-bold">Estimated time of delivery:</span>{" "}
                {selectedShipping?.etd || "2-3 days"}
              </p>
            </div>
          </div>
          <ChevronRight />
        </CardBody>
      </Card>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-bold">Choose Shipping</ModalHeader>
              {addresses.length > 0 ? (
                <ModalBody>{shippingContent}</ModalBody>
              ) : (
                <ModalBody>
                  <p className="font-semibold text-sm">
                    No shipping available. Please add a new address first.
                  </p>
                </ModalBody>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Shipping;
