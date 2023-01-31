import { MultiSelectQuestion } from '~/data/quiz';
import { QuestionManagerProps } from '.';

export function MultiSelectQuestionManager({
  question,
  answer,
  setAnswer,
  Buttons,
}: QuestionManagerProps<MultiSelectQuestion>) {
  const answers = Array.isArray(answer) ? (answer as string[]) : [];
  const setAnswers = (answers: string[]) => setAnswer(answers);
  return (
    <>
      <ol className="mt-1 flex-col flex space-y-3">
        {question.options.map((q) => {
          const isSelected = answers.includes(q.value);
          const onClick = () => {
            if (isSelected) {
              setAnswers(answers.filter((a) => a !== q.value));
            } else {
              setAnswers([...answers, q.value]);
            }
          };
          return (
            <li
              key={q.value}
              className={`cursor-pointer focus-within:ring-1 ring-[#344054] text-[14px] px-4 font-medium leading-[20px] flex items-center h-[52px] rounded border ${
                isSelected ? 'bg-[rgba(252,190,43,0.5)] border-[#344054]' : 'border-[#EAECF0]'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              <button
                onClick={() => setAnswer(q.value)}
                className={`h-4 w-4 rounded-full border mr-2 flex items-center justify-center ${
                  isSelected ? 'border-[#344054] bg-white' : 'border-[#EAECF0]'
                }`}
              >
                {isSelected && (
                  <svg
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 1L3.5 6.5L1 4"
                      stroke="#344054"
                      strokeWidth="1.6666"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
              {q.label}
            </li>
          );
        })}
      </ol>
      <Buttons disableNext={question.required && answers.length === 0} />
    </>
  );
}
