import { useRouter } from "next/navigation";
import { toast } from "sonner";

import restService from "@/services/restService";

import { SaveType } from "./type";

const OnSave = ({ createNew, type, id, data, onClose, reset }: SaveType) => {
  const router = useRouter();

  if (type === "update") {
    restService(`products/${id}`, "PUT", data);
  } else {
    restService(`products`, "POST", data);
  }
  onClose();
  toast.success(`Product has been ${type}d`);

  if (createNew) reset();
  else router.push("/dashboard/products");
};

export default OnSave;
