import { Question } from '~/quiz/types';
import { useQuizStore } from '~/store/quiz';
import { useUserIdStore } from '~/store/user_id';
import { Event, pushEvent } from './datalayer';

const allowedAnswers = [
    'monthly_income',
    'household_income',
    'employment_status',
    'email',
    'tel',
    'life_insurance_prompt',
];

function trimAnswers(answers: Record<string, string>) {
    return Object.entries(answers).reduce((acc, [key, value]) => {
        if (allowedAnswers.includes(key) && value) {
            return { ...acc, [key]: value };
        }
        return acc;
    }, {});
}

export function handlePageChange(question: Question) {
    const answers = useQuizStore.getState().answers;
    const userId = useUserIdStore.getState().userId;
    const trimmedAnswers = trimAnswers(answers);

    const event: Event = {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        user_id: userId!,
        step: question.key,
        event: 'lead_onboarding',
    };

    pushEvent(event, trimmedAnswers);
}
