import { useNavigate } from 'react-router';
import { QuestionManager } from '~/components/QuestionManager';
import { QuizLayout } from '~/components/QuizLayout';
import { questions } from '~/quiz';
import { useQuizStore } from '~/store/quiz';
import { useQuery } from '~/utils/navigation';

const Home = () => {
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

  const question = filteredQuestions[index];

  // const firstInvalidQuestionIndex = filteredQuestions.find((q) => {
  //   if (!q.)

  function onNext() {
    const newIndex = index + 1;
    navigate({ search: `?k=${filteredQuestions[newIndex].key}` });
  }
  function onPrev() {
    const newIndex = index - 1;
    console.log({ newIndex, filteredQuestions });
    navigate({ search: `?k=${filteredQuestions[newIndex].key}` });
  }

  return (
    <QuizLayout progress={index / filteredQuestions.length}>
      <QuestionManager index={index} question={question} onNext={onNext} onPrev={onPrev} />
    </QuizLayout>
  );
};

export default Home;
