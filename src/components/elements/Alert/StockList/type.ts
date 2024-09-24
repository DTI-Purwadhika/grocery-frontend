export type AlertProps = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (createNew: boolean) => void;
  isDisabled?: boolean;
  isUpload?: boolean;
};
