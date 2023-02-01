import { TextQuestion } from '~/data/quiz';
import { QuestionManagerProps } from '.';
import { Input } from '../Input';

export function TextQuestionManager({
  answer,
  question,
  setAnswer,
  Buttons,
}: QuestionManagerProps<TextQuestion>) {
  const isInvalid = (question.validate && !!question.validate(answer)) || question.isValid;

  return (
    <>
      <Input
        type="text"
        value={answer || ''}
        label={question.placeholder}
        onChange={(e) => setAnswer(e)}
        error={answer && !isInvalid}
      />
      {Buttons && <Buttons disableNext={!isInvalid} />}
    </>
  );
}
