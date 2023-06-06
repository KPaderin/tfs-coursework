import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ConfigProvider, Tabs } from 'antd';

import LimitedContainer from '../components/LimitedContainer/LimitedContainer';
import UserBlock from '../components/UserBlock/UserBlock';
import { loadCurrentUserAction, loadUser } from '../redux/currentUser/actions';
import { type RootState } from '../redux/store';
import PostsPreviewBoard from '../components/PostsPreviewBoard/PostsPreviewBoard';
import CommentsPreviewBoard from '../components/CommentsPreviewBoard/CommentsPreviewBoard';
import DraftsBoard from '../components/DraftsBoard/DraftsBoard';
import { loadDraftsAction, loadDraftsForUser } from '../redux/drafts/actions';
import TestComponent from '../components/TestComponent/TestComponent';
import PreLoader from '../components/PreLoader/PreLoader';

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userId } = useParams<string>();

  const user = useSelector((state: RootState) => state.currentUser);
  const meId = useSelector((state: RootState) => state.me?._id);
  const meRole = useSelector((state: RootState) => state.me?.role);
  const drafts = useSelector((state: RootState) => state.drafts);

  const isEdit = userId === meId;
  const isModerator = meRole?.includes('admin');
  const isLoading = user === null;

  const tabs = [
    {
      key: '1',
      label: 'Статьи',
      children: <PostsPreviewBoard posts={user?.posts} />,
    },
    {
      key: '2',
      label: 'Комментарии',
      children: <CommentsPreviewBoard comments={user?.comments} />,
    },
    {
      key: '3',
      label: 'Лайки',
      children: <PostsPreviewBoard posts={user?.likes} />,
    },
    {
      key: '4',
      label: 'Черновики',
      children: <DraftsBoard drafts={drafts} />,
      disabled: !isEdit,
    },
    {
      key: '5',
      label: 'Пошалить(помодерить)',
      disabled: !isEdit || !isModerator,
    },
    {
      key: '6',
      label: 'Тестовая вкладка',
      children: <TestComponent />,
      disabled: !isEdit,
    },
  ];

  useEffect(() => {
    dispatch(loadCurrentUserAction());
    dispatch(loadDraftsAction());
    dispatch(loadUser(userId));
    dispatch(loadDraftsForUser());
  }, [dispatch, userId]);

  const tabsHandler = (tabKey) => {
    if (tabKey === '5') {
      navigate('/drafts');
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            colorText: 'rgb(0,0,0)',
            colorPrimary: 'rgb(0,0,0)',
            colorPrimaryActive: 'rgba(0,0,0,0.4)',
            colorPrimaryHover: 'rgba(0,0,0,0.4)',
          },
        },
      }}
    >
      <LimitedContainer>
        <UserBlock isEdit={isEdit} />
        <PreLoader loading={isLoading} />
        <Tabs defaultActiveKey="1" items={tabs} onChange={tabsHandler} />
      </LimitedContainer>
    </ConfigProvider>
  );
}

export default ProfilePage;
