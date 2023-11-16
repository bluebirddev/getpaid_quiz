import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import sa from '~/assets/sa';
import { isInt } from '~/utils/number';

export function Input({
    type,
    value,
    onChange,
    label,
    placeholder,
    error,
    active,
}: {
    type: string;
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    error?: boolean | string;
    active?: boolean;
}) {
    const [isFocused, setIsFocused] = useState(true);
    const [innerValue, setInnerValue] = useState('');
    const ref = useRef<HTMLInputElement>(null);

    const isRaised = isFocused || value;

    const preIcon = type === 'tel' ? sa : undefined;

    const realValue = value === undefined ? innerValue : value;

    useEffect(() => {
        if (active) {
            setTimeout(() => {
                setIsFocused(true);
                ref.current?.focus();
            }, 0);
        }
    }, [active]);

    function onChangeMiddleware(e: ChangeEvent<HTMLInputElement>) {
        const newValue: string = (() => {
            if (type === 'tel' || type === 'numeric') {
                let val = e.target.value;
                if (type === 'tel') {
                    val = e.target.value.replace(/ /g, '').slice(0, 10);
                }

                if (!isInt(val)) return realValue;
                return val;
            }
            if (type === 'swift') {
                return e.target.value?.toUpperCase();
            }
            return e.target.value;
        })();

        if (!onChange) {
            setInnerValue(newValue);
        } else {
            onChange(newValue);
        }
    }

    function getDisplayValue(inputValue: string) {
        const newValue = (() => {
            if (type === 'tel') {
                let v = inputValue.replace(/ /g, '');
                v = (v.slice(0, 3) + ' ' + v.slice(3, 6) + ' ' + v.slice(6, 10)).trim();
                return v;
            }
            return inputValue;
        })();

        return newValue;
    }

    return (
        <div className="input relative flex justify-center flex-col">
            {label && (
                <label
                    className={`absolute bg-white p-[4px] mx-[14px] transition-all ${
                        isRaised
                            ? '-mt-[56px] text-[10px] leading-[12px] text-[#344054]'
                            : ' text-base leading-none text-[#B9B9B9]'
                    }`}
                >
                    {label}
                </label>
            )}
            <div className="flex items-center">
                {preIcon && <div className="absolute left-0 ml-[12px]">{preIcon}</div>}
                <input
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    value={getDisplayValue(realValue)}
                    ref={ref}
                    onChange={onChangeMiddleware}
                    placeholder={placeholder}
                    autoFocus={!isMobile}
                    type={type === 'email' ? 'search' : type}
                    className={`${preIcon ? 'pl-[48px] pr-[18px]' : 'px-[18px]'} ${
                        error ? 'border-[#F04438]' : 'border-[#D9D9D9] focus:border-[#344054]'
                    } outline-none border rounded w-full h-[52px]`}
                />
                {error && typeof error === 'string' && (
                    <div className="absolute bottom-[-25px] text-sm text-[#F04438]">{error}</div>
                )}
            </div>
        </div>
    );
}
