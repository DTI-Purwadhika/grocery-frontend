import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Plus } from "lucide-react";

import { ChildType } from "@/shares/types";

import { AlertProps } from "./type";

const SaveAlert = ({
  children,
  title = "Confirmation",
  isOpen = false,
  onClose,
  onConfirm,
  isDisabled = false,
  isUpload = false,
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
            <Button color="default" isDisabled={isDisabled} onPress={() => onConfirm(false)}>
              {isUpload ? "Uploading..." : "Save"}
            </Button>
            <Button
              color="primary"
              endContent={<Plus />}
              isDisabled={isDisabled}
              onPress={() => onConfirm(true)}
            >
              {isUpload ? "Uploading..." : "Save & New"}
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
);

export default SaveAlert;
