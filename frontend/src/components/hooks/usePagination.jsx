import { useState, useMemo } from "react";

const usePagination = (data = [], itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const currentData = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [currentPage, data, itemsPerPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const resetPage = () => {
    setCurrentPage(0);
  };

  return {
    currentPage,
    setCurrentPage,
    currentData,
    pageCount,
    handlePageChange,
    resetPage,
  };
};

export default usePagination;
