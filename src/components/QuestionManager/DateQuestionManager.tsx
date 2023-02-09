import { format, parse } from 'date-fns';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { DateQuestion } from '~/data/quiz';
import { ensureNumberTyped, strictParseNumber } from '~/utils/number';
import { QuestionManagerProps } from '.';

export function DateQuestionManager({
  question,
  answer,
  setAnswer,
  Buttons,
}: QuestionManagerProps<DateQuestion>) {
  let existingDate: Date | undefined = new Date(answer || '');
  if (isNaN(existingDate.getTime())) {
    existingDate = undefined;
  }

  const [dayText, setDayText] = useState<string>(existingDate?.getDate()?.toString() || '');
  const [monthText, setMonthText] = useState<string>(
    existingDate ? (existingDate.getMonth() + 1).toString() : ''
  );
  const [yearText, setYearText] = useState<string>(existingDate?.getFullYear()?.toString() || '');

  const validDate = (() => {
    const day = strictParseNumber(dayText, { min: 1, max: 31 });
    const month = strictParseNumber(monthText, { min: 1, max: 31 });
    const year = strictParseNumber(yearText, { length: 4 });

    // test if the inputs are valid numbers
    const theDate =
      day !== undefined &&
      month !== undefined &&
      year !== undefined &&
      new Date(year, month - 1, day);

    if (!theDate || isNaN(theDate.getTime())) return undefined;

    // const isValid = !isNaN(theDate.getTime()) && isAfter(theDate, subYears(new Date(), 100));

    const parsedDate = parse(
      `${dayText.padStart(2, '0')}.${monthText.padStart(2, '0')}.${yearText}`,
      'dd.MM.yyyy',
      new Date()
    );
    if (isNaN(parsedDate.getTime())) return undefined;
    return parsedDate;
  })();

  const isValid = (() => {
    const validationErrorText = question.validate && question.validate(validDate);
    if (validationErrorText) return false;
    if (!validDate && question.required) return false;
    return true;
  })();

  function onDayChange(text: string) {
    const d = ensureNumberTyped(text, 31);
    if (d !== undefined) {
      setDayText(d);
    }
    const num = d && Number.parseInt(d);
    if (num && num > 3) {
      elM.current?.focus();
    }
    if (d?.length === 2) {
      elM.current?.focus();
    }
  }
  function onMonthChange(text: string) {
    const m = ensureNumberTyped(text, 12);
    if (m !== undefined) {
      setMonthText(m);
    }
    const num = m && Number.parseInt(m);
    if (num && num > 1) {
      elY.current?.focus();
    }
    if (m?.length === 2) {
      elY.current?.focus();
    }
  }
  function onYearChange(text: string) {
    const y = ensureNumberTyped(text, 9999);
    if (y !== undefined) {
      setYearText(y);
    }
  }
  const elD = React.useRef<HTMLInputElement>(null);
  const elM = React.useRef<HTMLInputElement>(null);
  const elY = React.useRef<HTMLInputElement>(null);

  const validDateString = validDate ? format(validDate as Date, 'yyyy-MM-dd') : undefined;
  useEffect(() => {
    setAnswer(validDateString);
  }, [validDateString]);

  const showError = validDate && (!question.isValid || !isValid);

  return (
    <>
      <div
        onClick={() => {
          elD.current?.focus();
        }}
        className={`px-[16px] h-[52px] flex space-x-2 border items-center rounded overflow-hidden
        ${!showError ? 'border-[#D9D9D9] focus-within:border-[#344054]' : 'border-[#FF4D4F]'}
        `}
      >
        <input
          ref={elD}
          onClick={(e) => e.stopPropagation()}
          type="text"
          value={dayText}
          className="min-w-0 px-1 w-[40px] border-b border-b-transparent border-t-transparent focus:border-b-[#344054] focus:outline-none"
          onChange={(e) => onDayChange(e.target.value)}
          placeholder="DD"
        />
        <span className="text-xs">/</span>
        <input
          ref={elM}
          onClick={(e) => e.stopPropagation()}
          type="text"
          value={monthText}
          className="min-w-0 px-1 w-[40px] border-b border-b-transparent border-t-transparent focus:border-b-[#344054] focus:outline-none"
          onChange={(e) => onMonthChange(e.target.value)}
          placeholder="MM"
        />
        <span className="text-xs">/</span>
        <input
          ref={elY}
          onClick={(e) => e.stopPropagation()}
          type="text"
          value={yearText}
          className="min-w-0 px-1 w-[64px] border-b border-b-transparent border-t-transparent focus:border-b-[#344054] focus:outline-none"
          onChange={(e) => onYearChange(e.target.value)}
          placeholder="YYYY"
        />
      </div>
      <div>
        <Buttons disableNext={!isValid} />
      </div>
    </>
  );
}
