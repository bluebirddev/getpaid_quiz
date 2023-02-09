import { ReactNode, useEffect, useRef, useState } from 'react';
import logo from '~/assets/logo';

const DURATION = 1000;

export function QuizLayout({
  children,
  progress,
  nextChild,
  afterPrevScroll,
  afterNextScroll,
  nextScrolling,
  prevScrolling,
  prevChild,
}: {
  children: ReactNode;
  progress: number;
  nextChild?: ReactNode;
  prevChild?: ReactNode;
  nextScrolling: boolean;
  prevScrolling: boolean;
  afterNextScroll?: () => void;
  afterPrevScroll?: () => void;
}) {
  const startProgress = 0.1;
  const adjustedProgress = startProgress + progress * (1 - startProgress);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nextScrolling || prevScrolling) {
      const timer = setTimeout(() => {
        if (nextScrolling) {
          afterNextScroll?.();
        }
        if (prevScrolling) {
          // afterPrevScroll?.();
        }
      }, DURATION);

      return () => clearTimeout(timer);
    }
  }, [nextScrolling, prevScrolling]);

  const isScrolling = nextScrolling || prevScrolling;

  const [firstNextRender, setFirstNextRender] = useState(true);
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prevScrolling) {
      setTimeout(() => {
        setFirstNextRender(false);
      }, 0);
    }
  }, [prevScrolling]);

  return (
    <div className="fixed inset-0 flex flex-col">
      <header className="z-10 h-[81px] md:h-[108px] px-[14px] flex flex-col justify-center shadow-[0_4px_4px_rgba(0,0,0,0.15)] bg-gradient-to-b from-[#FC7B28] to-[#FCBE2B]">
        <div className="px-4 max-w-[440px] mx-auto w-full">
          <div className="mb-3 w-[106px] md:w-[172px]">{logo}</div>
          <div className="w-full h-2 rounded bg-white bg-opacity-50">
            <div
              className="bg-white rounded h-full transition-all"
              style={{ width: `${adjustedProgress * 100}%` }}
            />
          </div>
        </div>
      </header>
      {/* full width handler */}
      <div
        className={`flex flex-1 ${
          isScrolling ? 'overflow-y-hidden' : 'overflow-y-auto'
        } bg-[#F1F5FB] justify-center`}
      >
        {/* white outer container */}
        <div
          ref={outerRef}
          className="max-w-[1186px] w-full bg-white shadow-[0_0_16px_rgba(0,0,0,0.08)] mx-[15px] min-h-full h-fit"
        >
          {prevChild && (
            <div
              className={`h-full w-full flex justify-center ${
                isScrolling ? 'transition-all' : 'transition-none'
              } duration-1000`}
              style={{
                marginTop: firstNextRender ? -(outerRef.current?.clientHeight || 0) : 0,
                transitionDuration: `${DURATION}ms`,
              }}
            >
              <div className="mx-[14px] my-[36px] max-w-[440px] w-full h-fit relative">
                {prevChild}
              </div>
            </div>
          )}
          {/* full height scroller */}
          <div
            className={`h-full w-full flex justify-center ${
              isScrolling ? 'transition-all' : 'transition-none'
            } duration-1000`}
            ref={ref}
            style={{
              marginTop: nextScrolling ? -(ref.current?.clientHeight || 0) : 0,
              transitionDuration: `${DURATION}ms`,
            }}
          >
            {/* inner container */}
            <div className="mx-[14px] my-[36px] max-w-[440px] w-full h-fit relative">
              {children}
            </div>
          </div>
          {nextChild && (
            <div className="h-full w-full flex justify-center">
              <div className="mx-[14px] my-[36px] max-w-[440px] w-full h-fit relative">
                {nextChild}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
