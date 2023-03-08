import { YesNoQuestion } from '~/quiz/types';
import { QuestionManagerProps } from '.';
import { Select } from '../Select';

export function YesNoQuestionManager({
  answer,
  setAnswer,
  Buttons,
  question,
}: // onNext,
QuestionManagerProps<YesNoQuestion>) {
  return (
    <>
      <Select
        options={[
          { value: true, label: 'Yes' },
          { value: false, label: 'No' },
        ]}
        value={answer}
        onChange={(a) => {
          setAnswer(a);
          // if (onNext) {
          //   onNext();
          // }
        }}
        type="yes-no"
      />
      <Buttons disableNext={question.required && answer === undefined} />
    </>
  );
}
