import logo from '~/assets/logo';

export function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="fixed inset-0 overflow-y-auto bg-[#F1F5FB] flex flex-col">
            <header className="w-full max-h-[125px] min-h-[125px] bg-gradient-to-b from-[#FC7B28] to-[#FCBE2B] flex justify-center items-center">
                <div className="max-w-[300px] mx-[15px] w-full">
                    <div className="w-[172px]">{logo}</div>
                </div>
            </header>
            <div className="flex justify-center flex-1">
                <div className="max-w-[1186px] w-full bg-white mx-[15px] flex shadow-[0_0_16px_rgba(0,0,0,0.08)] justify-center">
                    <div className="max-w-[300px] mx-6 w-full text-body flex flex-col flex-1">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
