import { useState } from 'react';
import { TextQuestion } from '~/quiz/types';
import { QuestionManagerProps } from '.';
import { Input } from '../Input';

export function TextQuestionManager({
  answer,
  question,
  setAnswer,
  Buttons,
  active,
}: QuestionManagerProps<TextQuestion>) {
  const validate = question.validate && question.validate(answer);
  const isInvalid = !!validate || !question.isValid;

  const [softEnable, setSoftEnable] = useState(true);

  function onNext() {
    if (isInvalid) {
      setSoftEnable(false);
      return false;
    }
    return true;
  }

  return (
    <>
      <Input
        type="text"
        value={answer || ''}
        active={active}
        label={question.placeholder}
        onChange={(e) => setAnswer(e)}
        error={!softEnable && (validate || isInvalid)}
      />
      {Buttons && <Buttons onNext={onNext} disableNext={!softEnable && isInvalid} />}
    </>
  );
}
