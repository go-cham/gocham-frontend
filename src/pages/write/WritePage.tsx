import {
  Fragment,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import useAddPost from '@/apis/hooks/posts/useAddPost';
import useEditPost from '@/apis/hooks/posts/useEditPost';
import useGetPost from '@/apis/hooks/posts/useGetPost';
import useUser from '@/apis/hooks/users/useUser';
import TopAppBar from '@/components/layout/TopAppBar';
import PostContentInput from '@/components/post/form/PostContentInput/PostContentInput';
import PostTitleInput from '@/components/post/form/PostTitleInput/PostTitleInput';
import PostVoteInput from '@/components/post/form/PostVoteInput/PostVoteInput';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
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

const MIN_NUM_VOTE_OPTIONS = 2;
const MAX_NUM_VOTE_OPTIONS = 4;

function WritePage() {
  const location = useLocation();
  const params = useParams();
  const mode = location.pathname.endsWith('edit') ? 'edit' : 'new';
  const navigate = useNavigate();
  const {
    addPost,
    isLoading: addPostLoading,
    isSuccess: addPostSuccess,
    error: addPostError,
    data: addPostResponse,
  } = useAddPost();
  const imageInput = useRef<HTMLInputElement | null>(null);
  const [votingNum, setVotingNum] = useState(2);
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
  const initialVoteState = Array(MAX_NUM_VOTE_OPTIONS)
    .fill(null)
    .map(() => ['', '']);
  const [voteState, setVoteState] = useState(initialVoteState);
  const [voteError, setVoteError] = useState(
    Array(MAX_NUM_VOTE_OPTIONS).fill(false)
  );
  const [votingContent, setVotingContent] = useState<WriteContentType>({
    title: '',
    content: '',
    category: { value: 0, label: '' },
    deadline: deadlineOptions[0],
  });
  const { user } = useUser();
  const { post } = useGetPost(params?.id ? +params.id : undefined);
  const {
    editPost,
    isLoading: editPostLoading,
    isSuccess: editPostSuccess,
    data: editPostResponse,
    error: editPostError,
  } = useEditPost();

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

    voteState.map((state, i) => {
      if (state[0] || state[1]) {
        postData.choices.push({
          label: state[0],
          url: state[1],
          sequenceNumber: i + 1,
        });
      }
    });

    imageFile.forEach((url) => {
      postData.files.push({ url, contentType: 'image' });
    });
    await addPost(postData);
  };

  const imgRef = useRef<HTMLInputElement>(null);
  const voteImgRef = Array(MAX_NUM_VOTE_OPTIONS)
    .fill(null)
    .map(() => useRef<HTMLInputElement>(null));

  const addVotingClicked = () => {
    setVotingNum(votingNum + 1);
  };

  const handleImageRemove: MouseEventHandler<HTMLImageElement> = (e) => {
    const target = e.target as HTMLImageElement | null;
    const imageUrl = target?.parentElement?.querySelector('img')?.src;
    const newImageFile = imageFile.filter((img) => img !== imageUrl);
    setImageFile(newImageFile);
  };

  const onLoadFiles = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('change');
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    let imgUrl = '';
    reader.onload = (event: ProgressEvent<FileReader>): void => {
      resizeImage(event.target?.result as string).then(async (result) => {
        imgUrl = await uploadFirebase(user?.id, result, 'posting');
        setImageFile((prev) => {
          return [...prev, imgUrl];
        });
      });
      if (imgRef.current) {
        imgRef.current.src = event.target?.result as string;
      }
    };
    e.target.value = '';
  };

  const postTitleImgBtnClicked = () => {
    if (imageInput.current) {
      if (imageFile.length === 3) {
        alert('사진 첨부는 최대 3장까지 가능합니다.');
        return;
      }
      console.log(imageInput.current?.files);
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

  const voteChanged = (index: number) => (text: string) => {
    const newVoteState = [...voteState];
    newVoteState[index][0] = text;
    setVoteState(newVoteState);
    if (text) {
      const newVoteError = [...voteError];
      newVoteError[index] = false;
      setVoteError(newVoteError);
    }
  };

  const voteImageAddClicked = (index: number) => () => {
    voteImgRef[index].current?.click();
  };

  const voteImgSetted =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files![0]);
      let imgUrl = '';
      reader.onload = (event: ProgressEvent<FileReader>): void => {
        resizeImage(event.target?.result as string).then(async (result) => {
          imgUrl = await uploadFirebase(user?.id, result, 'posting');
          const newVoteState = [...voteState];
          newVoteState[index][1] = imgUrl;
          setVoteState(newVoteState);
          return;
        });
      };
    };

  const voteImageDeleteClicked = (index: number) => () => {
    const newVoteState = [...voteState];
    newVoteState[index][1] = '';
    setVoteState(newVoteState);
  };

  const doneBtnClicked = async () => {
    const voteNum = voteState.filter((v) => !!v[0]).length;

    if (titleLength === 0) {
      setPostTitleError('최소 2자 이상 입력해주세요.');
      return alert('제목을 입력해주세요.');
    }
    if (titleLength < 2) {
      return alert('최소 2자 이상 입력해주세요.');
    }
    if (contentLength === 0) {
      setPostInputError('최소 5자 이상 입력해주세요.');
      return alert('내용을 입력해주세요.');
    }
    if (contentLength < 5) {
      return alert('최소 5자 이상 입력해주세요.');
    }
    if (categoryValue === -1) {
      setCategorySelectErrorMsg('카테고리를 선택해주세요.');
      return alert('내용에 맞는 카테고리를 선택해주세요.');
    }
    if (voteTimeValue === -1) {
      setVoteTimeSelectErrorMsg('투표 마감 시간을 선택해주세요.');
      return alert('투표 마감 시간을 선택해주세요.');
    }
    if (voteNum < 2) {
      for (let i = 0; i < MAX_NUM_VOTE_OPTIONS; i++) {
        if (!voteState[i][0] && voteState[i][1]) {
          const newVoteError = [...voteError];
          newVoteError[i] = true;
          setVoteError(newVoteError);
          return alert('투표 항목은 텍스트를 포함해야 합니다.');
        }
      }

      for (let i = 0; i < MIN_NUM_VOTE_OPTIONS; i++) {
        if (!voteState[i][0]) {
          const newVoteError = [...voteError];
          newVoteError[i] = true;
          setVoteError(newVoteError);
          return alert('투표 항목을 2개 이상 입력해주세요.');
        }
      }
    }

    for (let i = 0; i < MAX_NUM_VOTE_OPTIONS; i++) {
      if (!voteState[i][0] && voteState[i][1]) {
        const newVoteError = [...voteError];
        newVoteError[i] = true;
        setVoteError(newVoteError);
        return alert('투표 항목은 텍스트를 포함해야 합니다.');
      }
    }

    await handlePostUpload();
  };

  const handleEditPost = () => {
    if (!user || !post) {
      return;
    }

    editPost({
      id: post.id,
      title: votingContent.title,
      content: votingContent.content,
      worryCategoryId: votingContent.category.value,
      // files: imageFile.map((url) => ({ url, contentType: 'image' })),
    });
  };

  useEffect(() => {
    if (post) {
      setVotingContent({
        ...votingContent,
        title: post.title,
        content: post.content,
      });
      setCategoryValue(post.worryCategory.id);
      setVoteState(
        post.worryChoices.map((choice) => [choice.label, choice.url || ''])
      );
      setVotingNum(post.worryChoices.length - 1);
      setImageFile(post.worryFiles.map((file) => file.url));
    }
  }, [post]);

  useEffect(() => {
    if (addPostSuccess || editPostSuccess) {
      setTimeout(() => {
        navigate(`/feed/${addPostResponse?.id || editPostResponse?.id}`);
      }, 1000);
    }
    if (addPostError || editPostError) {
      alert('오류가 발생하였습니다.');
    }
  }, [addPostSuccess, editPostSuccess, editPostError, addPostError]);

  if (mode === 'edit' && !post) {
    return null;
  }

  if (addPostLoading || editPostLoading) {
    return (
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center space-y-[0.7rem]">
        <LoadingSpinner />
        <span className="text-mainSub-main-500 font-custom-subheading">
          업로드 중...
        </span>
      </div>
    );
  }

  if (addPostSuccess || editPostSuccess) {
    return (
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center space-y-[0.7rem]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M44.523 12.4745C45.159 13.1071 45.159 14.1329 44.523 14.7655L20.6373 38.5255C20.0013 39.1582 18.9701 39.1582 18.3341 38.5255L7.477 27.7255C6.841 27.0929 6.841 26.0671 7.477 25.4345C8.11299 24.8018 9.14415 24.8018 9.78015 25.4345L19.4857 35.089L42.2199 12.4745C42.8559 11.8418 43.887 11.8418 44.523 12.4745Z"
            fill="#FF7860"
            stroke="#FF7860"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-mainSub-main-500 font-custom-subheading">
          업로드 완료 !
        </span>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <TopAppBar
        title={mode === 'new' ? '글 작성' : '글 수정'}
        navigateRoute={mode === 'new' ? '/' : `/feed/${params.id}`}
      />
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
          defaultValue={votingContent.title || post?.title}
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
          defaultValue={votingContent.content || post?.content}
        />
        <div className="mt-[3.7rem] flex justify-between space-x-[2.6rem]">
          <Select
            id="category"
            label="카테고리"
            placeholder="선택"
            options={categoryOptions}
            errorMessage={categorySelectErrorMsg}
            labelClassName="font-custom-subheading"
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
            labelClassName="font-custom-subheading"
            wrapperClassName="w-full"
            onChange={voteTimeSelectChanged}
            value={
              deadlineOptions.find((o) => o.value === voteTimeValue)?.label
            }
            readOnly={mode === 'edit'}
          />
        </div>
        <div className="mt-[3.7rem] space-y-[1.2rem]">
          <div className="text-text-subTitle-700 font-custom-subheading">
            투표 항목
          </div>
          {Array(votingNum)
            .fill(null)
            .map((_, i) => (
              <Fragment key={i}>
                <input
                  onChange={voteImgSetted(i)}
                  type="file"
                  style={{ display: 'none' }}
                  accept="image/*"
                  ref={voteImgRef[i]}
                  className="hide"
                />
                <PostVoteInput
                  image={
                    mode === 'new'
                      ? voteState[i][1]
                      : post?.worryChoices[i].url || ''
                  }
                  onChange={voteChanged(i)}
                  className="w-full"
                  hasError={voteError[i]}
                  onUploadImage={voteImageAddClicked(i)}
                  onDeleteImage={voteImageDeleteClicked(i)}
                  readOnly={mode === 'edit'}
                  defaultValue={voteState[i][0] || post?.worryChoices[i].label}
                />
              </Fragment>
            ))}
          <EditButton
            disabled={votingNum === MAX_NUM_VOTE_OPTIONS || mode === 'edit'}
            onClick={addVotingClicked}
            className="w-full"
          >
            <span className="font-system-body4">
              투표 항목 추가({votingNum}/4)
            </span>
          </EditButton>
        </div>
      </div>
      <DockedButton
        onClick={mode === 'new' ? doneBtnClicked : handleEditPost}
        backgroundClassName="w-full"
        variant="line"
      >
        {mode === 'new' ? '작성 완료' : '수정 완료'}
      </DockedButton>
    </div>
  );
}

export default withAuth(WritePage, { block: 'unauthenticated' });
