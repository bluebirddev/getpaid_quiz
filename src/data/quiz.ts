/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';

export type BaseQuestion = {
  key: string;
  label: string | ReactNode;
  required?: boolean;
  condition?: (answers: { [key: string]: any }) => boolean;
  validate?: (value: any) => string | undefined;
};

export type TextQuestion = BaseQuestion & {
  type: 'text';
  placeholder?: string;
};

export type DateQuestion = BaseQuestion & {
  type: 'date';
  validate?: (date?: Date) => string | undefined;
};

export type TelQuestion = BaseQuestion & {
  type: 'tel';
  placeholder?: string;
};

export type SelectQuestion = BaseQuestion & {
  type: 'select';
  options: { value: string; label: string }[];
};

export type MultiSelectQuestion = BaseQuestion & {
  type: 'multi-select';
  options: { value: string; label: string }[];
};

export type YesNoQuestion = BaseQuestion & {
  type: 'yes-no';
};

export type AgreeDisagreeQuestion = BaseQuestion & {
  type: 'agree-disagree';
};

export type EmailQuestion = BaseQuestion & {
  type: 'email';
  placeholder?: string;
};

export type Question =
  | TextQuestion
  | DateQuestion
  | TelQuestion
  | SelectQuestion
  | MultiSelectQuestion
  | YesNoQuestion
  | EmailQuestion
  | AgreeDisagreeQuestion;
