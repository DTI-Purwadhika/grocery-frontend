import { Tooltip } from "@nextui-org/tooltip";
import { Eye, Pencil, Trash } from "lucide-react";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import restService from "@/services/restService";
import Alert from "@/components/elements/Alert";
import { capitalize } from "@/hooks/formatter";

import { ActionType } from "./type";

const Action = ({ title, row, fetchData }: ActionType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  const handleDelete = () => {
    restService(`${title}/${row.id}`, "DELETE");
    onClose();
    toast.success(`${row.name} has been removed`);
    fetchData();
  };

  const handleUpdate = () => {
    router.replace(`${title}/${row.id}`);
  };

  const handleDetail = () => {};

  return (
    <div className="flex flex-row justify-start ">
      <Tooltip content={`${capitalize(row.name)} Details`}>
        <Button isIconOnly color="default" variant="light" onClick={handleDetail}>
          <Eye className="text-default-400 cursor-pointer active:opacity-50" />
        </Button>
      </Tooltip>
      <Tooltip content={`Edit ${row.name}`}>
        <Button isIconOnly color="default" variant="light" onClick={handleUpdate}>
          <Pencil className="text-default-400 cursor-pointer active:opacity-50" />
        </Button>
      </Tooltip>
      <Tooltip color="danger" content={`Remove ${row.name}`}>
        <Button isIconOnly color="danger" variant="light" onClick={onOpen}>
          <Trash className="text-danger cursor-pointer active:opacity-50" />
        </Button>
      </Tooltip>
      <Alert
        isOpen={isOpen}
        purpose="delete"
        title={`${row.name} will be removed`}
        onClose={onClose}
        onConfirm={handleDelete}
      >
        <div>
          <p className="mb-4">
            Name: <br />
            <strong>{row.name}</strong>
          </p>
          <p>
            Description: <br />
            {row.description}
          </p>
        </div>
      </Alert>
    </div>
  );
};

export default Action;
