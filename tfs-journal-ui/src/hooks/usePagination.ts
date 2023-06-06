import { useEffect, useState } from 'react';

export const usePagination = (fetchTotalPostsCount) => {
  const [totalPosts, setTotalPosts] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    fetchTotalPostsCount()
      .then(setTotalPosts)
      .catch((e) => {
        console.log(e);
      });
  }, [fetchTotalPostsCount]);

  const paginationHandler = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  let res: [number, number, (pageNumber: number) => void];
  // eslint-disable-next-line prefer-const
  res = [totalPosts, currentPage, paginationHandler];
  return res;
};
