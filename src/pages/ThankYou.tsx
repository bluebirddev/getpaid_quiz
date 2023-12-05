import { HomeLayout } from '../components/HomeLayout';
import { GenericError } from '~/components/GenericError';
import { QuizLayout } from '~/components/QuizLayout';
import { PageLoader } from '~/components/PageLoader';

export function ThankYou({ loading, error }: { loading: boolean; error: boolean }) {
    if (loading) {
        return (
            <QuizLayout progress={1}>
                <PageLoader>Processing...</PageLoader>
            </QuizLayout>
        );
    }

    if (error) {
        return (
            <QuizLayout progress={1}>
                <GenericError />
            </QuizLayout>
        );
    }

    return (
        <HomeLayout alt>
            <div className="md:w-3/5 h-full text-body flex flex-col justify-center py-8">
                <h1 className="text-[30px] leading-normal md:text-[40px] font-semibold tracking-[-1px]">
                    You have successfully signed up
                </h1>
                <div className="pt-8 md:text-lg pr-8">
                    <p>
                        As soon as you are selected for a campaign, we will send you a SMS and you
                        will be called from 0870 578 939.
                    </p>
                    <br />
                    <div>
                        <span>Remember, to earn your voucher, you must</span>
                    </div>
                    <ul className="list-disc list-inside pl-4">
                        <li>Answer the call</li>
                        <li>Listen to the agents competitive funeral cover quote.</li>
                    </ul>
                    <br />
                    <p>
                        You should receive your voucher via SMS, 24 hours after you received your
                        quote.
                    </p>
                </div>
            </div>
            <div className="md:-mt-16 md:-mr-14">
                <img src="/girl.webp" alt="" className="max-h-[720px]" />
            </div>
        </HomeLayout>
    );
}
