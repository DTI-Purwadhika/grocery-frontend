import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type SaveType = {
  createNew: boolean;
  type: "create" | "update";
  id?: number;
  data: any; // * data: any, karena kita tidak tahu bentuk data yang akan kita terima
  onClose: () => void;
  reset: () => void;
  router: AppRouterInstance;
  title: string;
};
