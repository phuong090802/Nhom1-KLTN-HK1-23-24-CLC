import { useCallback, useEffect, useMemo } from "react";
import { PaginationButton } from "./PaginationButton";

const Pagination = ({ page, pages, setParams }) => {
  const pageButtons = useMemo(() => {
    let result = [];
    for (let i = page - 2; i <= page + 2; i++) {
      if (i >= 1 && i <= pages) result.push(i);
    }
    if (!result.includes(1) && page != 1) result = ["first", ...result];
    if (!result.includes(pages) && page != pages) result.push("last");
    return result;
  }, [page, pages]);

  const handlePageChange = (pageNumber) => {
    if (setParams) {
      const fowardPage =
        pageNumber === "first" ? 1 : pageNumber === "last" ? pages : pageNumber;
      setParams((prev) => ({ ...prev, page: fowardPage }));
    }
  };

  useEffect(() => {
    if (pages === 0) return;
    if (page > pages) {
      setParams((prev) => ({ ...prev, page: pages }));
    }
  }, [page]);

  return (
    !!pages && (
      <div className="w-[300px] flex justify-center gap-2">
        {pageButtons.map((pageNumber) => (
          <PaginationButton
            key={pageNumber}
            page={pageNumber}
            isSelected={pageNumber === page}
            onClick={() => handlePageChange(pageNumber)}
          />
        ))}
      </div>
    )
  );
};

export default Pagination;
