import { Pagination } from "@nextui-org/pagination";
import { useMemo } from "react";

import { BottomType } from "./type";

const BottomContent = ({
  page,
  setPage,
  totalPages,
  selectedSize,
  totalData,
  notMultiple = false,
}: BottomType) => {
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
          page={page}
          total={totalPages}
          variant="light"
          onChange={(curPage) => setPage(curPage)}
        />
        <span className="hidden md:block text-small text-default-400">
          {`Page ${page} from ${totalPages} pages`}
        </span>
      </div>
    ),
    [page, setPage, totalPages, selectedSize, totalData],
  );

  return bottomContent;
};

export default BottomContent;
