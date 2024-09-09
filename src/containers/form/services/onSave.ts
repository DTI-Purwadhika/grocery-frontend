import { toast } from "sonner";

import restService from "@/services/restService";

import { SaveType } from "./type";

const OnSave = ({ createNew, type, id, data, onClose, reset, router, title }: SaveType) => {
  if (type === "update") {
    restService(`${title}/${id}`, "PUT", data);
  } else {
    restService(`${title}`, "POST", data);
  }
  onClose();
  toast.success(`Product has been ${type}d`);

  if (createNew) reset();
  else router.push(`/dashboard/${title}`);
};

export default OnSave;
