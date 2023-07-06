import { useAtomValue } from 'jotai';
import { debounce } from 'lodash';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StylesConfig } from 'react-select';

import useAddPost from '@/apis/hooks/posts/useAddPost';
import BottomContinueBar from '@/components/layout/BottomContinueBar';
import TopAppBar from '@/components/layout/TopAppBar';
import withAuth from '@/components/withAuth';
import {
  OptionType,
  categoryOptions,
  deadlineOptions,
} from '@/constants/Options';
import { uploadFirebase } from '@/dataManager/firebaseManager';
import { resizeImage } from '@/dataManager/imageResizing';
import DeleteIcon from '@/images/Write/delete_icon.svg';
import { userAtom } from '@/states/userData';
import palette from '@/styles/color';
import { alertMessage } from '@/utils/alertMessage';
import getFutureDateTime from '@/utils/getFutureDateTime';
import PostContentInput from '@/components/post/form/PostContentInput/PostContentInput';
import PostTitleInput from '@/components/post/form/PostTitleInput/PostTitleInput';
import Select from '@/components/ui/selections/Select/Select';
import EditButton from '@/components/ui/buttons/EditButton/EditButton';
import VoteButton from '@/components/ui/buttons/VoteButton/VoteButton';
import PostVoteInput from '@/components/post/form/PostVoteInput/PostVoteInput';
import Button from '@/components/ui/buttons/Button/Button';

type WriteContentType = {
  title: string;
  content: string;
  category: OptionType | null;
  deadline: OptionType;
  pros: string;
  cons: string;
};

type PostWriteContentType = {
  title: string;
  content: string;
  worryCategoryId: number;
  expirationTime: string | null;
  userId: number;
  choices: { label: string; sequenceNumber: number }[];
  files: {
    url: string;
    contentType: string;
  }[];
};

function WritePage() {
  const userInfo = useAtomValue(userAtom);
  const navigate = useNavigate();
  const { addPost, data, error } = useAddPost();
  const [votingNum,setVotingnum] = useState(2);

  const addVotingClicked = () => {
    setVotingnum(prev => prev + 1);
  }

  const handlePostUpload = async () => {
    if (!userInfo.userId) return false;
    const expirationTime = getFutureDateTime(votingContent.deadline?.value);
    // pros cons 미 입력시
    const pros = votingContent.pros === '' ? '찬성' : votingContent.pros;
    const cons = votingContent.cons === '' ? '반대' : votingContent.cons;

    const postData: PostWriteContentType = {
      title: votingContent.title,
      userId: userInfo.userId,
      content: votingContent.content,
      worryCategoryId: votingContent.category!.value,
      choices: [
        {
          label: pros,
          sequenceNumber: 1,
        },
        {
          label: cons,
          sequenceNumber: 2,
        },
      ],
      files: [],
      expirationTime: null,
    };
    // expirationTime 이 있으면 추가. (추후 개발에서 null 인 케이스 발생 예정
    if (expirationTime) {
      postData.expirationTime = expirationTime;
    }
    // 이미지 업로드
    let imgUrl = null;
    if (imageFile !== '') {
      try {
        // 업로드 과정
        imgUrl = await uploadFirebase(userInfo.userId, imageFile, 'posting');
        // postData에 끼워넣기
        postData.files = [{ url: imgUrl, contentType: 'image' }];
      } catch (e) {
        console.error(e);
      }
    }

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
    pros: '찬성',
    cons: '반대',
  });

  const [imageFile, setImageFile] = useState('');
  const [postInputError, setPostInputError] = useState<string|null>(null);
  const [postTitleError, setPostTitleError] = useState<string|null>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    imgRef.current?.click();
  };

  const handleImageRemove = () => {
    setImageFile('');
    (imgRef as any).current.value = ''; // 동일한 이미지를 올렸을 때, 같음 value라 onChange가 작동하지 않는 경우를 예방.
  };

  const onLoadFiles = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files![0]);
    reader.onload = (event: ProgressEvent<FileReader>): void => {
      resizeImage(event.target?.result as string).then((result) =>
        setImageFile(result)
      );
      if (imgRef.current) {
        imgRef.current.src = event.target?.result as string;
      }
    };
  };

  const voteBtnClicked = () => {
    console.log("clicked");
  }

  const contentInputChanged = (e:string) => {
    if(e.length<5){
      setPostInputError("최소 5자 이상 입력해주세요.");
    }
    else{
      setPostInputError(null);
    }
  } 

  const postTitleChanged = (e:string) => {
    if(e.length<2){
      setPostTitleError("최소 2자 이상 입력해주세요.");
    }
    else{
      setPostTitleError(null);
    }
  }

  useEffect(() => {
    if (
      votingContent.title !== '' &&
      votingContent.content !== '' &&
      votingContent.category?.value !== 0 &&
      votingContent.pros !== '' &&
      votingContent.cons !== ''
    )
      setReadyUpload(true);
    else {
      setReadyUpload(false);
    }
  }, [votingContent]);

  const customStyles: StylesConfig = {
    option: (baseStyles) => ({
      ...baseStyles,
      textAlign: 'left',
      backgroundColor: undefined,
      fontSize: '1.2rem',
      color: 'rgba(42, 45, 55, 0.7)',
    }),
    control: (baseStyles, state) => ({
      ...baseStyles,
      background: 'rgba(0,0,0,0)',
      border: 0,
      boxSizing: 'border-box',
      boxShadow: undefined,
      borderColor: undefined,
      fontSize: '1.2rem',
      color: 'rgba(42, 45, 55, 0.7)',
      borderRadius: 0,
      transition: 'border-width 0.1s ease-in-out',
      borderBottom: state.isFocused
        ? `0.4rem solid ${palette.Gray1}`
        : `0.2rem solid ${palette.Gray1}`,
      marginBottom: state.isFocused ? '-0.2rem' : '0',
    }),
    singleValue: (baseStyles) => ({
      ...baseStyles,
      color: palette.Secondary,
      fontSize: '1.2rem',
      fontWeight: '500',
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      borderRadius: '1.2rem',
    }),
    menuList: (baseStyles) => ({
      ...baseStyles,
      maxHeight: '15rem',
    }),
  };

  const [readyUpload, setReadyUpload] = useState(false);

  return (
    <div className="flex h-full flex-col">
      <TopAppBar title={'글 작성'} />
      <div className="flex-1 overflow-y-scroll px-[2.5rem] pb-[2rem] pt-[4.6rem]">
        <div className="space-y-2">
          <PostTitleInput 
            onChange={postTitleChanged}
            errorMessage={postTitleError}
          />
        </div>
        {imageFile && (
          <div className="relative mt-4 w-[7rem]">
            <img
              src={imageFile}
              alt={'업로드 이미지'}
              className="aspect-square w-full rounded-xl object-cover"
            />
            <img
              src={DeleteIcon}
              alt={'삭제버튼'}
              onClick={handleImageRemove}
              className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2"
            />
          </div>
        )}
        <div className="relative mt-8">
          <PostContentInput 
            onChange={contentInputChanged}
            errorMessage={postInputError}
          />
        </div>
        <div className="mt-8 flex justify-between space-x-[4rem]">
          <div className="w-full">
            <Select
              id="1"
              label="카테고리"
              placeholder="선택"
              options={[
                {value:"0",name:"교육,학문"},
                {value:"1",name:"컴퓨터,통신"},
                {value:"2",name:"게임"},
                {value:"3",name:"예술"},
                {value:"4",name:"생활"},
                {value:"5",name:"건강"},
                {value:"6",name:"사회,정치"},
                {value:"7",name:"경제"},
                {value:"8",name:"여행"},
                {value:"9",name:"스포츠,운동"},
                {value:"10",name:"쇼핑"},
                {value:"11",name:"지역"},
                {value:"12",name:"연애,결혼"},
                {value:"13",name:"음악,연주"},
                {value:"14",name:"요리"},
                {value:"15",name:"방송,연예인"},
                {value:"16",name:"피부,화장품"},
                {value:"17",name:"반려동물"}
              ]}
              labelClassName='text-subheading'
              wrapperClassName="w-[15.7rem] z-[1]"
            />
          </div>
          <div className="w-full">
          <Select
              id="2"
              label="투표 마감 시간"
              placeholder="선택"
              options={[
                {value:"0",name:"6시간 후"},
                {value:"1",name:"12시간 후"},
                {value:"2",name:"24시간 후"},
                {value:"3",name:"없음"}
              ]}
              labelClassName='text-subheading'
              wrapperClassName="w-[15.7rem] z-[1]"
            />
          </div>
        </div>
        <div className="mt-14 space-y-2">
          <div className="text-subheading">투표 항목</div>
          <PostVoteInput 
            className='h-[5.3rem] flex justify-center items-center'
          />
          <PostVoteInput 
            className='h-[5.3rem] flex justify-center items-center'
          />
          {votingNum >= 3 ? <PostVoteInput className='h-[5.3rem] flex justify-center items-center' /> : null}
          {votingNum === 4 ? <PostVoteInput className='h-[5.3rem] flex justify-center items-center' /> : null}
          <EditButton
            disabled={votingNum === 4 ? true : false}
            onClick={addVotingClicked}
          >
            <span>투표 항목 추가({votingNum}/4)</span>
          </EditButton>
          </div>
        </div>
        <div className='flex justify-center items-center mb-[1rem]'>
          <Button
              variant = 'line'
              >
                <span>작성 완료</span>
          </Button>
        </div>
    </div>
  );
}

export default withAuth(WritePage, { block: 'unauthenticated' });

function Label({ text }: { text: string }) {
  return <h2 className="text-[1.2rem] font-medium">{text}</h2>;
}

function TextArea({
  maxLength,
  placeholder,
  rows,
  value,
  onChange,
}: {
  maxLength?: number;
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <textarea
      className="w-full resize-none border-b-[2px] border-gray1 bg-transparent py-[1rem] text-[1.4rem] focus:-mb-[2px] focus:border-b-[4px]"
      maxLength={maxLength}
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
