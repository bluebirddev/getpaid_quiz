import { EmailQuestion } from '~/quiz/types';
import { isEmail } from '~/utils/email';
import { QuestionManagerProps } from '.';
import { Input } from '../Input';

export function EmailQuestionManager({
    Buttons,
    answer,
    setAnswer,
    question,
    active,
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
                active={active}
                label={question.placeholder}
                onChange={(e) => setAnswer(e)}
            />
            <Buttons disableNext={disableNext} />
        </>
    );
}
