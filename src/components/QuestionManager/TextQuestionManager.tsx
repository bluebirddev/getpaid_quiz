import { TextQuestion } from '~/data/quiz';
import { QuestionManagerProps } from '.';
import { Input } from '../Input';

export function TextQuestionManager({
  answer,
  question,
  setAnswer,
  Buttons,
  active,
}: QuestionManagerProps<TextQuestion>) {
  const isInvalid = (question.validate && !!question.validate(answer)) || question.isValid;

  return (
    <>
      <Input
        type="text"
        value={answer || ''}
        active={active}
        label={question.placeholder}
        onChange={(e) => setAnswer(e)}
        error={answer && !isInvalid}
      />
      {Buttons && <Buttons disableNext={!isInvalid} />}
    </>
  );
}
