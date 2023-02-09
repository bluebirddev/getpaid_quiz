import { AgreeDisagreeQuestion } from '~/data/quiz';
import { QuestionManagerProps } from '.';
import { Select } from '../Select';

export function AgreeDisagreeQuestionManager({
  Buttons,
  answer,
  setAnswer,
  question,
}: // onNext,
QuestionManagerProps<AgreeDisagreeQuestion>) {
  const isInvalid = question.validate && !!question.validate(answer);
  return (
    <>
      <Select
        options={[
          { value: true, label: question.agreeText || 'Yes, I understand and agree' },
          { value: false, label: question.disagreeText || 'No, I don’t understand and disagree' },
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

      <Buttons disableNext={isInvalid || (question.required && answer === undefined)} />
    </>
  );
}
