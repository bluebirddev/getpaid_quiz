import { useNavigate } from 'react-router';

import { QuestionManager } from '~/components/QuestionManager';
import { validation } from '~/components/QuestionManager/validation';
import { QuizLayout } from '~/components/QuizLayout';
import { questions } from '~/quiz';
import { useQuizStore } from '~/store/quiz';
import { useQuery } from '~/utils/navigation';

export const QuizPage = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const { answers } = useQuizStore();

  const key = query.get('k');

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

  const question = mappedQuestions[index];

  // const firstInvalidQuestionIndex = mappedQuestions.findIndex((q) => !q.isValid);
  // console.log(
  //   'firstInvalidQuestionIndex',
  //   firstInvalidQuestionIndex,
  //   mappedQuestions[firstInvalidQuestionIndex]
  // );
  // index = firstInvalidQuestionIndex;

  // if (firstInvalidQuestionIndex > index) {
  //   return <Navigate to={{ search: `?k=${filteredQuestions[firstInvalidQuestionIndex].key}` }} />;
  // }

  const onNext =
    index >= filteredQuestions.length - 1
      ? undefined
      : () => {
          const newIndex = index + 1;
          navigate({ search: `?k=${filteredQuestions[newIndex].key}` });
        };

  function onPrev() {
    const newIndex = index - 1;
    if (newIndex < 0) {
      navigate('/');
    } else {
      navigate({ search: `?k=${filteredQuestions[newIndex].key}` });
    }
  }

  return (
    <QuizLayout progress={index / filteredQuestions.length}>
      <QuestionManager index={index} question={question} onNext={onNext} onPrev={onPrev} />
    </QuizLayout>
  );
};
