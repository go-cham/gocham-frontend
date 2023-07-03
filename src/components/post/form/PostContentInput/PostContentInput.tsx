import { ChangeEvent, useState } from 'react';

import { twMergeCustom } from '@/libs/tw-merge';

const MAX_LENGTH = 280;

interface PostContentInputProps {
  onChange?: (content: string) => void;
  errorMessage?: string | null;
  className?: string;
}

export default function PostContentInput({
  onChange,
  errorMessage,
  className,
}: PostContentInputProps) {
  const [content, setContent] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    onChange && onChange(newContent);
  };

  return (
    <div className={twMergeCustom('flex w-[34rem] flex-col', className)}>
      <label className="text-subheading">내용</label>
      <textarea
        rows={6}
        maxLength={280}
        placeholder={`최대 ${MAX_LENGTH}자 입력`}
        className={twMergeCustom(
          'mt-[1.1rem] resize-none border-b-[0.2rem] border-custom-gray-500 bg-transparent pb-[0.7rem] text-body4 text-custom-text-900 placeholder:text-body3 placeholder:text-custom-text-400 focus:-mb-[0.2rem] focus:border-b-[0.4rem] focus:border-custom-gray-800',
          errorMessage &&
            'border-custom-semantic-warn-500 focus:border-custom-semantic-warn-500'
        )}
        onChange={handleChange}
        value={content}
      />
      <div className="mt-[0.7rem] flex items-center justify-between">
        <span className="text-body1 text-custom-semantic-warn-500">
          {errorMessage || ''}
        </span>
        <span className="self-end text-body1 text-custom-text-400">{`${content.length}/${MAX_LENGTH}`}</span>
      </div>
    </div>
  );
}
