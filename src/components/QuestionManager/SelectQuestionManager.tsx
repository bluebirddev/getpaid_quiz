import { SelectQuestion } from '~/quiz/types';
import { QuestionManagerProps } from '.';
import { Select } from '../Select';

export function SelectQuestionManager({
  question,
  answer,
  setAnswer,
  // onNext,
  Buttons,
}: QuestionManagerProps<SelectQuestion>) {
  return (
    <>
      <Select
        options={question.options}
        value={answer}
        onChange={(a) => {
          setAnswer(a);
          // if (onNext) {
          //   onNext();
          // }
        }}
        type="select"
      />
      <Buttons disableNext={question.required && !answer} />
    </>
  );
}
