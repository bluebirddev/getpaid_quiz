import { HomeLayout } from '../components/HomeLayout';
import { GenericError } from '~/components/GenericError';
import { QuizLayout } from '~/components/QuizLayout';
import { PageLoader } from '~/components/PageLoader';
import youGotMail from './you-got-mail';

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
        <HomeLayout>
            <div className="flex justify-center mt-4 md:mt-10">{youGotMail}</div>
            <div className="mt-8 md:mt-[54px] text-center relative bg-white h-[184px]">
                <div className="absolute inset-0">
                    <svg
                        width="284"
                        height="198"
                        viewBox="0 0 284 198"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g filter="url(#filter0_dd_66_12146)">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M268 136.762C231.188 134.488 187.882 133.177 141.537 133.177C95.5794 133.177 52.611 134.466 15.9998 136.705V178.471C52.611 180.711 95.5794 182 141.537 182C187.882 182 231.188 180.689 268 178.414V136.762Z"
                                fill="#D9D9D9"
                            />
                        </g>
                        <g filter="url(#filter1_dd_66_12146)">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M268 19.5856C231.188 17.3112 187.882 16 141.537 16C95.5794 16 52.611 17.2894 15.9998 19.5287V61.2949C52.611 63.5342 95.5794 64.8235 141.537 64.8235C187.882 64.8235 231.188 63.5123 268 61.2379V19.5856Z"
                                fill="#D9D9D9"
                            />
                        </g>
                        <defs>
                            <filter
                                id="filter0_dd_66_12146"
                                x="-0.000244141"
                                y="117.177"
                                width="284"
                                height="80.8235"
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB"
                            >
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset />
                                <feGaussianBlur stdDeviation="8" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                                />
                                <feBlend
                                    mode="normal"
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_66_12146"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset />
                                <feGaussianBlur stdDeviation="8" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                                />
                                <feBlend
                                    mode="normal"
                                    in2="effect1_dropShadow_66_12146"
                                    result="effect2_dropShadow_66_12146"
                                />
                                <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect2_dropShadow_66_12146"
                                    result="shape"
                                />
                            </filter>
                            <filter
                                id="filter1_dd_66_12146"
                                x="-0.000244141"
                                y="0"
                                width="284"
                                height="80.8235"
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB"
                            >
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset />
                                <feGaussianBlur stdDeviation="8" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                                />
                                <feBlend
                                    mode="normal"
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_66_12146"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset />
                                <feGaussianBlur stdDeviation="8" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                                />
                                <feBlend
                                    mode="normal"
                                    in2="effect1_dropShadow_66_12146"
                                    result="effect2_dropShadow_66_12146"
                                />
                                <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect2_dropShadow_66_12146"
                                    result="shape"
                                />
                            </filter>
                        </defs>
                    </svg>
                </div>
                <div className="bg-white absolute inset-0 mt-3 flex items-center none">
                    <div>
                        <h2>You’ve got mail</h2>
                        <p className="mt-[7px] text-sm">
                            We have sent you a verification email.
                        </p>{' '}
                        <p className="mt-[7px] text-sm">
                            In order to complete your signup, go to your email inbox and verify your
                            email by clicking the link in the email.
                        </p>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}
