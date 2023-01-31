import { EmailQuestion } from '~/data/quiz';
import { isEmail } from '~/utils/email';
import { QuestionManagerProps } from '.';
import { Input } from '../Input';

export function EmailQuestionManager({
  Buttons,
  answer,
  setAnswer,
  question,
}: QuestionManagerProps<EmailQuestion>) {
  const disableNext = (() => {
    if (!question.required && !answer) return false;
    const isValid = isEmail(answer);
    return !isValid;
  })();

  return (
    <>
      <Input
        type="email"
        value={answer}
        label={question.placeholder}
        onChange={(e) => setAnswer(e)}
      />
      <Buttons disableNext={disableNext} />
    </>
  );
}
