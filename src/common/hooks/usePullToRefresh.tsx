import PullToRefresh from 'pulltorefreshjs';
import { useEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import LoadingSpinner from '@/common/components/ui/loading/LoadingSpinner';

export default function usePullToRefresh<U extends HTMLElement>({
  onRefresh,
  topOffset = 0,
}: {
  onRefresh: () => void;
  topOffset?: number;
}) {
  const ref = useRef<U | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (!ref.current.id) {
      ref.current.id = 'ptr';
    }

    PullToRefresh.init({
      iconArrow: ' ',
      distMax: 150,
      mainElement: `#${ref.current.id}`,
      triggerElement: `#${ref.current.id}`,
      iconRefreshing: ReactDOMServer.renderToString(
        <LoadingSpinner className="mx-auto scale-75" />,
      ),
      instructionsReleaseToRefresh: ReactDOMServer.renderToString(
        <LoadingSpinner className="mx-auto scale-75" />,
      ),
      instructionsPullToRefresh: ' ',
      instructionsRefreshing: ' ',
      shouldPullToRefresh() {
        if (!ref.current) {
          return false;
        }
        return ref.current.scrollTop <= 0;
      },
      onRefresh() {
        onRefresh();
      },
      getStyles() {
        if (!ref.current) return '';
        return `
      .__PREFIX__ptr {
          pointer-events: none;
          font-size: 0.85em;
          font-weight: bold;
          top: 0;
          height: 0;
          transition: height 0.3s, min-height 0.3s;
          text-align: center;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          align-content: stretch;
          position: absolute;
          top: ${ref.current?.getBoundingClientRect().top + 10 + topOffset}px;
          z-index: 9999;
        }

      .__PREFIX__box {
          padding: 0px;
          flex-basis: 100%;
        }

      .__PREFIX__pull {
          transition: none;
        }

      .__PREFIX__text {
          margin-top: 0.33em;
          color: rgba(0, 0, 0, 0.3);
        }

      .__PREFIX__icon {
          color: rgba(0, 0, 0, 0.3);
          transition: transform .3s;
        }

        /*
        When at the top of the page, disable vertical overscroll so passive touch
        listeners can take over.
        */
      .__PREFIX__top {
          touch-action: pan-x pan-down pinch-zoom;
        }
      }
      `;
      },
    });
  }, [onRefresh, topOffset]);

  return ref;
}
