/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * You will typically use this function on the event handler of an input element.
 * This will ensure that the input is a number and that it is within the range of 0 to max.
 */
export function ensureNumberTyped(text: string, max: number = Number.MAX_SAFE_INTEGER) {
    if (text === '') return '';
    const maxLength = max.toString().length;
    const trimmedText = text.trim();
    if (trimmedText.length > maxLength) return undefined; // error
    const anyNonDigit = trimmedText.match(/\D/g);
    if (anyNonDigit) return undefined; // error
    const num = Number.parseInt(trimmedText);
    if (isNaN(num)) return; // error
    if (num > max) return; // error
    return trimmedText;
}

export function strictParseNumber(
    text: string,
    { min, max, length }: { min?: number; max?: number; length?: number } = {}
) {
    if (text === '') return undefined;
    const trimmedText = text.trim();
    const anyNonDigit = trimmedText.match(/\D/g);
    if (anyNonDigit) return undefined; // error

    if (length !== undefined) {
        if (trimmedText.length != length) return undefined; // error
    }

    const num = Number.parseInt(trimmedText);
    if (isNaN(num)) return; // error

    if (min !== undefined) {
        if (num < min) return; // error
    }

    if (max !== undefined) {
        if (num > max) return; // error
    }
    return num;
}

export function isInt(val: any) {
    if (typeof val === 'string') {
        return !val.match(/\D/);
    }
    if (typeof val === 'number') {
        if (NaN) return false;
        return Math.round(0) === val;
    }
    return false;
}
