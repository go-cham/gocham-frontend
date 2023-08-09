import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useAddPost from '@/apis/hooks/posts/useAddPost';
import useUser from '@/apis/hooks/users/useUser';
import TopAppBar from '@/components/layout/TopAppBar';
import PostForm from '@/components/post/PostForm/PostForm';
import Popup from '@/components/ui/modal/Popup';
import withAuth from '@/components/withAuth';
import PostUploadSuccess from '@/pages/write/PostUploadSuccess';
import PostUploading from '@/pages/write/PostUploading';
import { scrollRestorationAtom } from '@/states/scroll-restoration';
import { PostFormData } from '@/types/post';
import getFutureDateTime from '@/utils/getFutureDateTime';

function WritePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { addPost, isLoading, isSuccess, data } = useAddPost();
  const [hasChanges, setHasChanges] = useState(false);
  const { user } = useUser();

  const handleChange = ({
    title,
    content,
    images,
    deadline,
    categoryId,
    voteOptions,
  }: PostFormData) => {
    if (
      title ||
      content ||
      categoryId ||
      typeof deadline === 'number' ||
      images.length > 0 ||
      voteOptions.some((option) => !!option.label || !!option.image)
    ) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  };
  const setScrollRestoration = useSetAtom(scrollRestorationAtom);

  const handleUpload = async (data: PostFormData) => {
    const { title, content, images, deadline, categoryId, voteOptions } = data;
    if (!user || typeof deadline !== 'number' || !categoryId) {
      return;
    }

    addPost({
      title: title.trim(),
      content: content.trim(),
      files: images.map((image) => ({ url: image.url, contentType: 'image' })),
      userId: user?.id,
      expirationTime: getFutureDateTime(deadline),
      choices: voteOptions
        .filter((option) => !!option.label)
        .map((option, i) => ({
          sequenceNumber: i,
          label: option.label.trim(),
          url: option.image || null,
        })),
      worryCategoryId: categoryId,
    });
  };

  const handleGoBack = () => {
    if (hasChanges) {
      setModalOpen(true);
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
      setTimeout(() => {
        navigate(`/user`);
      }, 1000);
    }
  }, [isSuccess, data]);

  if (isLoading) {
    return <PostUploading />;
  }

  if (isSuccess) {
    setScrollRestoration((prevScrollRestoration) => ({
      ...prevScrollRestoration,
      my: 0,
    }));
    sessionStorage.setItem('selectMyPostTypeLabel', 'my');

    return <PostUploadSuccess />;
  }

  return (
    <>
      <div className="flex h-full flex-col">
        <TopAppBar title="글 작성" navigateAction={handleGoBack} />
        <div className="min-h-0 flex-1">
          <PostForm
            mode="add"
            onSubmit={handleUpload}
            onChange={handleChange}
          />
        </div>
      </div>
      <Popup
        isOpen={modalOpen}
        text={`글 작성을 취소하겠습니까?`}
        subText="지금까지 작성한 내용이 삭제됩니다."
        buttonLabel={`글 작성 취소`}
        onCancel={() => setModalOpen(false)}
        onClickButton={() => navigate(-1)}
        useCancelIcon={true}
        useCancelButton={false}
      />
    </>
  );
}

export default withAuth(WritePage, { block: 'unauthenticated' });
