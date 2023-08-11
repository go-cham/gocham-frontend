import * as _ from 'lodash';
import { FormEvent, useEffect, useState } from 'react';

import useUser from '@/apis/hooks/users/useUser';
import { uploadFirebase } from '@/dataManager/firebaseManager';
import { resizeImage } from '@/dataManager/imageResizing';
import { PostFormData } from '@/types/post';
import { focusById } from '@/utils/dom/focus-by-id';
import { validatePostForm } from '@/utils/validations/postForm';

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
  const { user } = useUser();
  const [formData, setFormData] = useState<PostFormData>(
    initialData || {
      title: '',
      content: '',
      images: [],
      voteOptions: _.range(MIN_NUM_VOTE_OPTIONS).map(() => ({
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
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target?.result || !user) {
        return;
      }
      resizeImage(e.target.result.toString()).then(async (result) => {
        const imgUrl = await uploadFirebase(user.id, result, 'posting');
        setFormData({
          ...formData,
          images: [...formData.images, { url: imgUrl }],
        });
      });
    };
    reader.readAsDataURL(file);
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
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target?.result || !user) {
        return;
      }
      resizeImage(e.target.result.toString()).then(async (result) => {
        const imgUrl = await uploadFirebase(user.id, result, 'posting');
        const newVoteOptions = formData?.voteOptions
          ? [...formData.voteOptions]
          : [];
        newVoteOptions[index].image = imgUrl;
        setFormData({ ...formData, voteOptions: newVoteOptions });
      });
    };
    reader.readAsDataURL(file);
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
  }, [formData]);

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
