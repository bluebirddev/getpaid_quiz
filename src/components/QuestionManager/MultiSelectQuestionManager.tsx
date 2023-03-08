import { MultiSelectQuestion } from '~/quiz/types';
import { QuestionManagerProps } from '.';
import { Select } from '../Select';

export function MultiSelectQuestionManager({
  question,
  answer,
  setAnswer,
  Buttons,
}: QuestionManagerProps<MultiSelectQuestion>) {
  const answers = Array.isArray(answer) ? (answer as string[]) : [];
  return (
    <>
      <Select options={question.options} value={answer} onChange={setAnswer} type="multi-select" />
      <Buttons disableNext={question.required && answers.length === 0} />
    </>
  );
}
