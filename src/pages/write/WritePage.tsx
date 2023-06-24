import { useAtomValue } from 'jotai';
import { debounce } from 'lodash';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select, { StylesConfig } from 'react-select';

import { RouteURL } from '@/App';
import AppBar from '@/components/layout/AppBar';
import BottomContinueBar from '@/components/layout/BottomContinueBar';
import {
  OptionType,
  categoryOptions,
  deadlineOptions,
} from '@/constants/Options';
import { userType } from '@/constants/userTypeEnum';
import ApiConfig, { HttpMethod } from '@/dataManager/apiConfig';
import { EndPoint } from '@/dataManager/apiMapper';
import { uploadFirebase } from '@/dataManager/firebaseManager';
import { resizeImage } from '@/dataManager/imageResizing';
import CameraIcon from '@/images/Write/Camera.svg';
import DeleteIcon from '@/images/Write/delete_icon.svg';
import { userAtom } from '@/states/userData';
import palette from '@/styles/color';
import { alertMessage } from '@/utils/alertMessage';
import getFutureDateTime from '@/utils/getFutureDateTime';

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
  worryCategoryId: number | undefined;
  expirationTime?: string;
  userId: number;
  choices: { label: string; sequenceNumber: number }[];
  files?: {
    url: string;
    contentType: string;
  }[];
};

const WritePage = () => {
  const userInfo = useAtomValue(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    // HOC로 안잡히는 부분 잡기위함
    if (userInfo.userType !== userType.activatedUser) navigate(RouteURL.home);
  }, [userInfo]);

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
      worryCategoryId: votingContent.category?.value,
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
        console.log(e);
      }
    }

    // 포스팅 업로드
    try {
      const res = await ApiConfig.request({
        method: HttpMethod.POST,
        url: EndPoint.worry.post.WORRY,
        data: postData,
      });
      // console.log(res);
      navigate(`${RouteURL.feed}/${res?.data.id}`);
    } catch (e) {
      console.log(e);
      alert(alertMessage.error.post.noUploadPermission);
    }
  };
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
  const imgRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    imgRef.current?.click();
  };

  const handleImageRemove = () => {
    setImageFile('');
    (imgRef as any).current.value = ''; // 동일한 이미지를 올렸을 때, 같음 value라 onChange가 작동하지 않는 경우를 예방.
  };

  const onLoadFiles = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // console.log("working");
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
      <AppBar title={'글 작성'} />
      <div className="flex-1 overflow-y-scroll px-[2.5rem] pb-[2rem] pt-[4.6rem]">
        <div className="space-y-2">
          <Label text="글 제목" />
          <div className="relative">
            <TextArea
              maxLength={16}
              placeholder={'제목 작성 또는 이미지 선택'}
              rows={1}
              value={votingContent.title}
              onChange={(e) => {
                setVotingContent((value) => ({
                  ...value,
                  title: e.target.value,
                }));
              }}
            />
            <div className="absolute right-0 top-0">
              <img
                src={CameraIcon}
                alt="이미지선택"
                onClick={handleImageClick}
                className="cursor-pointer"
              />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={imgRef}
                onChange={onLoadFiles}
              />
            </div>
          </div>
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
          <Label text="내용" />
          <TextArea
            maxLength={280}
            placeholder={'최대 280자 입력'}
            rows={7}
            value={votingContent.content}
            onChange={(e) => {
              setVotingContent((value) => ({
                ...value,
                content: e.target.value,
              }));
            }}
          />
          <div className="text-right">
            <span className="text-[1.2rem] text-text3">
              {votingContent.content.length}/280
            </span>
          </div>
        </div>
        <div className="mt-8 flex justify-between space-x-[4rem]">
          <div className="w-full">
            <Label text="카테고리" />
            <Select
              isSearchable={false}
              styles={customStyles}
              options={categoryOptions}
              value={votingContent.category}
              onChange={(e) =>
                setVotingContent(
                  (value): WriteContentType =>
                    ({ ...value, category: e } as WriteContentType)
                )
              }
            />
          </div>
          <div className="w-full">
            <Label text="투표 마감 시간" />
            <Select
              isSearchable={false}
              styles={customStyles}
              options={deadlineOptions}
              value={votingContent.deadline}
              onChange={(e) =>
                setVotingContent(
                  (value): WriteContentType =>
                    ({ ...value, deadline: e } as WriteContentType)
                )
              }
            />
          </div>
        </div>
        <div className="mt-14 space-y-2">
          <Label text="옵션 수정" />
          <p className="text-[1.2rem] text-text3">
            아래의 옵션을 눌러서 원하는 텍스트로 변경할 수 있어요.
          </p>
          <div className="mt-2 flex h-[6rem] justify-between">
            <div className="flex w-[49%] items-center rounded-[12px] border border-dashed border-primary text-primary">
              <input
                className="w-full bg-transparent text-center text-[1.8rem] font-bold"
                maxLength={6}
                value={votingContent.pros}
                onChange={(e) => {
                  setVotingContent((value) => ({
                    ...value,
                    pros: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="flex w-[49%] items-center rounded-[12px] border border-dashed border-secondary text-secondary">
              <input
                className="w-full bg-transparent text-center text-[1.8rem] font-bold"
                maxLength={6}
                value={votingContent.cons}
                onChange={(e) => {
                  setVotingContent((value) => ({
                    ...value,
                    cons: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <BottomContinueBar
        title={'작성 완료'}
        clickAction={readyUpload ? handlePushPost : undefined}
        fontColor={readyUpload ? palette.Background : palette.Gray1}
        buttonColor={readyUpload ? palette.Primary : palette.Gray2}
        boxColor={palette.Background}
      />
    </div>
  );
};

export default WritePage;

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
