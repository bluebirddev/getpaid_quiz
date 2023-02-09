import { useNavigate } from 'react-router';

import { QuestionManager } from '~/components/QuestionManager';
import { validation } from '~/components/QuestionManager/validation';
import { QuizLayout } from '~/components/QuizLayout';
import { ThankYou } from '~/components/ThankYou';
import { questions } from '~/quiz';
import { useQuizStore } from '~/store/quiz';
import { useQuery } from '~/utils/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';

export const QuizPage = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const { answers } = useQuizStore();

  const key = query.get('k');

  if (key === 'thank_you') {
    return <ThankYou />;
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
      navigate({ search: `?k=thank_you` });
      return false;
    } else {
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
