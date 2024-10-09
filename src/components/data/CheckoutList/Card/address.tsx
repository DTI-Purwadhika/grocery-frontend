"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Pin, ChevronRight } from "lucide-react";

const Delivery = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addressContent = (
    <div className="flex flex-col gap-2 ">
      <Card shadow="sm">
        <CardBody className="flex flex-row justify-between px-5 py-4 items-end">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-md">Primary Address</h3>
            <div className="flex flex-row items-start gap-2 text-xs">
              <Pin className="text-primary text-sm" size={16} />
              <p>
                jalan. huha huha
                <br />
                (816) 231-0053
              </p>
            </div>
          </div>
          <Button color="primary" size="sm" onPress={onClose}>
            Choose
          </Button>
        </CardBody>
      </Card>
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
            <h3 className="font-semibold text-md">Delivery Address</h3>
            <div className="flex flex-row items-start gap-2 text-xs">
              <Pin className="text-primary text-sm" size={16} />
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
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Choose Delivery Address</ModalHeader>
              <ModalBody>{addressContent}</ModalBody>
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
