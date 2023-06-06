import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';

import LimitedContainer from '../components/LimitedContainer/LimitedContainer';
import DraftsBoard from '../components/DraftsBoard/DraftsBoard';
import { loadDraftsAction, loadAllDrafts } from '../redux/drafts/actions';
import { itemsCountOnPage } from '../configs/config';
import { fetchTotalDraftsCount } from '../services/fetchTotalDraftsCount';
import PreLoader from '../components/PreLoader/PreLoader';
import { type RootState } from '../redux/store';
import { usePagination } from '../hooks/usePagination';

import styles from './Pages.module.css';

function DraftsBoardPage() {
  const dispatch = useDispatch();

  const drafts = useSelector((state: RootState) => state.drafts);

  const [totalPosts, currentPage, paginationHandler] = usePagination(
    fetchTotalDraftsCount,
  );

  const isLoading = drafts === null;

  useEffect(() => {
    dispatch(loadDraftsAction());
    dispatch(loadAllDrafts(currentPage));
  }, [currentPage, dispatch]);

  return (
    <LimitedContainer>
      <h1>Пул статей на рассмотрении:</h1>
      <PreLoader loading={isLoading} />
      <DraftsBoard drafts={drafts} />
      <Pagination
        className={styles.pagination}
        simple
        onChange={paginationHandler}
        defaultPageSize={itemsCountOnPage}
        defaultCurrent={1}
        total={totalPosts}
      />
    </LimitedContainer>
  );
}

export default DraftsBoardPage;
