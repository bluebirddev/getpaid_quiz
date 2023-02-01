import { SelectQuestion } from '~/data/quiz';
import { QuestionManagerProps } from '.';
import { Select } from '../Select';

export function SelectQuestionManager({
  question,
  answer,
  setAnswer,
  Buttons,
}: QuestionManagerProps<SelectQuestion>) {
  return (
    <>
      <Select options={question.options} value={answer} onChange={setAnswer} type="select" />
      <Buttons disableNext={question.required && !answer} />
    </>
  );
}
