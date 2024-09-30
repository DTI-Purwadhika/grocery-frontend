"use client";
import { Card, CardBody } from "@nextui-org/card";
import { ChevronRight, CreditCard } from "lucide-react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { useState } from "react";

const Delivery = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [automatic, setAutomatic] = useState(false);

  const automaticContent = (
    <p className="text-2xs">
      Seamless and secure transactions by automatically verifying payment. <br /> <br />
      <strong>Card, Virtual Accounts, E-Wallets, and Pay-on-counter.</strong>
    </p>
  );

  const manualContent = (
    <p className=" text-2xs">
      Manually transferring the amount to our bank account. After making the transfer, please send a
      proof of transfer to our support team for verification.
      <br /> <br />
      <strong>Bank Account Transfer</strong>
    </p>
  );

  const handleChoose = (value: boolean) => {
    setAutomatic(value);
    onClose();
  };

  const paymentContent = (
    <div className="flex flex-col gap-4 ">
      <Card shadow="sm">
        <CardBody className="flex flex-row justify-between px-5 py-4 items-end">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-start gap-2  justify-between">
              <h3 className="font-semibold text-md">Automatic Verification (Recomended)</h3>
              <Button color="primary" size="sm" onPress={() => handleChoose(true)}>
                Choose
              </Button>
            </div>
            {automaticContent}
          </div>
        </CardBody>
      </Card>
      <Card shadow="sm">
        <CardBody className="flex flex-row justify-between px-5 py-4 items-end">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-start gap-2 justify-between">
              <h3 className="font-semibold text-md">Bank Account Transfer (Manual Verification)</h3>
              <Button color="primary" size="sm" onPress={() => handleChoose(false)}>
                Choose
              </Button>
            </div>
            {manualContent}
          </div>
        </CardBody>
      </Card>
    </div>
  );

  return (
    <>
      <Card shadow="sm">
        <CardBody
          className="grid grid-cols-[auto_1fr] gap-1 justify-between px-5 py-4 hover: bg-default-100"
          onClick={() => onOpen()}
        >
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-md">Payment</h3>
            <div className="grid grid-cols-[1fr_auto] gap-2">
              <CreditCard className=" text-primary text-sm" size={16} />
              {automatic ? automaticContent : manualContent}
            </div>
          </div>
          <ChevronRight />
        </CardBody>
      </Card>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Choose Payment</ModalHeader>
              <ModalBody>{paymentContent}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Delivery;
