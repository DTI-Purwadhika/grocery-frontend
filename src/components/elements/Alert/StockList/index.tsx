import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";

import { ChildType } from "@/shares/types";

import { AlertProps } from "./type";

const StockList = ({
  children,
  title = "Confirmation",
  isOpen = false,
  onClose,
}: ChildType & AlertProps) => (
  <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">{children}</div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
);

export default StockList;
