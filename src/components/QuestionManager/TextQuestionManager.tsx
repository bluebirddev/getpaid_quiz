import { TextQuestion } from '~/data/quiz';
import { QuestionManagerProps } from '.';
import { Input } from '../Input';

export function TextQuestionManager(props: QuestionManagerProps<TextQuestion>) {
  const answer = props.answer || '';
  const setAnswer = (answer: string) => props.setAnswer(answer);

  const isInvalid = props.question.validate && !!props.question.validate(answer);

  return (
    <>
      <Input
        type="text"
        value={answer}
        label={props.question.placeholder}
        onChange={(e) => setAnswer(e)}
      />
      {props.Buttons && <props.Buttons disableNext={isInvalid} />}
    </>
  );
}
