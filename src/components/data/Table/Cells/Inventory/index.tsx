import { Tooltip } from "@nextui-org/tooltip";
import { PackageSearch, PackageX } from "lucide-react";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@nextui-org/input";

import restService from "@/services/restService";
import StockAlert from "@/components/elements/Alert/StockAlert";

import { ActionType } from "../Action/type";

const Inventory = ({ title, row, fetchData }: ActionType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [alert, setAlert] = useState(false);
  const [stock, setStock] = useState(row.totalStock);

  const deleteContent = (
    <div>
      <p className="mb-4">
        Product Name: <br />
        <strong>{row.name}</strong>
      </p>
      <p>
        Store Name: <br />
        <strong>{row.storeName}</strong>
      </p>
    </div>
  );

  const updateContent = (
    <div className="grid grid-cols-2">
      <span>Product Name</span>
      <span>: {row.name}</span>
      <span>Store Name</span>
      <span>: {row.storeName}</span>
      <span>Current Stock</span>
      <span>: {row.totalStock}</span>
      <div className="mt-6 col-span-2 flex flex-row gap-4">
        {/* <Button isIconOnly color="danger" onClick={() => setStock(stock - 10)}>
          <Minus className="text-background cursor-pointer active:opacity-50" />
        </Button> */}
        <Input
          max={1000}
          min={0}
          step={1}
          type="number"
          value={stock}
          onChange={(e) => setStock(parseInt(e.target.value))}
        />
        {/* <Button isIconOnly color="primary" onClick={() => setStock(stock + 10)}>
          <Plus className="text-background cursor-pointer active:opacity-50" />
        </Button> */}
      </div>
    </div>
  );

  const handleDelete = () => {
    restService(`${title}/${row.id}`, "DELETE");
    onClose();
    toast.success(`All stock of ${row.name} from ${row.storeName} has been emptied`);
    fetchData();
  };

  const handleUpdate = () => {
    const data = {
      stock: stock,
    };

    restService(`${title}/${row.id}`, "PUT", data);
    onClose();
    toast.success(`Stock of ${row.name} from ${row.storeName} has been updated`);
    fetchData();
  };

  const openUpdate = () => {
    setAlert(false);
    onOpen();
  };

  const openRemove = () => {
    setAlert(true);
    onOpen();
  };

  return (
    <div className="flex flex-row justify-end">
      <Tooltip content={`Update ${row.name} Stock from ${row.storeName}`}>
        <Button isIconOnly color="primary" variant="light" onClick={openUpdate}>
          <PackageSearch className="text-primary-400 cursor-pointer active:opacity-50" />
        </Button>
      </Tooltip>
      <Tooltip color="danger" content={`Empty ${row.name} Stock from ${row.storeName}`}>
        <Button isIconOnly color="danger" variant="light" onClick={openRemove}>
          <PackageX className="text-danger cursor-pointer active:opacity-50" />
        </Button>
      </Tooltip>
      <StockAlert
        isOpen={isOpen}
        purpose={alert ? "delete" : "update"}
        title={
          alert
            ? `All stock of ${row.name} from ${row.storeName} will be emptied`
            : `Update stock for ${row.name} from ${row.storeName}`
        }
        onClose={onClose}
        onConfirm={alert ? handleDelete : handleUpdate}
      >
        {alert ? deleteContent : updateContent}
      </StockAlert>
    </div>
  );
};

export default Inventory;
