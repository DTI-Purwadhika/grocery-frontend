import { Dispatch, SetStateAction } from "react";

import { Product } from "@/constants/entity";

export type FileType = {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  isUploading: boolean;
  images?: Product["images"][];
};

export type SingleFileType = {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  isUploading: boolean;
  images?: Product["images"];
};
