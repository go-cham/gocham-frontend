import { debounce } from 'lodash';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useAddPost from '@/apis/hooks/posts/useAddPost';
import useUser from '@/apis/hooks/users/useUser';
import TopAppBar from '@/components/layout/TopAppBar';
import PostContentInput from '@/components/post/form/PostContentInput/PostContentInput';
import PostTitleInput from '@/components/post/form/PostTitleInput/PostTitleInput';
import PostVoteInput from '@/components/post/form/PostVoteInput/PostVoteInput';
import DockedButton from '@/components/ui/buttons/DockedButton';
import EditButton from '@/components/ui/buttons/EditButton/EditButton';
import Select from '@/components/ui/selections/Select';
import withAuth from '@/components/withAuth';
import {
  OptionType,
  categoryOptions,
  deadlineOptions,
} from '@/constants/Options';
import { uploadFirebase } from '@/dataManager/firebaseManager';
import { resizeImage } from '@/dataManager/imageResizing';
import DeleteIcon from '@/images/Write/delete_icon.svg';
import { alertMessage } from '@/utils/alertMessage';
import getFutureDateTime from '@/utils/getFutureDateTime';

type WriteContentType = {
  title: string;
  content: string;
  category: OptionType;
  deadline: OptionType;
};

type PostWriteContentType = {
  title: string;
  content: string;
  worryCategoryId: number;
  expirationTime: string;
  userId: number;
  choices: { label: string; url: string; sequenceNumber: number }[];
  files: {
    url: string;
    contentType: string;
  }[];
};

function WritePage() {
  const navigate = useNavigate();
  const { addPost, data, error } = useAddPost();
  const imageInput = useRef<HTMLInputElement | null>(null);
  const [votingNum, setVotingnum] = useState(2);
  const [titleLength, setTitleLength] = useState(0);
  const [postInputError, setPostInputError] = useState<string | null>(null);
  const [postTitleError, setPostTitleError] = useState<string | null>(null);
  const [contentLength, setContentLength] = useState(0);
  const [voteTimeValue, setVoteTimeValue] = useState(-1);
  const [categoryValue, setCategoryValue] = useState(-1);
  const [categorySelectErrorMsg, setCategorySelectErrorMsg] = useState<
    string | null
  >(null);
  const [voteTimeSelectErrorMsg, setVoteTimeSelectErrorMsg] = useState<
    string | null
  >(null);
  const [imageFile, setImageFile] = useState<string[]>([]);
  const [vote1State, setVote1State] = useState(['', '']);
  const [vote2State, setVote2State] = useState(['', '']);
  const [vote3State, setVote3State] = useState(['', '']);
  const [vote4State, setVote4State] = useState(['', '']);
  const [vote1Error, setVote1Error] = useState(false);
  const [vote2Error, setVote2Error] = useState(false);
  const [vote3Error, setVote3Error] = useState(false);
  const [vote4Error, setVote4Error] = useState(false);
  const { user } = useUser();

  const handlePostUpload = async () => {
    if (!user) return false;
    const expirationTime = getFutureDateTime(votingContent.deadline?.value);

    const postData: PostWriteContentType = {
      title: votingContent.title,
      expirationTime: expirationTime,
      content: votingContent.content,
      userId: user.id,
      worryCategoryId: votingContent.category.value,
      choices: [],
      files: [],
    };

    if (vote1State[0] !== '' || vote1State[1] !== '') {
      postData.choices.push({
        label: vote1State[0],
        url: vote1State[1],
        sequenceNumber: 1,
      });
    }

    if (vote2State[0] !== '' || vote2State[1] !== '') {
      postData.choices.push({
        label: vote2State[0],
        url: vote2State[1],
        sequenceNumber: 2,
      });
    }

    if (vote3State[0] !== '' || vote3State[1] !== '') {
      postData.choices.push({
        label: vote3State[0],
        url: vote3State[1],
        sequenceNumber: 3,
      });
    }

    if (vote4State[0] !== '' || vote4State[1] !== '') {
      postData.choices.push({
        label: vote4State[0],
        url: vote4State[1],
        sequenceNumber: 4,
      });
    }

    let imgUrl = null;
    if (imageFile.length !== 0) {
      imageFile.forEach(async (file) => {
        try {
          // 업로드 과정
          imgUrl = await uploadFirebase(user.id, file, 'posting');
          // postData에 끼워넣기
          postData.files.push({ url: imgUrl, contentType: 'image' });
        } catch (e) {
          console.error(e);
        }
      });
    }
    console.log(postData);
    // 포스팅 업로드
    await addPost(postData);
  };

  useEffect(() => {
    if (data) {
      navigate(`/feed/${data.id}`);
    }
    if (error) {
      console.error(error);
      alert(alertMessage.error.post.noUploadPermission);
    }
  }, [data, error]);

  const debouncedHandlePushPost = debounce(handlePostUpload, 3000);
  const handlePushPost = () => {
    debouncedHandlePushPost();
  };

  const [votingContent, setVotingContent] = useState<WriteContentType>({
    title: '',
    content: '',
    category: { value: 0, label: '' },
    deadline: deadlineOptions[0],
  });

  const imgRef = useRef<HTMLInputElement>(null);
  const vote1ImgRef = useRef<HTMLInputElement>(null);
  const vote2ImgRef = useRef<HTMLInputElement>(null);
  const vote3ImgRef = useRef<HTMLInputElement>(null);
  const vote4ImgRef = useRef<HTMLInputElement>(null);

  const addVotingClicked = () => {
    setVotingnum((prev) => prev + 1);
  };

  const handleImageRemove: MouseEventHandler<HTMLImageElement> = (e) => {
    const target = e.target as HTMLImageElement | null;
    const imageUrl = target?.parentElement?.querySelector('img')?.src;
    const newImageFile = imageFile.filter((img) => img !== imageUrl);
    setImageFile(newImageFile);
  };

  const onLoadFiles = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (imageFile.length === 3) {
      alert('사진 첨부는 최대 3장까지 가능합니다.');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files![0]);
    reader.onload = (event: ProgressEvent<FileReader>): void => {
      resizeImage(event.target?.result as string).then((result) =>
        setImageFile((prev) => {
          return [...prev, result];
        })
      );
      if (imgRef.current) {
        imgRef.current.src = event.target?.result as string;
      }
    };
  };

  const postTitleImgBtnClicked = () => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  };

  const contentInputChanged = (e: string) => {
    setContentLength(e.length);
    setVotingContent((prev) => {
      return {
        ...prev,
        content: e,
      };
    });
    if (e.length < 5) {
      setPostInputError('최소 5자 이상 입력해주세요.');
    } else {
      setPostInputError(null);
    }
  };

  const postTitleChanged = (e: string) => {
    setTitleLength(e.length);
    setVotingContent((prev) => {
      return {
        ...prev,
        title: e,
      };
    });
    if (e.length < 2) {
      setPostTitleError('최소 2자 이상 입력해주세요.');
    } else {
      setPostTitleError(null);
    }
  };

  const categorySelectChanged = (e: number) => {
    setCategoryValue(e);
    let categoryName = '';
    categoryOptions.forEach((option) => {
      if (option.value === e) {
        categoryName = option.label;
      }
    });
    setVotingContent((prev) => {
      return {
        ...prev,
        category: {
          value: e,
          label: categoryName,
        },
      };
    });
    if (categorySelectErrorMsg !== null) {
      setCategorySelectErrorMsg(null);
    }
  };

  const voteTimeSelectChanged = (e: number) => {
    setVoteTimeValue(e);
    let dueTime = '';
    deadlineOptions.forEach((option) => {
      if (option.value === e) {
        dueTime = option.label;
      }
    });
    setVotingContent((prev) => {
      return {
        ...prev,
        deadline: {
          value: e,
          label: dueTime,
        },
      };
    });
    if (voteTimeSelectErrorMsg !== null) {
      setVoteTimeSelectErrorMsg(null);
    }
  };

  const vote1Changed = (e: string) => {
    setVote1State((prev) => {
      return [e, vote1State[1]];
    });
    if (setVote1Error) {
      setVote1Error(false);
    }
  };
  const vote2Changed = (e: string) => {
    setVote2State([e, vote2State[1]]);
    if (setVote2Error) {
      setVote2Error(false);
    }
  };
  const vote3Changed = (e: string) => {
    setVote3State([e, vote3State[1]]);
    if (setVote3Error) {
      setVote3Error(false);
    }
  };
  const vote4Changed = (e: string) => {
    setVote4State([e, vote4State[1]]);
    if (setVote4Error) {
      setVote4Error(false);
    }
  };

  const vote1ImageAddClicked = () => {
    if (vote1ImgRef.current) {
      vote1ImgRef.current.click();
    }
  };

  const vote2ImageAddClicked = () => {
    if (vote2ImgRef.current) {
      vote2ImgRef.current.click();
    }
  };

  const vote3ImageAddClicked = () => {
    if (vote3ImgRef.current) {
      vote3ImgRef.current.click();
    }
  };

  const vote4ImageAddClicked = () => {
    if (vote4ImgRef.current) {
      vote4ImgRef.current.click();
    }
  };

  const vote1ImgSetted = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files![0]);
    let imgUrl = '';
    reader.onload = (event: ProgressEvent<FileReader>): void => {
      resizeImage(event.target?.result as string).then(async (result) => {
        imgUrl = await uploadFirebase(user?.id, result, 'posting');
        setVote1State([vote1State[0], imgUrl]);
        return;
      });
    };
  };

  const vote2ImgSetted = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files![0]);
    let imgUrl = '';
    reader.onload = (event: ProgressEvent<FileReader>): void => {
      resizeImage(event.target?.result as string).then(async (result) => {
        imgUrl = await uploadFirebase(user?.id, result, 'posting');
        setVote2State([vote2State[0], imgUrl]);
        return;
      });
    };
  };

  const vote3ImgSetted = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files![0]);
    reader.onload = (event: ProgressEvent<FileReader>): void => {
      resizeImage(event.target?.result as string).then((result) => {
        setVote3State([vote3State[0], result]);
        return;
      });
    };
  };

  const vote4ImgSetted = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files![0]);
    reader.onload = (event: ProgressEvent<FileReader>): void => {
      resizeImage(event.target?.result as string).then((result) => {
        setVote4State([vote4State[0], result]);
        return;
      });
    };
  };

  const vote1ImageDeleteClicked = () => {
    setVote1State((prev) => {
      return [vote1State[0], ''];
    });
  };

  const vote2ImageDeleteClicked = () => {
    setVote2State((prev) => {
      return [vote2State[0], ''];
    });
  };

  const vote3ImageDeleteClicked = () => {
    setVote3State((prev) => {
      return [vote3State[0], ''];
    });
  };

  const vote4ImageDeleteClicked = () => {
    setVote4State((prev) => {
      return [vote4State[0], ''];
    });
  };

  const doneBtnClicked = () => {
    let voteNum = 0;
    if (vote1State[0].length > 0) {
      voteNum += 1;
    }
    if (vote2State[0].length > 0) {
      voteNum += 1;
    }
    if (vote3State[0].length > 0) {
      voteNum += 1;
    }
    if (vote4State[0].length > 0) {
      voteNum += 1;
    }
    if (titleLength === 0) {
      alert('제목을 입력해주세요.');
      setPostTitleError('최소 2자 이상 입력해주세요.');
      return;
    }
    if (titleLength < 2) {
      alert('최소 2자 이상 입력해주세요.');
      return;
    }
    if (contentLength === 0) {
      alert('내용을 입력해주세요.');
      setPostInputError('최소 5자 이상 입력해주세요.');
      return;
    }
    if (contentLength < 5) {
      alert('최소 5자 이상 입력해주세요.');
      return;
    }
    if (categoryValue === -1) {
      alert('내용에 맞는 카테고리를 선택해주세요.');
      setCategorySelectErrorMsg('카테고리를 선택해주세요.');
      return;
    }
    if (voteTimeValue === -1) {
      alert('투표 마감 시간을 선택해주세요.');
      setVoteTimeSelectErrorMsg('투표 마감 시간을 선택해주세요.');
      return;
    }
    if (voteNum < 2) {
      if (vote1State[0] === '' && vote1State[1] !== '') {
        alert('투표 항목은 텍스트를 포함해야 합니다.');
        setVote1Error(true);
        return;
      }
      if (vote2State[0] === '' && vote2State[1] !== '') {
        alert('투표 항목은 텍스트를 포함해야 합니다.');
        setVote2Error(true);
        return;
      }
      if (vote3State[0] === '' && vote3State[1] !== '') {
        alert('투표 항목은 텍스트를 포함해야 합니다.');
        setVote3Error(true);
        return;
      }
      if (vote4State[0] === '' && vote4State[1] !== '') {
        alert('투표 항목은 텍스트를 포함해야 합니다.');
        setVote4Error(true);
        return;
      }
      alert('투표 항목을 2개 이상 입력해주세요.');
      if (vote1State[0].length === 0) {
        setVote1Error(true);
        return;
      }
      if (vote2State[0].length === 0) {
        setVote2Error(true);
        return;
      }
    }
    if (vote1State[0] === '' && vote1State[1] !== '') {
      alert('투표 항목은 텍스트를 포함해야 합니다.');
      setVote1Error(true);
      return;
    }
    if (vote2State[0] === '' && vote2State[1] !== '') {
      alert('투표 항목은 텍스트를 포함해야 합니다.');
      setVote2Error(true);
      return;
    }
    if (vote3State[0] === '' && vote3State[1] !== '') {
      alert('투표 항목은 텍스트를 포함해야 합니다.');
      setVote3Error(true);
      return;
    }
    if (vote4State[0] === '' && vote4State[1] !== '') {
      alert('투표 항목은 텍스트를 포함해야 합니다.');
      setVote4Error(true);
      return;
    }
    handlePushPost();
  };

  return (
    <div className="flex h-full flex-col">
      <TopAppBar title={'글 작성'} navigateRoute="/" />
      <div className="hide-scrollbar flex-1 overflow-y-scroll px-[2.5rem] pb-[2.1rem] pt-[3.1rem]">
        <input
          onChange={onLoadFiles}
          type="file"
          style={{ display: 'none' }}
          accept="image/*"
          ref={imageInput}
        />
        <PostTitleInput
          onChange={postTitleChanged}
          onUploadImage={postTitleImgBtnClicked}
          errorMessage={postTitleError}
          className="w-full"
        />
        <div className="mt-[1.3rem] flex w-full">
          {imageFile &&
            imageFile.map((imgUrl) => (
              <div
                key={imgUrl}
                className="relative mr-[1rem] h-[7.1rem] w-[7.1rem]"
              >
                <img
                  src={imgUrl}
                  alt={'업로드 이미지'}
                  className="h-full w-full object-cover"
                />
                <img
                  src={DeleteIcon}
                  alt={'삭제 버튼'}
                  onClick={handleImageRemove}
                  className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2"
                />
              </div>
            ))}
        </div>
        <PostContentInput
          onChange={contentInputChanged}
          errorMessage={postInputError}
          className="mt-[3.7rem] w-full"
        />
        <div className="mt-[3.7rem] flex justify-between space-x-[2.6rem]">
          <Select
            id="category"
            label="카테고리"
            placeholder="선택"
            options={categoryOptions}
            errorMessage={categorySelectErrorMsg}
            labelClassName="text-subheading"
            wrapperClassName="w-full"
            onChange={categorySelectChanged}
            value={
              categoryOptions.find((o) => o.value === categoryValue)?.label
            }
          />
          <Select
            id="voteTime"
            label="투표 마감 시간"
            placeholder="선택"
            options={deadlineOptions}
            errorMessage={voteTimeSelectErrorMsg}
            labelClassName="text-subheading"
            wrapperClassName="w-full"
            onChange={voteTimeSelectChanged}
            value={
              deadlineOptions.find((o) => o.value === voteTimeValue)?.label
            }
          />
        </div>
        <div className="mt-[3.7rem] space-y-[1.2rem]">
          <div className="text-subheading">투표 항목</div>
          <input
            onChange={vote1ImgSetted}
            type="file"
            style={{ display: 'none' }}
            accept="image/jpg,impge/png,image/jpeg"
            ref={vote1ImgRef}
          />
          <input
            onChange={vote2ImgSetted}
            type="file"
            style={{ display: 'none' }}
            accept="image/jpg,impge/png,image/jpeg"
            ref={vote2ImgRef}
          />
          <input
            onChange={vote3ImgSetted}
            type="file"
            style={{ display: 'none' }}
            accept="image/jpg,impge/png,image/jpeg"
            ref={vote3ImgRef}
          />
          <input
            onChange={vote4ImgSetted}
            type="file"
            style={{ display: 'none' }}
            accept="image/jpg,impge/png,image/jpeg"
            ref={vote4ImgRef}
          />
          <PostVoteInput
            image={vote1State[1]}
            onChange={vote1Changed}
            className="w-full"
            hasError={vote1Error}
            onUploadImage={vote1ImageAddClicked}
            onDeleteImage={vote1ImageDeleteClicked}
          />
          <PostVoteInput
            image={vote2State[1]}
            onChange={vote2Changed}
            className="w-full"
            hasError={vote2Error}
            onUploadImage={vote2ImageAddClicked}
            onDeleteImage={vote2ImageDeleteClicked}
          />
          {votingNum >= 3 ? (
            <PostVoteInput
              image={vote3State[1]}
              onUploadImage={vote3ImageAddClicked}
              hasError={vote3Error}
              onChange={vote3Changed}
              onDeleteImage={vote3ImageDeleteClicked}
              className="w-full"
            />
          ) : null}
          {votingNum === 4 ? (
            <PostVoteInput
              image={vote4State[1]}
              onUploadImage={vote4ImageAddClicked}
              hasError={vote4Error}
              onChange={vote4Changed}
              onDeleteImage={vote4ImageDeleteClicked}
              className="w-full"
            />
          ) : null}
          <EditButton
            disabled={votingNum === 4}
            onClick={addVotingClicked}
            className="w-full"
          >
            <span className="text-body4">투표 항목 추가({votingNum}/4)</span>
          </EditButton>
        </div>
      </div>
      <DockedButton
        onClick={doneBtnClicked}
        backgroundClassName="w-full"
        variant="line"
      >
        작성 완료
      </DockedButton>
    </div>
  );
}

export default withAuth(WritePage, { block: 'unauthenticated' });
