import { Plus, Trash } from "lucide-react";
import { ChangeEvent, DragEvent, useState } from "react";
import { Tooltip } from "@nextui-org/tooltip";
import { Image } from "@nextui-org/image";

import { SingleFileType } from "./type";

const FileUploader = ({ setFile, file, isUploading }: SingleFileType) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
    const maxSize = 1024 * 1024;

    if (selectedFile) {
      const extension = selectedFile.name.split(".").pop()?.toLowerCase();
      const fileSize = selectedFile.size;

      if (extension && allowedExtensions.includes(`.${extension}`)) {
        if (fileSize <= maxSize) {
          setFile(selectedFile);
        } else {
          alert("File size exceeds the maximum limit of 1MB.");
        }
      } else {
        alert("Only JPG, PNG, and GIF file are allowed.");
      }
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files[0];

    setFile(droppedFile);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = () => {
    setFile(null);
  };

  return (
    <div
      className={`border-2 border-dashed p-4 rounded h-full ${isDragging ? "border-blue-500" : "border-gray-300"}`}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        accept=".jpg, .png, .gif, .jpeg"
        className="mb-4 hidden"
        disabled={isUploading}
        id="fileInput"
        type="file"
        onChange={handleFileChange}
      />
      <div className="flex flex-col items-center justify-center h-full">
        {file ? (
          <div className="relative w-full">
            <Image
              isZoomed
              alt={`Preview ${file.name}`}
              className="h-full w-full object-cover aspect-square"
              src={URL.createObjectURL(file)}
              width="100%"
            />
            <div className="absolute bottom-0 right-0 flex text-white gap-2 z-10">
              <Tooltip content="Change" placement="top">
                <span className="bg-primary rounded-full p-2 opacity-60 hover:opacity-100 cursor-pointer">
                  <label htmlFor="fileInput">
                    <Plus size={16} />
                  </label>
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Remove" placement="top">
                <span
                  className="bg-red-500 opacity-60 rounded-full p-2 hover:opacity-100 cursor-pointer"
                  onClick={removeImage}
                >
                  <Trash size={16} />
                </span>
              </Tooltip>
            </div>
          </div>
        ) : (
          <label className="flex text-gray-500 w-full h-full cursor-pointer" htmlFor="fileInput">
            <p className="w-full text-center my-auto">
              Drag and drop images here, or click to select images
            </p>
          </label>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
