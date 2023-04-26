/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmailQuestion, isTelQuestion, Question } from '~/quiz/types';
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
import { useCallback, useEffect, useState } from 'react';
import { validation } from './validation';
import { PageLoader } from '../PageLoader';

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const pageValidate =
    isTelQuestion(question) || isEmailQuestion(question) ? question.pageValidate : undefined;

  const Buttons = useCallback(
    // eslint-disable-next-line react/display-name
    (props: ButtonsProps) => {
      function onKeyboard(e: KeyboardEvent) {
        if (active) {
          if (e.key === 'Enter') {
            onNextClick();
          }
        }
      }
      async function onBackClick() {
        if (props.onPrev) {
          props.onPrev();
        }
        if (onPrev) {
          onPrev();
        }
      }

      async function onNextClick() {
        if (props.onNext) {
          const success = props.onNext();
          if (success === false) return;
        }
        if (pageValidate) {
          setLoading(true);
          const isValid = await pageValidate.validate(answers[question.key]);
          setLoading(false);
          if (!isValid) {
            setError(true);
            return;
          }
        }
        if (onNext) {
          onNext();
        }
      }

      useEffect(() => {
        window.addEventListener('keyup', onKeyboard);
        return () => {
          window.removeEventListener('keyup', onKeyboard);
        };
      }, []);

      const isValid = validation[question.type](question, answers[question.key]);
      return (
        <div className="mt-[60px] flex space-x-2 justify-between">
          <Button onClick={onBackClick} type="secondary" disabled={!onPrev || props.disablePrev}>
            Previous
          </Button>
          <Button
            onClick={onNextClick}
            wider
            type="primary"
            disabled={!onNext || !isValid || props.disableNext}
          >
            Next
          </Button>
        </div>
      );
    },
    [onNext, onPrev, pageValidate]
  );

  const answer = answers[question.key];

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
          {loading ? (
            <PageLoader>{pageValidate?.loadingText}</PageLoader>
          ) : (
            (error && pageValidate && (
              <pageValidate.ErrorComponent onBack={() => setError(false)} />
            )) || (
              <>
                <h2>{question.label}</h2>
                {question.description && (
                  <p className="mt-2.5 text-body text-sm leading-[19px]">{question.description}</p>
                )}
                <div className="mt-6">{content}</div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}
