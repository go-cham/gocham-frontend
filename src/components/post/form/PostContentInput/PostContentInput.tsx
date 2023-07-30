import { ChangeEvent, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const MAX_LENGTH = 280;

interface PostContentInputProps {
  id?: string;
  onChange?: (content: string) => void;
  errorMessage?: string | null;
  className?: string;
  defaultValue?: string;
}

export default function PostContentInput({
  id,
  onChange,
  errorMessage,
  className,
  defaultValue,
}: PostContentInputProps) {
  const [content, setContent] = useState(defaultValue || '');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    onChange && onChange(newContent);
  };

  return (
    <div className={twMerge('flex w-[34rem] flex-col', className)}>
      <label className="font-custom-subheading">내용</label>
      <textarea
        id={id}
        rows={6}
        maxLength={280}
        placeholder={`최대 ${MAX_LENGTH}자 입력`}
        className={twMerge(
          'mt-[1.1rem] resize-none break-all border-b-[0.2rem] border-text-explain-500 bg-transparent pb-[0.7rem] font-system-body4 placeholder:text-text-subExplain-400 placeholder:font-system-body3 focus:-mb-[0.2rem] focus:border-b-[0.4rem] focus:border-text-subTitle-700',
          errorMessage &&
            'border-semantic-warn-500 focus:border-semantic-warn-500'
        )}
        onChange={handleChange}
        value={content}
      />
      <div className="mt-[0.7rem] flex items-center justify-between">
        <span className="text-semantic-warn-500 font-system-body1">
          {errorMessage || ''}
        </span>
        <span className="self-end text-text-subExplain-400 font-system-body1">{`${content.length}/${MAX_LENGTH}`}</span>
      </div>
    </div>
  );
}
