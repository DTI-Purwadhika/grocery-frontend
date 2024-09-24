import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { PackageCheck, PackageX } from "lucide-react";

import { ChildType } from "@/shares/types";

import { AlertType } from "../type";

const Stock = ({
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
              endContent={purpose === "delete" ? <PackageX /> : <PackageCheck />}
              onPress={onConfirm}
            >
              {purpose === "delete" ? "Emptying" : "Confirm"}
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
);

export default Stock;
