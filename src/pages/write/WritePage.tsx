import { useAtomValue } from 'jotai';
import { debounce } from 'lodash';
import { ChangeEvent, MouseEventHandler, useEffect, useRef, useState } from 'react';
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
import ModalController from '@/components/modal/ModalController';
import useUser from '@/apis/hooks/users/useUser';

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
  const userInfo = useAtomValue(userAtom);
  const navigate = useNavigate();
  const { addPost, data, error } = useAddPost();
  const imageInput = useRef<HTMLInputElement | null>(null);
  const [votingNum,setVotingnum] = useState(2);
  const [titleLength,setTitleLength] = useState(0);
  const [postInputError, setPostInputError] = useState<string|null>(null);
  const [postTitleError, setPostTitleError] = useState<string|null>(null);
  const [contentLength,setContentLength] = useState(0);
  const [voteTimeValue,setVoteTimeValue] = useState(-1);
  const [categoryValue,setCategoryValue] = useState(-1);
  const [categorySelectErrorMsg,setCategorySelectErrorMsg]=useState<string|null>(null);
  const [voteTimeSelectErrorMsg,setVoteTimeSelectErrorMsg]=useState<string|null>(null);
  const [imageFile, setImageFile] = useState<string[]>([]);
  const [vote1State,setVote1State] = useState(['','']);
  const [vote2State,setVote2State] = useState(['','']);
  const [vote3State,setVote3State] = useState(['','']);
  const [vote4State,setVote4State] = useState(['','']);
  const [vote1Error,setVote1Error] = useState(false);
  const [vote2Error,setVote2Error] = useState(false);
  const [vote3Error,setVote3Error] = useState(false);
  const [vote4Error,setVote4Error] = useState(false);
  const { user, isLoading, status } = useUser();

  const handlePostUpload = async () => {
    if(!user) return false;
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

    if(vote1State[0]!=='' || vote1State[1]!==''){
      postData.choices.push({
        label:vote1State[0],
        url:vote1State[1],
        sequenceNumber:1
      })
    }

    if(vote2State[0]!=='' || vote2State[1]!==''){
      postData.choices.push({
        label:vote2State[0],
        url:vote2State[1],
        sequenceNumber:2
      })
    }

    if(vote3State[0]!=='' || vote3State[1]!==''){
      postData.choices.push({
        label:vote3State[0],
        url:vote3State[1],
        sequenceNumber:3
      })
    }

    if(vote4State[0]!=='' || vote4State[1]!==''){
      postData.choices.push({
        label:vote4State[0],
        url:vote4State[1],
        sequenceNumber:4
      })
    }

    let imgUrl = null;
    if (imageFile.length !== 0) {
      imageFile.forEach(async(file) => {
        try {
          // 업로드 과정
          imgUrl = await uploadFirebase(user.id, file, 'posting');
          // postData에 끼워넣기
          postData.files.push({ url: imgUrl, contentType: 'image' })
        } catch (e) {
          console.error(e);
        }
      })
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

  const handleImageClick = () => {
    imgRef.current?.click();
  };

  const addVotingClicked = () => {
    setVotingnum(prev => prev + 1);
  }

  const handleImageRemove: MouseEventHandler<HTMLImageElement> = (e) => {
    const target = e.target as HTMLImageElement | null;
    const imageUrl = target?.parentElement?.querySelector('img')?.src;
    const newImageFile=imageFile.filter(img => img!==imageUrl);
    setImageFile(newImageFile);
  };

  const onLoadFiles = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if(imageFile.length === 3){
      alert("사진 첨부는 최대 3장까지 가능합니다.");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files![0]);
    reader.onload = (event: ProgressEvent<FileReader>): void => {
      resizeImage(event.target?.result as string).then((result) =>
        setImageFile(prev => {
          return [...prev,result]
        })
      );
      if (imgRef.current) {
        imgRef.current.src = event.target?.result as string;
      }
    };
  };

  const postTitleImgBtnClicked = () => {
    if(imageInput.current){
      imageInput.current.click();
    }
  }

  const contentInputChanged = (e:string) => {
    setContentLength(e.length);
    setVotingContent(prev => {
      return {
        ...prev,
        content:e
      }
    })
    if(e.length<5){
      setPostInputError("최소 5자 이상 입력해주세요.");
    }
    else{
      setPostInputError(null);
    }
  }

  const postTitleChanged = (e:string) => {
    setTitleLength(e.length);
    setVotingContent(prev => {
      return {
        ...prev,
        title:e
      }
    })
    if(e.length<2){
      setPostTitleError("최소 2자 이상 입력해주세요.");
    }
    else{
      setPostTitleError(null);
    }
  }

  const categorySelectChanged = (e:number) => {
    setCategoryValue(e);
    let categoryName='';
    categoryOptions.forEach(option => {
      if(option.value===e){
        categoryName=option.label;
      }
    })
    setVotingContent(prev => {
      return {
        ...prev,
        category:{
          value:e,
          label:categoryName
        }
      }
    })
    if(categorySelectErrorMsg !== null){
      setCategorySelectErrorMsg(null);
    }
  }

  const voteTimeSelectChanged =(e:number) => {
    setVoteTimeValue(e);
    let dueTime='';
    deadlineOptions.forEach(option => {
      if(option.value===e){
        dueTime=option.label;
      }
    })
    setVotingContent(prev => {
      return {
        ...prev,
        deadline:{
          value:e,
          label:dueTime
        }
      }
    })
    if(voteTimeSelectErrorMsg !== null){
      setVoteTimeSelectErrorMsg(null);
    }
  }

  const vote1Changed = (e:string) => {
    setVote1State(prev => {
      return [e,vote1State[1]]
    });
    if(setVote1Error){
      setVote1Error(false);
    }
  }
  const vote2Changed = (e:string) => {
    setVote2State([e,vote2State[1]]);
    if(setVote2Error){
      setVote2Error(false);
    }
  }
  const vote3Changed = (e:string) => {
    setVote3State([e,vote3State[1]]);
    if(setVote3Error){
      setVote3Error(false);
    }
  }
  const vote4Changed = (e:string) => {
    setVote4State([e,vote4State[1]]);
    if(setVote4Error){
      setVote4Error(false);
    }
  }

  const vote1ImageAddClicked = () => {
    if(vote1ImgRef.current){
      vote1ImgRef.current.click();
    }
  }

  const vote2ImageAddClicked = () => {
    if(vote2ImgRef.current){
      vote2ImgRef.current.click();
    }
  }

  const vote3ImageAddClicked = () => {
    if(vote3ImgRef.current){
      vote3ImgRef.current.click();
    }
  }

  const vote4ImageAddClicked = () => {
    if(vote4ImgRef.current){
      vote4ImgRef.current.click();
    }
  }

  const vote1ImgSetted = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files![0]);
    let imgUrl='';
    reader.onload = (event: ProgressEvent<FileReader>): void => {
      resizeImage(event.target?.result as string).then(async(result) => {
        imgUrl=await uploadFirebase(user?.id, result, 'posting');
        setVote1State([vote1State[0],imgUrl]);
        return;
      }
      );
    };
  };

  const vote2ImgSetted = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files![0]);
    let imgUrl='';
    reader.onload = (event: ProgressEvent<FileReader>): void => {
      resizeImage(event.target?.result as string).then(async(result) => {
        imgUrl=await uploadFirebase(user?.id, result, 'posting');
        setVote2State([vote2State[0],imgUrl]);
        return;
      }
      );
    };
  };

  const vote3ImgSetted = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files![0]);
    reader.onload = (event: ProgressEvent<FileReader>): void => {
      resizeImage(event.target?.result as string).then((result) => {
        setVote3State([vote3State[0],result]);
        return;
      }
      );
    };
  };

  const vote4ImgSetted = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files![0]);
    reader.onload = (event: ProgressEvent<FileReader>): void => {
      resizeImage(event.target?.result as string).then((result) => {
        setVote4State([vote4State[0],result]);
        return;
      }
      );
    };
  };

  const vote1ImageDeleteClicked = () => {
    setVote1State(prev => {
      return [vote1State[0],''];
    })
  }

  const vote2ImageDeleteClicked = () => {
    setVote2State(prev => {
      return [vote2State[0],''];
    })
  }

  const vote3ImageDeleteClicked = () => {
    setVote3State(prev => {
      return [vote3State[0],''];
    })
  }

  const vote4ImageDeleteClicked = () => {
    setVote4State(prev => {
      return [vote4State[0],''];
    })
  }

  const doneBtnClicked =() => {
    let voteNum=0;
    if(vote1State[0].length > 0){
      voteNum+=1;
    }
    if(vote2State[0].length > 0){
      voteNum+=1;
    }
    if(vote3State[0].length > 0){
      voteNum+=1;
    }
    if(vote4State[0].length > 0){
      voteNum+=1;
    }
    if(titleLength === 0 ){
      alert("제목을 입력해주세요.");
      setPostTitleError("최소 2자 이상 입력해주세요.");
      return;
    }
    if(titleLength < 2){
      alert("최소 2자 이상 입력해주세요.");
      return;
    }
    if(contentLength ===0 ){
      alert("내용을 입력해주세요.");
      setPostInputError("최소 5자 이상 입력해주세요.");
      return ;
    }
    if(contentLength < 5){
      alert("최소 5자 이상 입력해주세요.");
      return;
    }
    if(categoryValue===-1){
      alert("내용에 맞는 카테고리를 선택해주세요.");
      setCategorySelectErrorMsg("카테고리를 선택해주세요.");
      return;
    }
    if(voteTimeValue===-1){
      alert("투표 마감 시간을 선택해주세요.");
      setVoteTimeSelectErrorMsg("투표 마감 시간을 선택해주세요.");
      return;
    }
    if(voteNum < 2){
      if(vote1State[0]==='' && vote1State[1]!==''){
        alert("투표 항목은 텍스트를 포함해야 합니다.")
        setVote1Error(true);
        return;
      }
      if(vote2State[0]==='' && vote2State[1]!==''){
        alert("투표 항목은 텍스트를 포함해야 합니다.")
        setVote2Error(true);
        return;
      }
      if(vote3State[0]==='' && vote3State[1]!==''){
        alert("투표 항목은 텍스트를 포함해야 합니다.")
        setVote3Error(true);
        return;
      }
      if(vote4State[0]==='' && vote4State[1]!==''){
        alert("투표 항목은 텍스트를 포함해야 합니다.")
        setVote4Error(true);
        return;
      }
      alert("투표 항목을 2개 이상 입력해주세요.")
      if(vote1State[0].length === 0){
        setVote1Error(true);
        return;
      }
      if(vote2State[0].length === 0){
        setVote2Error(true);
        return;
      }
    }
    if(vote1State[0]==='' && vote1State[1]!==''){
      alert("투표 항목은 텍스트를 포함해야 합니다.")
      setVote1Error(true);
      return;
    }
    if(vote2State[0]==='' && vote2State[1]!==''){
      alert("투표 항목은 텍스트를 포함해야 합니다.")
      setVote2Error(true);
      return;
    }
    if(vote3State[0]==='' && vote3State[1]!==''){
      alert("투표 항목은 텍스트를 포함해야 합니다.")
      setVote3Error(true);
      return;
    }
    if(vote4State[0]==='' && vote4State[1]!==''){
      alert("투표 항목은 텍스트를 포함해야 합니다.")
      setVote4Error(true);
      return;
    }
    handlePushPost();
  }

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
          <input onChange={onLoadFiles} type="file" style={{ display: "none" }} accept='image/jpg,impge/png,image/jpeg' ref={imageInput} />
          <PostTitleInput
            onChange={postTitleChanged}
            onUploadImage={postTitleImgBtnClicked}
            errorMessage={postTitleError}
          />
        </div>
        <div className='flex w-full mt-[0.4rem]'>
        {imageFile && imageFile.map((imgUrl) => (
          <div key={imgUrl} className="relative mt-4 w-[7rem] mr-[1rem]">
          <img
            src={imgUrl}
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
        ))}
        </div>
        <div className="relative mt-8">
          <PostContentInput
            onChange={contentInputChanged}
            errorMessage={postInputError}
          />
        </div>
        <div className="mt-8 flex justify-between space-x-[4rem]">
          <div className="w-full">
            <Select
              id="category"
              label="카테고리"
              placeholder="선택"
              options={categoryOptions}
              errorMessage={categorySelectErrorMsg}
              labelClassName='text-subheading'
              wrapperClassName="w-[15.7rem] z-[1]"
              onChange={categorySelectChanged}
            />
          </div>
          <div className="w-full">
          <Select
              id="voteTime"
              label="투표 마감 시간"
              placeholder="선택"
              options={deadlineOptions}
              errorMessage={voteTimeSelectErrorMsg}
              labelClassName='text-subheading'
              wrapperClassName="w-[15.7rem] z-[1]"
              onChange={voteTimeSelectChanged}
            />
          </div>
        </div>
        <div className="mt-14 space-y-2">
          <div className="text-subheading">투표 항목</div>
          <input onChange={vote1ImgSetted} type="file" style={{ display: "none" }} accept='image/jpg,impge/png,image/jpeg' ref={vote1ImgRef} />
          <input onChange={vote2ImgSetted} type="file" style={{ display: "none" }} accept='image/jpg,impge/png,image/jpeg' ref={vote2ImgRef} />
          <input onChange={vote3ImgSetted} type="file" style={{ display: "none" }} accept='image/jpg,impge/png,image/jpeg' ref={vote3ImgRef} />
          <input onChange={vote4ImgSetted} type="file" style={{ display: "none" }} accept='image/jpg,impge/png,image/jpeg' ref={vote4ImgRef} />
          <PostVoteInput
            image={vote1State[1]}
            onChange={vote1Changed}
            className='h-[5.3rem] flex justify-center items-center'
            hasError={vote1Error}
            onUploadImage={vote1ImageAddClicked}
            onDeleteImage={vote1ImageDeleteClicked}
          />
          <PostVoteInput
            image={vote2State[1]}
            onChange={vote2Changed}
            className='h-[5.3rem] flex justify-center items-center'
            hasError={vote2Error}
            onUploadImage={vote2ImageAddClicked}
            onDeleteImage={vote2ImageDeleteClicked}
          />
          {votingNum >= 3 ? <PostVoteInput image={vote3State[1]} onUploadImage={vote3ImageAddClicked} hasError={vote3Error}  onChange={vote3Changed} onDeleteImage={vote3ImageDeleteClicked} className='h-[5.3rem] flex justify-center items-center' /> : null}
          {votingNum === 4 ? <PostVoteInput image={vote4State[1]} onUploadImage={vote4ImageAddClicked} hasError={vote4Error} onChange={vote4Changed} onDeleteImage={vote4ImageDeleteClicked} className='h-[5.3rem] flex justify-center items-center' /> : null}
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
              onClick={doneBtnClicked}
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
