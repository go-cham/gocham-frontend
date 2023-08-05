import PullToRefresh from 'pulltorefreshjs';
import { useEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';

import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function usePullToRefresh() {
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    if (ref.current) return;

    ref.current = document.querySelector('#pull-to-refresh');
  }, [ref.current]);

  useEffect(() => {
    if (!ref.current) return;

    PullToRefresh.init({
      iconArrow: ' ',
      mainElement: '#pull-to-refresh',
      triggerElement: '#pull-to-refresh',
      iconRefreshing: ReactDOMServer.renderToString(
        <LoadingSpinner className="mx-auto scale-75" />
      ),
      instructionsReleaseToRefresh: ReactDOMServer.renderToString(
        <LoadingSpinner className="mx-auto scale-75" />
      ),
      instructionsPullToRefresh: ' ',
      instructionsRefreshing: ' ',
      shouldPullToRefresh() {
        const el = document.querySelector('#pull-to-refresh');
        if (!el) return false;

        return el.scrollTop <= 0;
      },
      onRefresh() {
        location.reload();
      },
      getStyles() {
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
          top: 7rem;
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
          margin-top: .33em;
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
  }, [ref.current]);
}
