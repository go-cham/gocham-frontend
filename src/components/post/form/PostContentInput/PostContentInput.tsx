import { ChangeEvent, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { twMergeCustom } from '@/libs/tw-merge';

interface PostContentInputProps {
  error?: string | null;
  register?: UseFormRegisterReturn;
}

export default function PostContentInput({
  error,
  register,
}: PostContentInputProps) {
  const MAX_LENGTH = 280;
  const [enteredContent, setEnteredContent] = useState('');

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEnteredContent(e.target.value);
  };

  return (
    <div className="flex w-[34rem] flex-col">
      <label className="text-subheading">내용</label>
      <textarea
        {...register}
        rows={6}
        maxLength={280}
        placeholder={`최대 ${MAX_LENGTH}자 입력`}
        className={twMergeCustom(
          'mt-[1.1rem] resize-none border-b-[0.2rem] border-custom-gray-500 bg-transparent pb-[0.7rem] text-body4 text-custom-text-900 placeholder:text-body3 placeholder:text-custom-text-400 focus:-mb-[0.2rem] focus:border-b-[0.4rem] focus:border-custom-gray-800',
          error &&
            'border-custom-semantic-warn-500 focus:border-custom-semantic-warn-500'
        )}
        onChange={handleContentChange}
      />
      <div className="mt-[0.7rem] flex items-center justify-between">
        <span className="text-body1 text-custom-semantic-warn-500">
          {error || ''}
        </span>
        <span className="self-end text-body1 text-custom-text-400">{`${enteredContent.length}/${MAX_LENGTH}`}</span>
      </div>
    </div>
  );
}
