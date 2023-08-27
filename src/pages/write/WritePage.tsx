import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper, TopAppBar } from '@/common/components/layout';
import { Popup } from '@/common/components/ui/modal';
import { uploadImage } from '@/common/libs/cloudinary';
import { scrollRestorationAtom } from '@/common/states/scroll-restoration';
import getFutureDateTime from '@/common/utils/getFutureDateTime';
import { PostForm } from '@/features/posts/components/post-form/PostForm';
import { useAddPost } from '@/features/posts/queries';
import { PostFormData } from '@/features/posts/types/post-form';
import { useUser } from '@/features/user/queries';
import { PostUploadSuccess } from '@/pages/write/components/PostUploadSuccess';
import { PostUploading } from '@/pages/write/components/PostUploading';

export default function WritePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { mutate: addPost, isLoading, isSuccess, data } = useAddPost();
  const [hasChanges, setHasChanges] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
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

    setUploadLoading(true);
    const uploadPromises = [
      ...images.map((image) => uploadImage(image.file)),
      ...voteOptions.map(
        (option) => option.image && uploadImage(option.image.file),
      ),
    ];
    const result = (await Promise.all(uploadPromises)).filter(
      (url) => !!url,
    ) as string[];
    const numOfMainImages = images.length;
    setUploadLoading(false);

    addPost({
      title: title.trim(),
      content: content.trim(),
      files: result
        .slice(0, numOfMainImages)
        .map((url) => ({ url, contentType: 'image' })),
      userId: user?.id,
      expirationTime: getFutureDateTime(deadline),
      choices: voteOptions
        .filter((option) => !!option.label)
        .map((option, i) => ({
          sequenceNumber: i,
          label: option.label.trim(),
          url: result[numOfMainImages + i],
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
  }, [isSuccess, data, navigate]);

  if (isLoading || uploadLoading) {
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
    <PageWrapper>
      <TopAppBar title="글 작성" navigateAction={handleGoBack} />
      <div className="min-h-0 flex-1">
        <PostForm mode="add" onSubmit={handleUpload} onChange={handleChange} />
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
    </PageWrapper>
  );
}
