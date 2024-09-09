export type SaveType = {
  createNew: boolean;
  type: "create" | "update";
  id?: number;
  data: any;
  onClose: () => void;
  reset: () => void;
  router: any;
  title: string;
};
