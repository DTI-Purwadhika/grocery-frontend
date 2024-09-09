import { Dispatch, SetStateAction } from "react";

export type FileType = {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  isUploading: boolean;
};
