/* eslint-disable @typescript-eslint/no-explicit-any */
import { Question } from '~/data/quiz';
import { isEmail } from '~/utils/email';

/**
 * Returns true if valid.
 */
export const validation: Record<Question['type'], (question: Question, answer: any) => boolean> = {
  text: function (question: Question, answer: any): boolean {
    return !question.required || !!answer;
  },
  date: function (question: Question, answer: any): boolean {
    if (!question.required && !answer) return true;
    if (!answer) return false;

    const date: Date | undefined = new Date(answer);

    return !isNaN(date.getTime());
  },
  tel: function (question: Question, answer: any): boolean {
    if (!question.required && !answer) return true;
    if (!answer) return false;

    return answer.length >= 10;
  },
  select: function (question: Question, answer: any): boolean {
    return !question.required || !!answer;
  },
  'multi-select': function (question: Question, answer: any): boolean {
    if (!question.required) return true;
    const answers = Array.isArray(answer) ? (answer as string[]) : [];
    return answers.length > 0;
  },
  'yes-no': function (question: Question, answer: any): boolean {
    return !question.required || answer !== undefined;
  },
  email: function (question: Question, answer: any): boolean {
    if (!question.required && !answer) return true;
    if (!answer) return false;
    return isEmail(answer);
  },
  'agree-disagree': function (question: Question, answer: any): boolean {
    return !question.required || answer !== undefined;
  },
};
