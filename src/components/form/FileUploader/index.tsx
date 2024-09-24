import { ChevronLeft, ChevronRight, Plus, Trash } from "lucide-react";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Tooltip } from "@nextui-org/tooltip";
import { Image } from "@nextui-org/image";

import { FileType } from "./type";

const FileUploader = ({ setFiles, files, isUploading }: FileType) => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
    const maxSize = 1024 * 1024;

    const filteredFiles = selectedFiles.filter((file) => {
      const extension = file.name.split(".").pop()?.toLowerCase();
      const fileSize = file.size;

      if (extension && allowedExtensions.includes(`.${extension}`)) {
        if (fileSize <= maxSize) {
          return true;
        } else {
          alert("File size exceeds the maximum limit of 1MB.");

          return false;
        }
      } else {
        alert("Only JPG, PNG, and GIF files are allowed.");

        return false;
      }
    });

    setFiles((prevFiles) => [...prevFiles, ...filteredFiles]);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFiles = event.dataTransfer.files ? Array.from(event.dataTransfer.files) : [];

    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % files.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + files.length) % files.length);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -100, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  const removeImage = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    if (currentIndex >= files.length - 1) {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  return (
    <div
      className={`border-2 border-dashed p-4 rounded h-full ${isDragging ? "border-blue-500" : "border-gray-300"}`}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        multiple
        accept=".jpg, .png, .gif, .jpeg"
        className="mb-4 hidden"
        disabled={isUploading}
        id="fileInput"
        type="file"
        onChange={handleFileChange}
      />
      <div className="flex flex-col items-center justify-center h-full">
        {files.length > 0 ? (
          <>
            <div className="relative w-full aspect-video">
              <Image
                isZoomed
                alt={`Preview ${files[currentIndex]}`}
                className="h-full w-full object-contain aspect-video"
                src={URL.createObjectURL(files[currentIndex])}
              />
              <div className="absolute bottom-0 right-0 flex text-white gap-2 z-10">
                <Tooltip content="Add More" placement="top">
                  <span className="bg-primary rounded-full p-2 opacity-60 hover:opacity-100 cursor-pointer">
                    <label htmlFor="fileInput">
                      <Plus size={16} />
                    </label>
                  </span>
                </Tooltip>
                <Tooltip color="danger" content="Remove" placement="top">
                  <span
                    className="bg-red-500 opacity-60 rounded-full p-2 hover:opacity-100 cursor-pointer"
                    onClick={() => removeImage(currentIndex)}
                  >
                    <Trash size={16} />
                  </span>
                </Tooltip>
              </div>
              <ChevronLeft
                className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-blue-700 h-5/6 my-auto z-10"
                onClick={prevSlide}
              />
              <ChevronRight
                className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer  hover:text-blue-700 h-5/6 my-auto z-10"
                onClick={nextSlide}
              />
            </div>
            <div className="relative w-full mt-4">
              <ChevronLeft
                className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700 hover:text-blue-600 h-5/6 my-auto"
                onClick={scrollLeft}
              />
              <ScrollShadow
                ref={scrollContainerRef}
                hideScrollBar
                className="overflow-x-auto w-11/12 mx-auto"
                orientation="horizontal"
              >
                <div className="w-fit flex-nowrap flex gap-2 px-4 mx-auto">
                  {files.map((file, index) => (
                    <Tooltip key={index} content={file?.name} placement="top">
                      <Image
                        key={index}
                        alt={`Preview ${index}`}
                        className="w-16 aspect-square object-cover cursor-pointer border border-gray-300 hover:border-blue-500 hover:border-2 rounded"
                        src={URL.createObjectURL(file)}
                        onClick={() => setCurrentIndex(index)}
                      />
                    </Tooltip>
                  ))}
                  <Tooltip key="add-more" content="Add More" placement="top">
                    <label
                      className="h-16 w-16 cursor-pointer border-2 border-dashed p-4 rounded flex items-center justify-center hover:border-blue-500 text-gray-500 hover:text-blue-500"
                      htmlFor="fileInput"
                    >
                      <Plus size={32} />
                    </label>
                  </Tooltip>
                </div>
              </ScrollShadow>
              <ChevronRight
                className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer  text-gray-700 hover:text-blue-600 h-5/6 my-auto"
                onClick={scrollRight}
              />
            </div>
          </>
        ) : (
          <label className="flex text-gray-500 w-full h-full cursor-pointer" htmlFor="fileInput">
            <p className="m-auto">Drag and drop files here, or click to select files</p>
          </label>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
