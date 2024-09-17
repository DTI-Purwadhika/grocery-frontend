import { Pagination } from "@nextui-org/pagination";
import { useMemo } from "react";

import { useQuery } from "@/hooks/useQuery";

import { BottomType } from "./type";

const BottomContent = ({
  totalPages,
  selectedSize,
  totalData,
  notMultiple = false,
}: BottomType) => {
  const { getQueryParam, setQueryParam } = useQuery();

  const currentPage = getQueryParam("page") || 1;

  const handlePageChange = (newPage: number) => {
    setQueryParam("page", newPage.toString());
  };

  const bottomContent = useMemo(
    () => (
      <div className="py-2 px-2 flex justify-evenly md:justify-between items-center">
        <span className={`${notMultiple && "hidden"} text-small text-default-400`}>
          {selectedSize === totalData
            ? `All ${totalData} selected`
            : `${selectedSize} of ${totalData} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={+currentPage}
          total={totalPages}
          variant="light"
          onChange={handlePageChange}
        />
        <span className="hidden md:block text-small text-default-400">
          {`Page ${currentPage} of ${totalPages} pages`}
        </span>
      </div>
    ),
    [currentPage, totalPages, selectedSize, totalData, handlePageChange, notMultiple],
  );

  return bottomContent;
};

export default BottomContent;
