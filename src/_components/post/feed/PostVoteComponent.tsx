import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';

import { RouteURL } from '@/App';
import { ModalHanlderAtom } from '@/atom/ModalAtom';
import { chatInputFocusAtom } from '@/atom/chatInputFocus';
import { justResultWorryHandlerAtom } from '@/atom/justResultAtom';
import { refreshChatAtom } from '@/atom/postRefreshRequest';
import { ModalCase } from '@/constants/modalEnum';
import ApiConfig, { HttpMethod } from '@/dataManager/apiConfig';
import { EndPoint } from '@/dataManager/apiMapper';
import ChatIcon from '@/images/PostComponent/chat.svg';
import FillCheckIcon from '@/images/PostComponent/fill_check.svg';
import ShareIcon from '@/images/PostComponent/share.svg';
import { formatRoundedNumber } from '@/utils/formatRoundedNumber';
import { getRemainingTime } from '@/utils/getRemainingTime';

const PostVoteComponent = ({
  postData,
  userId,
  handleClickPostChat,
}: {
  postData: any;
  userId: number | null;
  handleClickPostChat: () => void;
}) => {
  const [needRefresh, setNeedRefresh] = useAtom(refreshChatAtom);

  const handleClickResult = async (choiceId: number) => {
    // 마감된 투표글인지 확인 필요
    if (getRemainingTime(postData.expirationTime) !== '마감됨') {
      if (choseData === 0) {
        const res = await ApiConfig.request({
          method: HttpMethod.POST,
          url: EndPoint.worry.post.USER_WORRY_CHOICE,
          data: {
            userId: userId,
            worryChoiceId: choiceId,
          },
        });
        refreshVotingData();
        // 투표후 투표한 사용자수 리프레시
        setNeedRefresh({
          worryIdx: postData.id,
          updateObject: 'vote',
        });
      } else {
        alert('재투표가 불가능합니다!');
      }
    } else {
      alert('마감된 게시글은 투표가 불가능합니다!');
    }
  };
  // 선택할 수 있는 값
  const [choiceData, setChoiceData] = useState([]);
  // 내가 선택한 값
  const [choseData, setChoseData] = useState(0);
  // 투표된 값의 전체
  const [voteTotal, setVoteTotal] = useState(0);

  useEffect(() => {
    //   투표값 조회
    ApiConfig.request({
      method: HttpMethod.GET,
      url: EndPoint.worry.get.WORRY_CHOICES,
      query: { worryId: postData.id },
    })?.then((res) => {
      setChoiceData(res.data);
    });
    refreshVotingData();
  }, []);

  const [chatInputFocus, setChatInputFocus] = useAtom(chatInputFocusAtom);

  const handleClickPostChatWithFocus = () => {
    setChatInputFocus({ worryId: postData.id });
    handleClickPostChat();
  };
  const refreshVotingData = () => {
    // 투표 여부 확인. worryId, userId 인자 둘다 넣으면 내가 투표한 값 리턴됨
    ApiConfig.request({
      method: HttpMethod.GET,
      url: EndPoint.worry.get.USER_WORRY_CHOICE,
      query: { worryId: postData.id, userId: userId },
    })?.then((res) => {
      if (res?.data.worryChoice?.id) {
        // 내가 투표한 케이스가 있는 경우
        setChoseData(res?.data.worryChoice.id);
        // 투표 통계 확인. worryId 인자 넣으면 투표 통계 리턴됨
        ApiConfig.request({
          method: HttpMethod.GET,
          url: EndPoint.worry.get.USER_WORRY_CHOICE,
          query: { worryId: postData.id },
        })?.then((statusData) => {
          setChoiceData(statusData.data);
          setVoteTotal(
            statusData.data.slice(0, -1).reduce((total: number, item: any) => {
              return total + item.userWorryChoiceCount;
            }, 0)
          );
        });
      }
    });
  };
  const [alertShare, setAlertShare] = useState(false);

  const [display, setDisplay] = useState('none');

  useEffect(() => {
    if (alertShare) {
      setDisplay('flex');
    } else {
      const timeoutId = setTimeout(() => {
        setDisplay('none');
      }, 500); // transition의 시간과 일치해야 합니다.
      return () => clearTimeout(timeoutId);
    }
  }, [alertShare]);
  const handleClickShare = async (postId: number) => {
    // https 배포에서만 확인 가능.
    try {
      await navigator.share({
        title: '고민의 참견',
        url: `${process.env.REACT_APP_BASE_URL}${RouteURL.feed}/${postId}`,
      });
      // console.log("링크가 공유되었습니다.");
      // 모바일 경우에만 처리 (pc는 브라우저 자체에서 카피관련 모달이 뜸.
      if (
        navigator.userAgent.indexOf('iPhone') > -1 ||
        navigator.userAgent.indexOf('Android') > -1
      ) {
        console.log(navigator.userAgent);
        setAlertShare(true);
        setTimeout(() => {
          setAlertShare(false);
        }, 3000);
      }
    } catch (error) {
      console.error('링크 공유 에러', error);
    }
  };

  const [ModalStatusHanlder, setModalStatusHanlder] = useAtom(ModalHanlderAtom);

  const [justResultWorryStatus, setJustResultWorryStatus] = useAtom(
    justResultWorryHandlerAtom
  );

  // case. 결과만 볼게요 클릭
  const handleClickResultWithoutVote = (choiceId: number) => {
    //  모달 표시.
    if (getRemainingTime(postData.expirationTime) !== '마감됨') {
      if (choseData === 0) {
        setJustResultWorryStatus((value) => ({
          ...value,
          worryChoiceId: choiceId,
          worryId: postData.id,
        }));
        setModalStatusHanlder(ModalCase.ResultWithoutVote);
      } else {
        alert('재투표가 불가능합니다!');
      }
    } else {
      alert('마감된 게시글은 투표가 불가능합니다!');
    }
  };
  useEffect(() => {
    if (justResultWorryStatus.worryId === postData.id) {
      if (justResultWorryStatus.confirm) {
        // 그래도 볼게요 누르면 handleClickResult(choiceId) 실행
        handleClickResult(justResultWorryStatus.worryChoiceId);
        setJustResultWorryStatus((value) => ({ ...value, confirm: false }));
      }
    }
  }, [justResultWorryStatus]);

  return (
    <>
      <div className="mt-4 space-y-6">
        {choiceData.slice(0, -1).map((value: any, idx) => {
          const percentage = (value.userWorryChoiceCount / voteTotal) * 100;
          return (
            <div
              className="relative flex h-[4.3rem] items-center justify-between overflow-hidden rounded-[0.5rem] border border-secondary px-[1.3rem]"
              key={idx}
            >
              <p
                className={`z-10 text-[1.4rem] font-medium ${
                  (choiceData === value.id || percentage) && 'text-white'
                }`}
              >
                <span>{value?.label}</span>
                <span>
                  {percentage !== 0 &&
                    !isNaN(percentage) &&
                    `(${formatRoundedNumber(percentage)}%)`}
                </span>
              </p>
              {choseData === value?.id && (
                <img className="z-10" src={FillCheckIcon} alt={'체크버튼'} />
              )}
              {voteTotal > 0 && (
                <div
                  className={`absolute left-0 top-0 h-full bg-secondary`}
                  style={{ width: `${percentage}%` }}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="relative">
        <div className="my-6 flex">
          <img
            src={ChatIcon}
            alt={'댓글'}
            onClick={handleClickPostChatWithFocus}
          />
          <img
            src={ShareIcon}
            alt={'공유'}
            onClick={() => handleClickShare(postData.id)}
          />
        </div>
        {choseData === 0 &&
          choiceData?.map((value: any, idx) => {
            // 배열의 마지막 요소인 경우에만 렌더링
            if (idx === choiceData.length - 1) {
              return (
                <span
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[1.2rem] text-text2 underline"
                  onClick={() => handleClickResultWithoutVote(value.id)}
                  key={idx}
                >
                  결과만 볼래요
                </span>
              );
            } else {
              return null;
            }
          })}
      </div>
    </>
  );
};

export default PostVoteComponent;
