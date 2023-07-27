import * as _ from 'lodash';
import { FormEvent, useEffect, useState } from 'react';

import useUser from '@/apis/hooks/users/useUser';
import PostContentInput from '@/components/post/form/PostContentInput';
import PostTitleInput from '@/components/post/form/PostTitleInput';
import PostVoteInput from '@/components/post/form/PostVoteInput';
import DockedButton from '@/components/ui/buttons/DockedButton';
import EditButton from '@/components/ui/buttons/EditButton';
import Select from '@/components/ui/selections/Select';
import { categoryOptions, deadlineOptions } from '@/constants/Options';
import { uploadFirebase } from '@/dataManager/firebaseManager';
import { resizeImage } from '@/dataManager/imageResizing';
import DeleteIcon from '@/images/Write/delete_icon.svg';

const MIN_NUM_VOTE_OPTIONS = 2;
const MAX_NUM_VOTE_OPTIONS = 4;

export interface PostFormData {
  title: string;
  content: string;
  images: {
    id?: number;
    url: string;
  }[];
  categoryId?: number;
  deadline?: number;
  voteOptions: {
    label: string;
    image: string | null;
  }[];
}

const FORM_FIELD = ['title', 'content', 'category', 'deadline', 'voteOptions'];

interface PostFormProps {
  mode: 'add' | 'edit';
  onSubmit: (data: PostFormData) => void;
  onChange: (data: PostFormData) => void;
  initialData?: PostFormData;
}

export default function PostForm({
  mode,
  onSubmit,
  onChange,
  initialData,
}: PostFormProps) {
  const { user } = useUser();
  const initialFormData: PostFormData = {
    title: '',
    content: '',
    images: [],
    voteOptions: _.range(MIN_NUM_VOTE_OPTIONS).map(() => ({
      label: '',
      image: null,
    })),
  };
  const [formData, setFormData] = useState<PostFormData>(
    initialData || initialFormData
  );
  const [showError, setShowError] = useState(false);
  let voteOptionErrorIndex: null | number = null;
  const errorMessage = validate();

  function validate() {
    const errorMessage: Record<string, string> = {};
    const { title, content, deadline, categoryId, voteOptions } = formData;
    if (!title) {
      errorMessage.title = '제목을 입력해주세요.';
    } else if (title.length < 2) {
      errorMessage.title = '제목을 최소 2자 이상 입력해주세요.';
    }
    if (!content) {
      errorMessage.content = '내용을 입력해주세요.';
    } else if (content.length < 5) {
      errorMessage.content = '내용을 최소 5자 이상 입력해주세요.';
    }
    if (typeof categoryId !== 'number') {
      errorMessage.category = '카테고리를 선택해주세요.';
    }
    if (typeof deadline !== 'number') {
      errorMessage.deadline = '투표 마감 시간을 선택해주세요.';
    }
    for (let i = 0; i < voteOptions.length; i++) {
      const option = voteOptions[i];
      if (option.image && !option.label) {
        errorMessage.voteOptions = '투표 항목은 텍스트를 포함해야 합니다.';
        voteOptionErrorIndex = i;
        return errorMessage;
      }
    }
    let count = 0;
    for (const option of voteOptions) {
      if (option.label) {
        count += 1;
      }
    }
    if (count < 2) {
      errorMessage.voteOptions = '투표 항목을 2개 이상 입력해주세요.';
      for (let i = 0; i < voteOptions.length; i++) {
        const option = voteOptions[i];
        if (!option.label) {
          voteOptionErrorIndex = i;
          break;
        }
      }
    }

    const labels: string[] = [];
    for (let i = 0; i < voteOptions.length; i++) {
      const option = voteOptions[i];
      if (labels.includes(option.label)) {
        errorMessage.voteOptions =
          '동일한 투표 항목을 중복으로 작성하실 수 없습니다.';
        voteOptionErrorIndex = i;
        break;
      }
      if (option.label) {
        labels.push(option.label);
      }
    }
    return errorMessage;
  }

  function focusById(id: string) {
    const el = document.getElementById(id);
    el && el.focus();
  }

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
        console.log(newVoteOptions);
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
      for (const field of FORM_FIELD) {
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

  const getErrorMessage = (field: string) => {
    return showError ? errorMessage[field] : '';
  };

  useEffect(() => {
    onChange(formData);
  }, [formData]);

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col">
      <div className="hide-scrollbar flex-1 overflow-y-scroll px-[2.5rem] pb-10 pt-[3.1rem]">
        <PostTitleInput
          id="post-form-title"
          onChange={handleTitleChange}
          onUploadImage={handleMainImageUpload}
          uploadDisabled={formData.images.length === 3}
          uploadDisabledMessage={'사진 첨부는 최대 3장까지 가능합니다.'}
          className="w-full"
          errorMessage={getErrorMessage('title')}
          defaultValue={formData.title}
        />
        <div className="mt-[1.3rem] flex w-full space-x-[2.1rem]">
          {formData.images.map((image, index) => (
            <div
              key={image.id + image.url}
              className="relative h-[7.1rem] w-[7.1rem]"
            >
              <img
                src={image.url}
                alt={'업로드 이미지'}
                className="h-full w-full object-cover"
              />
              <img
                src={DeleteIcon}
                alt={'삭제 버튼'}
                onClick={handleImageDelete(index)}
                className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 cursor-pointer"
              />
            </div>
          ))}
        </div>
        <PostContentInput
          id="post-form-content"
          onChange={handleContentChange}
          className="mt-[3.7rem] w-full"
          errorMessage={getErrorMessage('content')}
          defaultValue={formData.content}
        />
        <div className="mt-[3.7rem] flex justify-between space-x-[2.6rem]">
          <Select
            id="post-form-category"
            label="카테고리"
            placeholder="선택"
            options={categoryOptions}
            labelClassName="font-custom-subheading"
            wrapperClassName="w-full"
            onChange={handleCategoryChange}
            value={
              categoryOptions.find((o) => o.value === formData.categoryId)
                ?.label
            }
            errorMessage={getErrorMessage('category')}
          />
          <Select
            id="post-form-deadline"
            label="투표 마감 시간"
            placeholder="선택"
            options={deadlineOptions}
            labelClassName="font-custom-subheading"
            wrapperClassName="w-full"
            onChange={handleDeadlineChange}
            value={
              deadlineOptions.find((o) => o.value === formData?.deadline)?.label
            }
            readOnly={mode === 'edit'}
            errorMessage={getErrorMessage('deadline')}
          />
        </div>
        <div className="mt-[3.7rem] space-y-[1.2rem]">
          <div className="text-text-subTitle-700 font-custom-subheading">
            투표 항목
          </div>
          {formData.voteOptions.map((_, i) => (
            <PostVoteInput
              key={i}
              id={`post-form-voteOptions${i}`}
              image={
                formData?.voteOptions ? formData.voteOptions[i].image : null
              }
              onChange={handleVoteOptionChange(i)}
              className="w-full"
              onUploadImage={handleVoteOptionImageUpload(i)}
              onDeleteImage={handleVoteOptionImageDelete(i)}
              readOnly={mode === 'edit'}
              hasError={showError && i === voteOptionErrorIndex}
              defaultValue={formData.voteOptions[i].label}
            />
          ))}
          <EditButton
            type="button"
            disabled={
              formData.voteOptions.length === MAX_NUM_VOTE_OPTIONS ||
              mode === 'edit'
            }
            onClick={handleVoteOptionAdd}
            className="w-full"
          >
            <span className="font-system-body4">
              투표 항목 추가({formData.voteOptions.length}/4)
            </span>
          </EditButton>
        </div>
      </div>
      <DockedButton type="submit" backgroundClassName="w-full" variant="line">
        {mode === 'add' ? '작성 완료' : '수정 완료'}
      </DockedButton>
    </form>
  );
}
