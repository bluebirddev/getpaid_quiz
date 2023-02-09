import { useNavigate } from 'react-router';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/virtual';

import { QuestionManager } from '~/components/QuestionManager';
import { validation } from '~/components/QuestionManager/validation';
import { QuizLayout } from '~/components/QuizLayout';
import { ThankYou } from '~/components/ThankYou';
import { questions } from '~/quiz';
import { useQuizStore } from '~/store/quiz';
import { useQuery } from '~/utils/navigation';

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
      <Swiper
        slidesPerView={1}
        allowTouchMove={false}
        initialSlide={index}
        direction="vertical"
        className="mySwiper"
        autoHeight
      >
        {mappedQuestions.map((q, i) => (
          <SwiperSlide key={q.key} virtualIndex={i}>
            <QuestionManager
              index={i}
              activeIndex={index}
              question={mappedQuestions[i]}
              onNext={() => onNext()}
              onPrev={() => onPrev()}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/*  */}
      {/* </div> */}
    </QuizLayout>
  );
};
