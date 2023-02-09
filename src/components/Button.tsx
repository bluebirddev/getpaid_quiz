import classNames from 'classnames';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export function Button({
  onClick,
  children,
  type = 'primary',
  disabled,
  href,
  size = 'medium',
  wider,
}: {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'primary' | 'secondary';
  disabled?: boolean;
  href?: string;
  size?: 'medium' | 'large';
  wider?: boolean;
}) {
  const content = (
    <button
      className={classNames(
        `
        font-medium border rounded-lg flex items-center
        justify-center w-full 
        
        focus:ring-2 focus:outline-none ring-[#D0D5DD]
      `,
        {
          'h-[36px] md:h-12 text-sm': size === 'medium',
          'w-[130px] md:w-[191px]': size === 'medium' && wider,
          'w-[109px] md:w-[117px]': size === 'medium' && !wider,
          'h-12 text-base': size === 'large',
          [`
          drop-shadow-[0_1px_2px_rgba(16,24,40,0.05)] border-[#D0D5DD] bg-white
        focus:ring-[#D0D5DD]
        hover:bg-[#F9F9F9]
          `]: type === 'secondary' && !disabled,
          [`
          drop-shadow-[0_1px_2px_rgba(16,24,40,0.05)] text-white border-[#FC7B28] bg-[#FC7B28]
        focus:ring-[#D0D5DD]
        hover:bg-[#E05E0A] hover:border-[#C65207]
          `]: type === 'primary' && !disabled,
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
