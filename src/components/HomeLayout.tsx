import classNames from 'classnames';
import logo from '~/assets/logo';

export function HomeLayout({ children, alt }: { children: React.ReactNode; alt?: boolean }) {
    return (
        <div className="fixed inset-0 overflow-y-auto bg-[#F1F5FB] flex flex-col">
            <header className="w-full max-h-[125px] min-h-[125px] bg-gradient-to-b from-[#FC7B28] to-[#FCBE2B] flex justify-center items-center">
                <div className="max-w-[300px] mx-[15px] w-full">
                    <div className="w-[172px]">{logo}</div>
                </div>
            </header>
            <div className={classNames('flex justify-center', { 'flex-1': !alt })}>
                <div
                    className={classNames(
                        'max-w-[1186px] w-full bg-white mx-[15px] flex shadow-[0_0_16px_rgba(0,0,0,0.08)] justify-center',
                        { 'rounded-b-[60px]': alt }
                    )}
                >
                    <div
                        className={classNames('w-full text-body flex', {
                            'flex-col max-w-[300px] flex-1 mx-6': !alt,
                            'mx-4 md:mx-14 md:flex-row flex-col': alt,
                        })}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
