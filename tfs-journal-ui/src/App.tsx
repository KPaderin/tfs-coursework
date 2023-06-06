import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import FeedPage from './pages/FeedPage';
import Header from './components/Header/Header';
import NewPostPage from './pages/NewPostPage';
import PostPage from './pages/PostPage';
import { loadUserFromLocal, loadUserFromLocalAction } from './redux/me/actions';
import ProfilePage from './pages/ProfilePage';
import DraftsBoardPage from './pages/DraftsBoardPage';
import DraftEditPage from './pages/DraftEditPage';
import { loadGenres, loadGenresAction } from './redux/genres/actions';
import Footer from './components/Footer/Footer';

import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGenresAction());
    dispatch(loadGenres());
    dispatch(loadUserFromLocalAction());
    dispatch(loadUserFromLocal());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <div className={styles.pageContent}>
        <Routes>
          <Route path="/" element={<Navigate to="/feed" />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/feed/:postId" element={<PostPage />} />
          <Route
            path="/feed/:postId/edit"
            element={<DraftEditPage type="post" />}
          />
          <Route path="/:userId" element={<ProfilePage />} />
          <Route path="/newPost" element={<NewPostPage />} />
          <Route path="/drafts" element={<DraftsBoardPage />} />
          <Route
            path="/drafts/:postId"
            element={<DraftEditPage type="editDraft" />}
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
