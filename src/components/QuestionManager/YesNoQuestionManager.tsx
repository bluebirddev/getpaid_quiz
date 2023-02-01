import { YesNoQuestion } from '~/data/quiz';
import { QuestionManagerProps } from '.';
import { Select } from '../Select';

export function YesNoQuestionManager({
  answer,
  setAnswer,
  Buttons,
  question,
}: QuestionManagerProps<YesNoQuestion>) {
  return (
    <>
      <Select value={answer} onChange={setAnswer} type="yes-no" />
      <Buttons disableNext={question.required && answer === undefined} />
    </>
  );
}
