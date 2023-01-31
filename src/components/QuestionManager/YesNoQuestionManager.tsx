import { YesNoQuestion } from '~/data/quiz';
import { QuestionManagerProps } from '.';

export function YesNoQuestionManager({
  answer,
  setAnswer,
  Buttons,
  question,
}: QuestionManagerProps<YesNoQuestion>) {
  return (
    <>
      <ol className="mt-1 flex-col flex space-y-3">
        {[
          { value: true, label: 'Yes' },
          { value: false, label: 'No' },
        ].map((q) => (
          <li
            key={q.value ? '1' : '0'}
            className={`text-[14px] px-4 font-medium leading-[20px] flex items-center h-[52px] rounded border ${
              answer === q.value ? 'bg-[rgba(252,190,43,0.5)] border-[#344054]' : 'border-[#EAECF0]'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setAnswer(q.value);
            }}
          >
            <button
              onClick={() => setAnswer(q.value)}
              className={`h-4 w-4 rounded-full border mr-2 flex items-center justify-center ${
                answer === q.value ? 'border-[#344054] bg-white' : 'border-[#EAECF0]'
              }`}
            >
              {answer === q.value && <div className="h-1.5 w-1.5 rounded-full bg-[#344054]" />}
            </button>
            {q.label}
          </li>
        ))}
      </ol>
      <Buttons disableNext={question.required && answer === undefined} />
    </>
  );
}
