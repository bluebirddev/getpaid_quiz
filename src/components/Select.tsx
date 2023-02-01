/* eslint-disable @typescript-eslint/no-explicit-any */
type Select = {
  type: 'select' | 'multi-select';
  options: { value: string; label: string }[];
};
type MultiSelect = {
  type: 'multi-select';
  options: { value: string; label: string }[];
};
type YesNo = {
  type: 'yes-no';
  options: { value: boolean; label: string }[];
};
type SelectProps = { value: any; onChange: (value: any) => void } & (Select | MultiSelect | YesNo);

export function Select(props: SelectProps) {
  const options = props.options;

  const answers = Array.isArray(props.value) ? (props.value as string[]) : [];
  const answer = props.value;

  return (
    <ol className="mt-1 flex-col flex space-y-3">
      {options.map((q) => {
        const isSelected =
          props.type === 'multi-select' ? answers.includes(q.value as string) : answer === q.value;

        const onClick = () => {
          if (props.type === 'multi-select') {
            if (isSelected) {
              props.onChange(answers.filter((a) => a !== q.value));
            } else {
              props.onChange([...answers, q.value]);
            }
          } else {
            props.onChange(q.value);
          }
        };

        return (
          <li
            key={props.type == 'yes-no' ? (q.value ? '1' : '0') : (q.value as string)}
            className={`
              cursor-pointer ring-[#D0D5DD] text-[14px] px-4 font-medium leading-[20px] flex items-center h-[56px] rounded border
              focus-within:ring-2
              ${
                isSelected
                  ? 'bg-[rgba(252,190,43,0.2)] border-[#344054]'
                  : 'border-[#EAECF0] bg-[#F9F9F9] hover:bg-[#F0F0F0] hover:border-[#E5E6E9]'
              }`}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <button
              onClick={onClick}
              className={`h-[20px] w-[20px] border mr-3 flex items-center justify-center
              ${props.type === 'multi-select' ? 'rounded-[6px]' : 'rounded-full'}
              ${isSelected ? 'border-[#344054] bg-[#FC7B28]' : 'border-[#CFD4DC]'}`}
            >
              {isSelected &&
                (props.type === 'multi-select' ? (
                  <svg
                    width="12"
                    height="9"
                    viewBox="0 0 12 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.6666 1.5L4.24992 7.91667L1.33325 5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <div className="h-2 w-2 rounded-full bg-white" />
                ))}
            </button>
            {q.label}
          </li>
        );
      })}
    </ol>
  );
}
