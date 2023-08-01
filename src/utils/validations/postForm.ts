import { PostFormData } from '@/types/post';

export function validatePostForm(
  formData: PostFormData
): [Record<string, string>, number | null] {
  const errorMessage: Record<string, string> = {};
  let voteOptionErrorIndex: null | number = null;
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
      return [errorMessage, voteOptionErrorIndex];
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
  return [errorMessage, voteOptionErrorIndex];
}
