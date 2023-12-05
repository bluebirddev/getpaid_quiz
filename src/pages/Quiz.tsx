import { useNavigate } from 'react-router';

import { QuestionManager } from '~/components/QuestionManager';
import { validation } from '~/components/QuestionManager/validation';
import { QuizLayout } from '~/components/QuizLayout';
import { ThankYou } from '~/pages/ThankYou';
import { questions } from '~/quiz';
import { useQuizStore } from '~/store/quiz';
import { useQuery } from '~/utils/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { postSubmission } from '~/api';
import { handlePageChange } from '~/analytics/handle_page_change';
import { useSyncUserId, useUserIdStore } from '~/store/user_id';
import { useQueryParamsStore } from '~/store/query_params';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hasAllQuestionsBeenAnswered(answers: Record<string, any>) {
    return questions
        .filter((q) => q.required && (!q.condition || q.condition(answers)))
        .every((q) => answers[q.key] !== undefined);
}

function useSubmitting() {
    const { answers } = useQuizStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userId = useUserIdStore().userId!;
    const { queryParams } = useQueryParamsStore();

    async function submit() {
        setLoading(true);
        try {
            if (!hasAllQuestionsBeenAnswered(answers)) {
                throw new Error('Not all questions have been answered');
            }
            await postSubmission(userId, queryParams, answers);
            setSuccess(true);
        } catch (e) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    return { submit, loading, error, success };
}

export const QuizPage = () => {
    const query = useQuery();
    const navigate = useNavigate();
    const { answers } = useQuizStore();
    useSyncUserId();

    const key = query.get('k');

    const { loading, error, success, submit } = useSubmitting();

    if (success || loading || error) {
        return <ThankYou loading={loading} error={error} />;
    }

    const filteredQuestions = questions.filter((q) => {
        if (!q.condition) return true;
        return q.condition(answers);
    });

    let index = filteredQuestions.findIndex((q) => q.key === key);
    if (index < 0) {
        index = 0;
    }

    const mappedQuestions = filteredQuestions.map((q) => ({
        ...q,
        isValid: validation[q.type](q, answers[q.key]),
    }));

    const onNext = () => {
        if (index >= filteredQuestions.length - 1) {
            submit();
            navigate('/quiz', { replace: true });
            return false;
        } else {
            handlePageChange(filteredQuestions[index]);
            const newIndex = index + 1;
            navigate({ search: `?k=${filteredQuestions[newIndex].key}` });
            return true;
        }
    };

    function onPrev() {
        const newIndex = index - 1;
        if (newIndex < 0) {
            navigate('/');
            return false;
        } else {
            navigate({ search: `?k=${filteredQuestions[newIndex].key}` });
            return true;
        }
    }

    return (
        <QuizLayout progress={index / filteredQuestions.length}>
            <Swipy
                index={index}
                pages={mappedQuestions.map((q, i) => (
                    <QuestionManager
                        key={i}
                        index={i}
                        activeIndex={index}
                        question={mappedQuestions[i]}
                        onNext={() => onNext()}
                        onPrev={() => onPrev()}
                    />
                ))}
            />
        </QuizLayout>
    );
};

const TRANSITION_DURATION = 300;

function Swipy({ pages, index }: { pages: ReactNode[]; index: number }) {
    const [stopAnimating, setStopAnimating] = useState(true);
    const [height, setHeight] = useState<number | undefined>(undefined);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setHeight(ref.current?.clientHeight);
        setTimeout(() => {
            setStopAnimating(false);
        }, TRANSITION_DURATION);
    }, []);

    useEffect(() => {
        function handleResize() {
            setStopAnimating(true);
            setHeight(ref.current?.clientHeight);
            setTimeout(() => {
                setStopAnimating(false);
            }, TRANSITION_DURATION);
        }

        window.addEventListener('resize', handleResize);
    });

    return (
        // container to get constant full height
        <div className="h-full w-full" ref={ref}>
            {/* inner container with same height that moves viewport */}
            <div
                className={`h-full ${stopAnimating ? 'transition-none' : 'transition-all'}`}
                style={{
                    marginTop: -index * (height || 0),
                    transitionDuration: `${TRANSITION_DURATION}ms`,
                }}
            >
                {pages.map((p, i) => (
                    // each page with same height again
                    <div className="h-full overflow-y-auto flex justify-center" key={i}>
                        {p}
                    </div>
                ))}
            </div>
        </div>
    );
}
