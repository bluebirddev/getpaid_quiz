import { ReactNode } from 'react';
import logo from '~/assets/logo';

export function QuizLayout({ children, progress }: { children: ReactNode; progress: number }) {
  const startProgress = 0.1;
  const adjustedProgress = startProgress + progress * (1 - startProgress);

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
      <div className={`flex flex-1 overflow-y-hidden bg-[#F1F5FB] justify-center`}>{children}</div>
    </div>
  );
}
