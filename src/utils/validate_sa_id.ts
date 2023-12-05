import { parse } from 'date-fns';

export function validateIdNumber(id: string) {
    if (id.length !== 13) return false;
    const isMatched = !!id.match(/^[0-9]*$/);
    if (!isMatched) return false;

    const yearText = id.substring(0, 2);
    const monthText = id.substring(2, 4);
    const dayText = id.substring(4, 6);

    const parsedDate = parse(`${dayText}.${monthText}.${yearText}`, 'dd.MM.yy', new Date());
    if (isNaN(parsedDate.getTime())) return false;
    const c = id[10];
    if (c !== '0' && c !== '1') return false;
    // return luhnCheck(id);
    return true;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const luhnCheck = (num: string) => {
    const arr = (num + '')
        .split('')
        .reverse()
        .map((x) => parseInt(x));
    const lastDigit = arr.splice(0, 1)[0];
    let sum = arr.reduce(
        (acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9),
        0
    );
    sum += lastDigit;
    return sum % 10 === 0;
};
