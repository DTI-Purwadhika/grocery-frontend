export type AlertType = {
  title?: string;
  purpose: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};
