import logo from '~/assets/logo';
import { Button } from '~/components/Button';

export function HomePage() {
    return (
        <div
            className="fixed inset-0 overflow-y-auto flex flex-col"
            style={{
                background: 'linear-gradient(180deg, #FC7B28 69.83%, #FCBE2B 100%)',
            }}
        >
            <div className="max-w-[800px] w-full px-8 py-11 mx-auto text-white">
                <div className="w-[180px]">{logo}</div>
                <h1 className="mt-12 tracking-[-1px] leading-none lg:leading-normal">
                    <span className="font-semibold text-[40px] lg:text-[40px] block">Get your</span>
                    <span className="font-bold text-[50px] lg:text-[50px] lg:pt-0 pt-1.5 block">
                        Funeral Cover Quote
                    </span>
                </h1>
                <p className="pt-8 lg:pt-3 font-medium text-[20px]">
                    Take the first step towards securing your future. Complete our simple form, and
                    be ready to receive a call from our dedicated agents at{' '}
                    <strong>087 057 8939</strong>. They{"'"}
                    ll provide you with a no-obligation quote, allowing you to make an informed
                    decision about our funeral cover.
                </p>
                <div className="mt-10 text-[18px]">
                    <h4 className="font-bold">Here{"'"}s the process:</h4>
                    <ol className="pt-6 list-decimal pl-4">
                        <li>
                            <strong>Sign up</strong> effortlessly.
                        </li>
                        <li>
                            Answer our agent{"'"}s call at <strong>087 057 8939.</strong>
                        </li>
                        <li>
                            <strong>Listen to the quote</strong> and decide on the funeral cover
                            that suits you.
                        </li>
                        <li>
                            {' '}
                            Within 24 hours, expect a SMS containing a R40 Checkers shopping
                            voucher.
                        </li>
                    </ol>
                </div>
                <h3 className="pt-12 text-[30px] font-semibold leading-none tracking-[-1px]">
                    Your peace of mind is just a call away. Get started now!
                </h3>
                <div className="pt-10">
                    <Button href="/quiz" type="home">
                        Signup NOW
                    </Button>
                </div>
            </div>
            <div className="mt-auto py-5 px-10 text-[10px] leading-[12px] flex justify-between">
                <span>© Get Paid. All Rights Reserved.</span>
                <a
                    href="https://get-paid.co.za/privacy-cookie-policy"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                >
                    Privacy & Cookie Policy
                </a>
            </div>
        </div>
    );
}
