import { ReactNode } from 'react';
import logo from '~/assets/logo';

export function QuizLayout({ children, progress }: { children: ReactNode; progress: number }) {
  const startProgress = 0.1;
  const adjustedProgress = startProgress + progress * (1 - startProgress);
  return (
    <div className="fixed inset-0 flex flex-col">
      <header className="h-[73px] px-4 flex flex-col justify-center shadow-[0_4px_4px_rgba(0,0,0,0.15)] bg-gradient-to-b from-[#FC7B28] to-[#FCBE2B]">
        <div className="px-4 max-w-[440px] mx-auto w-full">
          <div className="h-8 mb-2">{logo}</div>
          <div className="w-full h-2 rounded bg-white bg-opacity-50">
            <div
              className="bg-white rounded h-full transition-all"
              style={{ width: `${adjustedProgress * 100}%` }}
            />
          </div>
        </div>
      </header>
      {/* full width handler */}
      <div className="flex flex-1 overflow-y-auto bg-[#F1F5FB] justify-center">
        {/* outer container */}
        <div className="max-w-[1186px] w-full bg-white shadow-[0_0_16px_rgba(0,0,0,0.08)] mx-[15px] flex justify-center min-h-full h-fit">
          {/* inner container */}
          <div className="mx-[14px] py-[36px] max-w-[440px] w-full h-fit">{children}</div>
        </div>
      </div>
    </div>
  );
}
