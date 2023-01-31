import { TelQuestion } from '~/data/quiz';
import { QuestionManagerProps } from '.';
import { Input } from '../Input';

export function TelQuestionManager({
  answer,
  setAnswer,
  Buttons,
  question,
}: QuestionManagerProps<TelQuestion>) {
  const disableNext = (() => {
    if (!question.required && !answer) return false;
    const isValid = answer.length >= 10;
    return !isValid;
  })();

  return (
    <>
      <Input
        type="tel"
        placeholder={question.placeholder}
        value={answer}
        onChange={(e) => setAnswer(e)}
      />
      <Buttons disableNext={disableNext} />
    </>
  );
}
