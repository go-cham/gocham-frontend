import { useEffect, useRef } from 'react';

import { MAX_Y, MIN_Y } from '@/constants/BottomSheetOption';

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number;
    touchY: number;
  };
  touchMove: {
    prevTouchY?: number;
    movingDirection: 'none' | 'down' | 'up';
  };
  isContentAreaTouched: boolean;
}

export default function useBottomSheetFix({
  openBottomSheet,
  handleClickPostChat,
}: {
  openBottomSheet: any;
  handleClickPostChat: any;
}) {
  const sheet = useRef<HTMLDivElement>(null);

  const header = useRef<HTMLDivElement>(null);

  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: 'none',
    },
    isContentAreaTouched: false,
  });

  useEffect(() => {
    if (openBottomSheet) {
      sheet.current!.style.setProperty('transform', `translateY(-600px)`);
      // handleClickPostChat(false);
    }
    if (!openBottomSheet) {
      sheet.current!.style.setProperty('transform', 'translateY(0)');

      // handleClickPostChat(false);
    }
  }, [openBottomSheet]);

  useEffect(() => {
    const canUserMoveBottomSheet = () => {
      const { touchMove, isContentAreaTouched } = metrics.current;

      if (!isContentAreaTouched) {
        return true;
      }

      if (sheet.current!.getBoundingClientRect().y !== MIN_Y) {
        return true;
      }

      if (touchMove.movingDirection === 'down') {
        return header.current!.scrollTop <= 0;
      }
      return false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      const { isContentAreaTouched, touchStart } = metrics.current;
      // console.log(isContentAreaTouched);
      if (!isContentAreaTouched) {
        touchStart.sheetY = sheet.current!.getBoundingClientRect().y;
        touchStart.touchY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const { isContentAreaTouched, touchStart, touchMove } = metrics.current;

      if (!isContentAreaTouched) {
        const currentTouch = e.touches[0];

        if (touchMove.prevTouchY === undefined) {
          touchMove.prevTouchY = touchStart.touchY;
        }

        if (touchMove.prevTouchY === 0) {
          // 맨 처음 앱 시작하고 시작시
          touchMove.prevTouchY = touchStart.touchY;
        }

        if (touchMove.prevTouchY < currentTouch.clientY) {
          touchMove.movingDirection = 'down';
        }

        if (touchMove.prevTouchY > currentTouch.clientY) {
          touchMove.movingDirection = 'up';
        }

        if (canUserMoveBottomSheet()) {
          e.preventDefault();

          const touchOffset = currentTouch.clientY - touchStart.touchY;
          let nextSheetY = touchStart.sheetY + touchOffset;

          if (nextSheetY <= MIN_Y) {
            nextSheetY = MIN_Y;
          }

          if (nextSheetY >= MAX_Y) {
            nextSheetY = MAX_Y;
          }

          sheet.current!.style.setProperty(
            'transform',
            `translateY(${nextSheetY - MAX_Y}px)`
          ); //바닥 만큼은 빼야쥬...
        } else {
          document.body.style.overflowY = 'hidden';
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      document.body.style.overflowY = 'auto';
      const { isContentAreaTouched, touchMove } = metrics.current;
      if (!isContentAreaTouched) {
        // Snap Animation
        const currentSheetY = sheet.current!.getBoundingClientRect().y;

        if (currentSheetY !== MIN_Y) {
          if (touchMove.movingDirection === 'down') {
            sheet.current!.style.setProperty('transform', 'translateY(0)');
            handleClickPostChat(false);
          }

          if (touchMove.movingDirection === 'up') {
            sheet.current!.style.setProperty(
              'transform',
              `translateY(${MIN_Y - MAX_Y}px)`
            );
          }
        }

        // metrics 초기화.
        metrics.current = {
          touchStart: {
            sheetY: 0,
            touchY: 0,
          },
          touchMove: {
            prevTouchY: 0,
            movingDirection: 'none',
          },
          isContentAreaTouched: false,
        };
      }
    };

    header.current!.addEventListener('touchstart', handleTouchStart);
    header.current!.addEventListener('touchmove', handleTouchMove);
    header.current!.addEventListener('touchend', handleTouchEnd);
  }, []);

  // // content 영역을 터치하는 것을 기록합니다.
  // useEffect(() => {
  //   const handleTouchStart = () => {
  //     metrics.current!.isContentAreaTouched = true;
  //   };
  //   header.current!.addEventListener("touchstart", handleTouchStart);
  //   return () => {
  //     header.current!.removeEventListener("touchstart", handleTouchStart);
  //   };
  // }, []);

  return { sheet, header };
}
