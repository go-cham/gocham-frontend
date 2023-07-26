import * as _ from 'lodash';
import { FormEvent, useState } from 'react';

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
    image?: string;
  }[];
}

interface PostFormProps {
  mode: 'new' | 'edit';
  onSubmit: (data: PostFormData) => void;
}

export default function PostForm({ mode, onSubmit }: PostFormProps) {
  const { user } = useUser();
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    images: [],
    voteOptions: _.range(MIN_NUM_VOTE_OPTIONS).map(() => ({ label: '' })),
  });

  const handleVoteOptionAdd = () => {
    setFormData({
      ...formData,
      voteOptions: [...formData.voteOptions, { label: '' }],
    });
  };

  const handleImageDelete = (index: number) => () => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  const onLoadFiles = (file: File) => {
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
    newVoteOptions[index].image = undefined;
    setFormData({ ...formData, voteOptions: newVoteOptions });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col">
      <div className="hide-scrollbar flex-1 overflow-y-scroll px-[2.5rem] pb-10 pt-[3.1rem]">
        <PostTitleInput
          onChange={handleTitleChange}
          onUploadImage={onLoadFiles}
          className="w-full"
        />
        <div className="mt-[1.3rem] flex w-full space-x-[2.1rem]">
          {formData.images.map((image, index) => (
            <div key={image.url} className="relative h-[7.1rem] w-[7.1rem]">
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
          onChange={handleContentChange}
          className="mt-[3.7rem] w-full"
        />
        <div className="mt-[3.7rem] flex justify-between space-x-[2.6rem]">
          <Select
            id="category"
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
          />
          <Select
            id="voteTime"
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
          />
        </div>
        <div className="mt-[3.7rem] space-y-[1.2rem]">
          <div className="text-text-subTitle-700 font-custom-subheading">
            투표 항목
          </div>
          {formData.voteOptions.map((_, i) => (
            <PostVoteInput
              key={i}
              image={
                formData?.voteOptions
                  ? formData.voteOptions[i].image
                  : undefined
              }
              onChange={handleVoteOptionChange(i)}
              className="w-full"
              onUploadImage={handleVoteOptionImageUpload(i)}
              onDeleteImage={handleVoteOptionImageDelete(i)}
              readOnly={mode === 'edit'}
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
        {mode === 'new' ? '작성 완료' : '수정 완료'}
      </DockedButton>
    </form>
  );
}
