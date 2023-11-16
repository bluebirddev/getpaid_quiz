/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';

export type BaseQuestion = {
    key: string;
    label: string | ReactNode;
    required?: boolean;
    condition?: (answers: { [key: string]: any }) => boolean;
    validate?: (value: any) => string | undefined;
    description?: string | ReactNode;
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
    pageValidate?: {
        loadingText: string;
        ErrorComponent: (props: { onBack: () => void }) => JSX.Element;
        validate: (tel: string, answers: any) => Promise<boolean>;
    };
};
export function isTelQuestion(question: Question): question is TelQuestion {
    return question.type === 'tel';
}
export function isEmailQuestion(question: Question): question is EmailQuestion {
    return question.type === 'email';
}

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
    agreeText?: string;
    disagreeText?: string;
};

export type EmailQuestion = BaseQuestion & {
    type: 'email';
    placeholder?: string;
    pageValidate?: {
        loadingText: string;
        ErrorComponent: (props: { onBack: () => void }) => JSX.Element;
        validate: (tel: string, answers: any) => Promise<boolean>;
    };
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
