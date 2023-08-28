import { range } from 'lodash';
import { FormEvent, useEffect, useState } from 'react';
import { focusById } from '@/common/utils/dom/focus-by-id';
import { validatePostForm } from '@/common/utils/validations/post-form';
import { PostFormData } from '@/features/posts/types/post-form';

const MIN_NUM_VOTE_OPTIONS = 2;
export const MAX_NUM_VOTE_OPTIONS = 4;
const FIELD = ['title', 'content', 'category', 'deadline', 'voteOptions'];

export default function usePostForm({
  initialData,
  onSubmit,
  onChange,
}: {
  initialData?: PostFormData;
  onSubmit: (data: PostFormData) => void;
  onChange: (data: PostFormData) => void;
}) {
  const [formData, setFormData] = useState<PostFormData>(
    initialData || {
      title: '',
      content: '',
      images: [],
      voteOptions: range(MIN_NUM_VOTE_OPTIONS).map(() => ({
        label: '',
        image: null,
      })),
    },
  );
  const [showError, setShowError] = useState(false);
  const [errorMessage, voteOptionErrorIndex] = validatePostForm(formData);

  const handleVoteOptionAdd = () => {
    setFormData({
      ...formData,
      voteOptions: [...formData.voteOptions, { label: '', image: null }],
    });
  };

  const handleImageDelete = (index: number) => () => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  const handleMainImageUpload = (file: File) => {
    setFormData({
      ...formData,
      images: [...formData.images, { file, url: URL.createObjectURL(file) }],
    });
  };

  const handleTitleChange = (title: string) => {
    setFormData({ ...formData, title });
  };
  const handleContentChange = (content: string) => {
    setFormData({ ...formData, content });
  };
  const handleCategoryChange = (categoryId: number) => {
    setFormData({ ...formData, categoryId });
  };
  const handleDeadlineChange = (deadline: number) => {
    setFormData({ ...formData, deadline });
  };
  const handleVoteOptionChange = (index: number) => (label: string) => {
    const newVoteOptions = [...formData.voteOptions];
    newVoteOptions[index].label = label;
    setFormData({ ...formData, voteOptions: newVoteOptions });
  };

  const handleVoteOptionImageUpload = (index: number) => (file: File) => {
    const newVoteOptions = formData?.voteOptions
      ? [...formData.voteOptions]
      : [];
    newVoteOptions[index].image = { file, url: URL.createObjectURL(file) };

    setFormData({
      ...formData,
      voteOptions: newVoteOptions,
    });
  };

  const handleVoteOptionImageDelete = (index: number) => () => {
    const newVoteOptions = [...formData.voteOptions];
    newVoteOptions[index].image = null;
    setFormData({ ...formData, voteOptions: newVoteOptions });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowError(true);

    if (!hasAnyError()) {
      onSubmit(formData);
    } else {
      let focusTo = '';
      for (const field of FIELD) {
        if (errorMessage[field]) {
          alert(errorMessage[field]);
          focusTo = field;
          break;
        }
      }
      if (focusTo === 'voteOptions') {
        focusById(`post-form-${focusTo}${voteOptionErrorIndex}`);
      } else {
        focusById(`post-form-${focusTo}`);
      }
    }
  };

  const hasAnyError = () => {
    let hasError = false;
    Object.values(errorMessage).forEach((value) => {
      if (value) {
        hasError = true;
      }
    });
    return hasError;
  };

  useEffect(() => {
    onChange(formData);
  }, [formData, onChange]);

  return {
    formData,
    errorMessage,
    showError,
    voteOptionErrorIndex,
    handlers: {
      voteOptionAdd: handleVoteOptionAdd,
      imageDelete: handleImageDelete,
      mainImageUpload: handleMainImageUpload,
      titleChange: handleTitleChange,
      contentChange: handleContentChange,
      categoryChange: handleCategoryChange,
      deadlineChange: handleDeadlineChange,
      voteOptionChange: handleVoteOptionChange,
      voteOptionImageUpload: handleVoteOptionImageUpload,
      voteOptionImageDelete: handleVoteOptionImageDelete,
      submit: handleSubmit,
    },
  };
}
