import { Pagination } from 'antd';

import PostsBoard from '../components/PostsBoard/PostsBoard';
import LimitedContainer from '../components/LimitedContainer/LimitedContainer';
import { itemsCountOnPage } from '../configs/config';
import { fetchTotalPostsCount } from '../services/fetchTotalPostsCount';
import { usePagination } from '../hooks/usePagination';

import styles from './Pages.module.css';

function FeedPage() {
  const [totalPosts, currentPage, paginationHandler] = usePagination(fetchTotalPostsCount);

  return (
    <LimitedContainer>
      <PostsBoard currentPage={currentPage} />
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

export default FeedPage;
