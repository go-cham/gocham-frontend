import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import useAddPost from '@/apis/hooks/posts/useAddPost';
import useUser from '@/apis/hooks/users/useUser';
import TopAppBar from '@/components/layout/TopAppBar';
import Popup from '@/components/ui/modal/Popup';
import withAuth from '@/components/withAuth';
import PostForm, { PostFormData } from '@/pages/write/PostForm';
import PostUploadSuccess from '@/pages/write/PostUploadSuccess';
import PostUploading from '@/pages/write/PostUploading';

function WritePage() {
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const location = useLocation();
  const params = useParams();
  const mode = location.pathname.endsWith('edit') ? 'edit' : 'new';
  const navigate = useNavigate();
  const { user } = useUser();
  const {
    addPost,
    isLoading: addPostLoading,
    isSuccess: addPostSuccess,
    error: addPostError,
    data: addPostResponse,
  } = useAddPost();

  const handlePostUpload = async (data: PostFormData) => {
    console.log(data);
    // console.log(user);
    // console.log(addPost);
    // console.log(addPostError);
    // console.log(addPostResponse);
  };

  const handleGoBack = () => {
    if (mode === 'edit' || mode === 'new') {
      setCancelModalOpen(true);
    } else {
      navigate(-1);
    }
  };

  if (addPostLoading) {
    return <PostUploading />;
  }

  if (addPostSuccess) {
    return <PostUploadSuccess />;
  }

  return (
    <>
      <div className="flex h-full flex-col">
        <TopAppBar
          title={mode === 'new' ? '글 작성' : '글 수정'}
          navigateAction={handleGoBack}
          navigateRoute={mode === 'new' ? '/' : `/feed/${params.id}`}
        />
        <div className="min-h-0 flex-1">
          <PostForm mode="new" onSubmit={handlePostUpload} />
        </div>
      </div>
      <Popup
        isOpen={cancelModalOpen}
        text={`글 작성을 취소하겠습니까?`}
        subText="지금까지 작성한 내용이 삭제됩니다."
        buttonLabel={`글 작성 취소`}
        onCancel={() => setCancelModalOpen(false)}
        onClickButton={() => navigate('/')}
        useCancelIcon={true}
        useCancelButton={false}
      />
    </>
  );
}

export default withAuth(WritePage, { block: 'unauthenticated' });
