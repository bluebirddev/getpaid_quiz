import { TelQuestion } from '~/quiz/types';
import { QuestionManagerProps } from '.';
import { Input } from '../Input';

export function TelQuestionManager({
    answer,
    setAnswer,
    Buttons,
    question,
    active,
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
                active={active}
                onChange={(e) => setAnswer(e)}
            />
            <Buttons disableNext={disableNext} />
        </>
    );
}
