import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Check, Trash } from "lucide-react";

import { ChildType } from "@/shares/types";

import { AlertType } from "./type";

const Alert = ({
  children,
  purpose = "delete",
  title = "Confirmation",
  isOpen = false,
  onClose,
  onConfirm,
}: ChildType & AlertType) => (
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
            <Button
              color={purpose === "delete" ? "danger" : "primary"}
              endContent={purpose === "delete" ? <Trash /> : <Check />}
              onPress={onConfirm}
            >
              {purpose === "delete" ? "Delete" : "Confirm"}
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
);

export default Alert;
