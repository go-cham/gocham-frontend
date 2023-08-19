import { DockedButton, EditButton } from '@/common/components/ui/buttons';
import { Select } from '@/common/components/ui/selections';
import { CATEGORY_OPTIONS, DEADLINE_OPTIONS } from '@/common/constants/options';
import { ImagePreview } from '@/features/posts/components/form/ImagePreview';
import {
  PostContentInput,
  PostTitleInput,
  PostVoteInput,
} from '@/features/posts/components/form/index';
import {
  MAX_NUM_VOTE_OPTIONS,
  usePostForm,
} from '@/features/posts/hooks/usePostForm';
import { PostFormData } from '@/features/posts/types';

interface PostFormProps {
  mode: 'add' | 'edit';
  onSubmit: (data: PostFormData) => void;
  onChange: (data: PostFormData) => void;
  initialData?: PostFormData;
}

export function PostForm({
  mode,
  onSubmit,
  onChange,
  initialData,
}: PostFormProps) {
  const { formData, handlers, showError, errorMessage, voteOptionErrorIndex } =
    usePostForm({
      initialData,
      onSubmit,
      onChange,
    });

  const getErrorMessage = (field: string) => {
    return showError ? errorMessage[field] : '';
  };

  return (
    <form onSubmit={handlers.submit} className="flex h-full flex-col">
      <div className="hide-scrollbar flex-1 overflow-y-scroll px-[2.5rem] pb-10 pt-[3.1rem]">
        <PostTitleInput
          id="post-form-title"
          onChange={handlers.titleChange}
          onUploadImage={handlers.mainImageUpload}
          uploadDisabled={formData.images.length === 3}
          uploadDisabledMessage={'사진 첨부는 최대 3장까지 가능합니다.'}
          className="w-full"
          errorMessage={getErrorMessage('title')}
          defaultValue={formData.title}
        />
        <ImagePreview
          images={formData.images}
          onDelete={handlers.imageDelete}
        />
        <PostContentInput
          id="post-form-content"
          onChange={handlers.contentChange}
          className="mt-[3.7rem] w-full"
          errorMessage={getErrorMessage('content')}
          defaultValue={formData.content}
        />
        <div className="mt-[3.7rem] flex justify-between space-x-[2.6rem]">
          <Select
            id="post-form-category"
            label="카테고리"
            placeholder="선택"
            options={CATEGORY_OPTIONS}
            labelClassName="font-custom-subheading"
            wrapperClassName="w-full"
            onChange={handlers.categoryChange}
            value={
              CATEGORY_OPTIONS.find((o) => o.value === formData.categoryId)
                ?.label
            }
            errorMessage={getErrorMessage('category')}
          />
          <Select
            id="post-form-deadline"
            label="투표 마감 시간"
            placeholder="선택"
            options={DEADLINE_OPTIONS}
            labelClassName="font-custom-subheading"
            wrapperClassName="w-full"
            onChange={handlers.deadlineChange}
            value={
              DEADLINE_OPTIONS.find((o) => o.value === formData?.deadline)
                ?.label
            }
            readOnly={mode === 'edit'}
            errorMessage={getErrorMessage('deadline')}
          />
        </div>
        <div className="mt-[3.7rem] space-y-[1.2rem]">
          <div className="text-text-subTitle-700 font-custom-subheading">
            투표 항목
          </div>
          {formData.voteOptions
            .filter((option) => option.label !== null)
            .map((_, i) => (
              <PostVoteInput
                key={i}
                id={`post-form-voteOptions${i}`}
                image={
                  formData?.voteOptions ? formData.voteOptions[i].image : null
                }
                onChange={handlers.voteOptionChange(i)}
                className="w-full"
                onUploadImage={handlers.voteOptionImageUpload(i)}
                onDeleteImage={handlers.voteOptionImageDelete(i)}
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
            onClick={handlers.voteOptionAdd}
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
