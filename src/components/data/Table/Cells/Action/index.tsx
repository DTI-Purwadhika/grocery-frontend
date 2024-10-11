import { Tooltip } from "@nextui-org/tooltip";
import { Eye, Pencil, Trash } from "lucide-react";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import restService from "@/services/restService";
import Alert from "@/components/elements/Alert";
import { toCapital } from "@/services/formatter";

import { ActionType } from "./type";

const Action = ({ title, row }: ActionType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => restService(`${title}/${row.id}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [title] });
      toast.success(`${row.name} has been removed`);
    },
    onError: () => {
      toast.error(`Failed to remove ${row.name}`);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
    onClose();
  };

  const handleUpdate = () => {
    router.replace(`${title}/${row.id}`);
  };

  const handleDetail = () => {
    if (title === "categories") router.replace(`/dashboard/products?category=${row.name}`);

    if (title === "products") router.replace(`/catalog/${row.id}`);
  };

  return (
    <div className="flex flex-row justify-end">
      <Tooltip content={`${toCapital(row.name)} Details`}>
        <Button
          isIconOnly
          className={`${title === "admins" && "hidden"}`}
          color="primary"
          variant="light"
          onClick={handleDetail}
        >
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
