/* eslint-disable @typescript-eslint/no-explicit-any */
import { Question } from '~/data/quiz';
import { isMobile } from 'react-device-detect';

import { useQuizStore } from '~/store/quiz';
import { TextQuestionManager } from './TextQuestionManager';
import { DateQuestionManager } from './DateQuestionManager';
import { TelQuestionManager } from './TelQuestionManager';
import { SelectQuestionManager } from './SelectQuestionManager';
import { MultiSelectQuestionManager } from './MultiSelectQuestionManager';
import { YesNoQuestionManager } from './YesNoQuestionManager';
import { AgreeDisagreeQuestionManager } from './AgreeDisagreeQuestionManager';
import { EmailQuestionManager } from './EmailQuestionManager';
import { Button } from '../Button';
import { useCallback } from 'react';
import { validation } from './validation';

export type QuestionManagerProps<T = Question> = {
  question: T & { isValid: boolean };
  answer: any;
  setAnswer: (answer: any) => void;
  Buttons: (props: ButtonsProps) => JSX.Element;
  onNext?: () => void;
  active?: boolean;
};

type ButtonsProps = {
  onNext?: () => boolean;
  onPrev?: () => boolean;
  disableNext?: boolean;
  disablePrev?: boolean;
};

export function QuestionManager({
  index,
  question,
  onNext,
  activeIndex,
  onPrev,
}: {
  index: number;
  activeIndex: number;
  question: Question & { isValid: boolean };
  onNext?: () => boolean;
  onPrev?: () => boolean;
}) {
  const { answers, setAnswer } = useQuizStore();
  const active = !isMobile && activeIndex === index;

  const Buttons = useCallback(
    // eslint-disable-next-line react/display-name
    (props: ButtonsProps) => {
      const isValid = validation[question.type](question, answers[question.key]);
      return (
        <div className="mt-[60px] flex space-x-2 justify-between">
          <Button
            onClick={() => {
              if (props.onPrev) {
                props.onPrev();
              }
              if (onPrev) {
                onPrev();
              }
            }}
            type="secondary"
            disabled={!onPrev || props.disablePrev}
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              if (props.onNext) {
                const success = props.onNext();
                if (success === false) return;
              }
              if (onNext) {
                onNext();
              }
            }}
            wider
            type="primary"
            disabled={!onNext || !isValid || props.disableNext}
          >
            Next
          </Button>
        </div>
      );
    },
    [onNext, onPrev]
  );

  const answer = answers[question.key];

  // const flashNull = useFlashNull(question.key);

  const content = (() => {
    if (question.type === 'text') {
      return (
        <TextQuestionManager
          active={active}
          question={question}
          answer={answer}
          onNext={onNext}
          setAnswer={(answer) => setAnswer(question.key, answer)}
          Buttons={Buttons}
        />
      );
    }
    if (question.type === 'date') {
      return (
        <DateQuestionManager
          active={active}
          question={question}
          answer={answer}
          onNext={onNext}
          setAnswer={(answer) => setAnswer(question.key, answer)}
          Buttons={Buttons}
        />
      );
    }
    if (question.type === 'tel') {
      return (
        <TelQuestionManager
          active={active}
          question={question}
          answer={answer || ''}
          onNext={onNext}
          setAnswer={(answer) => setAnswer(question.key, answer)}
          Buttons={Buttons}
        />
      );
    }
    if (question.type === 'select') {
      return (
        <SelectQuestionManager
          active={active}
          question={question}
          answer={answer}
          onNext={onNext}
          setAnswer={(answer) => setAnswer(question.key, answer)}
          Buttons={Buttons}
        />
      );
    }
    if (question.type === 'multi-select') {
      return (
        <MultiSelectQuestionManager
          active={active}
          question={question}
          answer={answer}
          onNext={onNext}
          setAnswer={(answer) => setAnswer(question.key, answer)}
          Buttons={Buttons}
        />
      );
    }
    if (question.type === 'yes-no') {
      return (
        <YesNoQuestionManager
          active={active}
          question={question}
          answer={answer}
          onNext={onNext}
          setAnswer={(answer) => setAnswer(question.key, answer)}
          Buttons={Buttons}
        />
      );
    }
    if (question.type === 'agree-disagree') {
      return (
        <AgreeDisagreeQuestionManager
          active={active}
          question={question}
          answer={answer}
          onNext={onNext}
          setAnswer={(answer) => setAnswer(question.key, answer)}
          Buttons={Buttons}
        />
      );
    }
    if (question.type === 'email') {
      return (
        <EmailQuestionManager
          active={active}
          question={question}
          answer={answer || ''}
          onNext={onNext}
          setAnswer={(answer) => setAnswer(question.key, answer)}
          Buttons={Buttons}
        />
      );
    }
    return null;
  })();

  return (
    // white outer container
    <div className="max-w-[1186px] w-full bg-white shadow-[0_0_16px_rgba(0,0,0,0.08)] mx-[15px] h-fit min-h-full flex justify-center">
      <div className="mx-[14px] my-[36px] max-w-[440px] w-full h-fit relative">
        <div className="flex flex-col">
          <h2>{question.label}</h2>
          {question.description && (
            <p className="mt-2.5 text-body text-sm leading-[19px]">{question.description}</p>
          )}
          <div className="mt-6">{content}</div>
          {/* <div className="mt-auto md:mt-32 flex space-x-2">
        <Button onClick={onPrev} type="secondary">
          Previous
        </Button>
        <Button onClick={onNext} type="primary" disabled={isNextDisabled}>
          Next
        </Button>
      </div> */}
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="flex flex-col items-center mt-20">
  //     <div className="max-w-full w-[400px] flex">
  //       <div className="text-xl mr-2">{index}</div>
  //       {content}
  //     </div>
  //     {/* <br />
  //     <div>
  //       <button onClick={onPrev} className="bg-orange-400 p-2 rounded">
  //         Prev
  //       </button>
  //       <button onClick={onNext} className="bg-orange-400 p-2 rounded">
  //         Next
  //       </button>
  //     </div> */}
  //   </div>
  // );
}
