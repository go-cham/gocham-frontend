import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useEditPost from '@/apis/hooks/posts/useEditPost';
import useGetPost from '@/apis/hooks/posts/useGetPost';
import useUser from '@/apis/hooks/users/useUser';
import TopAppBar from '@/components/layout/TopAppBar';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Popup from '@/components/ui/modal/Popup';
import withAuth from '@/components/withAuth';
import PostForm, { PostFormData } from '@/pages/write/PostForm';

function EditPage() {
  const params = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { editPost, isLoading, isSuccess, data } = useEditPost();
  const [hasChanges, setHasChanges] = useState(false);
  const { user } = useUser();
  const { post } = useGetPost(params.id ? +params.id : undefined);

  const handleChange = ({
    title,
    content,
    images,
    categoryId,
  }: PostFormData) => {
    if (
      post &&
      (title !== post.title ||
        content !== post.content ||
        categoryId !== post.worryCategory.id ||
        images.length !== post.worryFiles.length ||
        !post.worryFiles.every((file) =>
          images.map((image) => image.url).includes(file.url)
        ))
    ) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  };

  const handleEdit = async (data: PostFormData) => {
    const { title, content, images, categoryId } = data;
    if (!user || !post || !categoryId) {
      return;
    }

    editPost({
      id: post.id,
      title,
      content,
      files: images.map((image) => ({ url: image.url, contentType: 'image' })),
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
      navigate(`/feed/${data.id}`);
    }
  }, [isSuccess, data]);

  const getDeadline = (expirationTime: string | null, createdAt: string) => {
    if (!expirationTime) {
      return 0;
    } else {
      return Math.floor(
        (new Date(expirationTime).getTime() +
          1000 -
          new Date(createdAt).getTime()) /
          1000 /
          3600
      );
    }
  };

  if (!post) {
    return null;
  }

  return (
    <>
      <div className="flex h-full flex-col">
        {isLoading && (
          <div className="absolute left-1/2 top-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2">
            <LoadingSpinner />
          </div>
        )}
        <TopAppBar title="글 수정" navigateAction={handleGoBack} />
        <div className="min-h-0 flex-1">
          <PostForm
            mode="edit"
            onSubmit={handleEdit}
            onChange={handleChange}
            initialData={{
              title: post.title,
              content: post.content,
              images: post.worryFiles
                .map((file) => ({
                  id: file.id,
                  url: file.url,
                }))
                .sort((a, b) => a.id - b.id),
              categoryId: post.worryCategory.id,
              voteOptions: post.worryChoices.map((choice) => ({
                label: choice.label,
                image: choice.url,
              })),
              deadline: getDeadline(post.expirationTime, post.createdAt),
            }}
          />
        </div>
      </div>
      <Popup
        isOpen={modalOpen}
        text={`글 수정을 취소하겠습니까?`}
        subText="지금까지 작성한 내용이 삭제됩니다."
        buttonLabel={`글 수정 취소`}
        onCancel={() => setModalOpen(false)}
        onClickButton={() => navigate(-1)}
        useCancelIcon={true}
        useCancelButton={false}
      />
    </>
  );
}

export default withAuth(EditPage, { block: 'unauthenticated' });
