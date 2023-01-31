import classNames from 'classnames';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export function Button({
  onClick,
  children,
  type = 'primary',
  disabled,
  href,
}: {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'primary' | 'secondary';
  disabled?: boolean;
  href?: string;
}) {
  const content = (
    <button
      className={classNames(
        `
        font-medium border rounded-lg h-12 flex items-center
        justify-center w-full 
        
        focus:ring-2 focus:outline-none ring-[#D0D5DD]
      `,
        {
          [`focus:ring-[#D0D5DD] drop-shadow-[0_1px_2px_rgba(16,24,40,0.05)]
        hover:bg-[#F9FAFB] border-[#D0D5DD] bg-white`]: type === 'secondary' && !disabled,
          [`focus:ring-[#DC5B08] drop-shadow-[0_1px_2px_rgba(16,24,40,0.05)]
      hover:bg-[#EC6B18] border-[#FC7B28] bg-[#FC7B28] text-white`]:
            type === 'primary' && !disabled,
          ['border-[#FC7B2899] bg-[#FC7B2899] text-white']: type === 'primary' && disabled,
        }
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );

  return href ? <Link to={href}>{content}</Link> : content;
}
