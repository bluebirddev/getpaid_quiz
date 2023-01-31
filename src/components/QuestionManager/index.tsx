/* eslint-disable @typescript-eslint/no-explicit-any */
import { Question } from '~/data/quiz';
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
import { useCallback, useEffect, useState } from 'react';
import { validation } from './validation';

export type QuestionManagerProps<T = Question> = {
  question: T;
  answer: any;
  setAnswer: (answer: any) => void;
  Buttons: (props: ButtonsProps) => JSX.Element;
};

type ButtonsProps = {
  onNext?: React.MouseEventHandler<HTMLButtonElement>;
  onPrev?: React.MouseEventHandler<HTMLButtonElement>;
  disableNext?: boolean;
  disablePrev?: boolean;
};

function useFlashNull(key: string) {
  const [flashNull, setFlashNull] = useState(false);
  useEffect(() => {
    setFlashNull(true);
    const timeout = setTimeout(() => setFlashNull(false), 0);
    return () => clearTimeout(timeout);
  }, [key]);
  return flashNull;
}

export function QuestionManager({
  question,
  onNext,
  onPrev,
}: {
  index: number;
  question: Question & { isValid: boolean };
  onNext?: React.MouseEventHandler<HTMLButtonElement>;
  onPrev?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const { answers, setAnswer } = useQuizStore();

  const Buttons = useCallback(
    // eslint-disable-next-line react/display-name
    (props: ButtonsProps) => {
      const isValid = validation[question.type](question, answers[question.key]);
      return (
        <div className="mt-auto md:mb-auto flex space-x-2 py-6">
          <Button
            onClick={(e) => {
              if (props.onPrev) {
                props.onPrev(e);
              }
              if (onPrev) {
                onPrev(e);
              }
            }}
            type="secondary"
            disabled={!onPrev || props.disablePrev}
          >
            Previous
          </Button>
          <Button
            onClick={(e) => {
              if (props.onNext) {
                props.onNext(e);
              }
              if (onNext) {
                onNext(e);
              }
            }}
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

  const flashNull = useFlashNull(question.key);

  const content = (() => {
    if (flashNull) return null;
    if (question.type === 'text') {
      return (
        <TextQuestionManager
          question={question}
          answer={answer}
          setAnswer={(answer) => setAnswer(question.key, answer)}
          Buttons={Buttons}
        />
      );
    }
    if (question.type === 'date') {
      return (
        <DateQuestionManager
          question={question}
          answer={answer}
          setAnswer={(answer) => setAnswer(question.key, answer)}
          Buttons={Buttons}
        />
      );
    }
    if (question.type === 'tel') {
      return (
        <TelQuestionManager
          question={question}
          answer={answer || ''}
          setAnswer={(answer) => setAnswer(question.key, answer)}
          Buttons={Buttons}
        />
      );
    }
    if (question.type === 'select') {
      return (
        <SelectQuestionManager
          question={question}
          answer={answer}
          setAnswer={(answer) => setAnswer(question.key, answer)}
          Buttons={Buttons}
        />
      );
    }
    if (question.type === 'multi-select') {
      return (
        <MultiSelectQuestionManager
          question={question}
          answer={answer}
          setAnswer={(answer) => setAnswer(question.key, answer)}
          Buttons={Buttons}
        />
      );
    }
    if (question.type === 'yes-no') {
      return (
        <YesNoQuestionManager
          question={question}
          answer={answer}
          setAnswer={(answer) => setAnswer(question.key, answer)}
          Buttons={Buttons}
        />
      );
    }
    if (question.type === 'agree-disagree') {
      return (
        <AgreeDisagreeQuestionManager
          question={question}
          answer={answer}
          setAnswer={(answer) => setAnswer(question.key, answer)}
          Buttons={Buttons}
        />
      );
    }
    if (question.type === 'email') {
      return (
        <EmailQuestionManager
          question={question}
          answer={answer || ''}
          setAnswer={(answer) => setAnswer(question.key, answer)}
          Buttons={Buttons}
        />
      );
    }
    return null;
  })();

  return (
    <div className="h-full flex flex-col">
      <h2 className="mb-6">{question.label}</h2>
      {content}
      {/* <div className="mt-auto md:mt-32 flex space-x-2">
        <Button onClick={onPrev} type="secondary">
          Previous
        </Button>
        <Button onClick={onNext} type="primary" disabled={isNextDisabled}>
          Next
        </Button>
      </div> */}
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
