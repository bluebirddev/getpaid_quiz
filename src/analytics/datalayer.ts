/* eslint-disable @typescript-eslint/no-explicit-any */
export type Event = {
    event: 'lead_onboarding';
    step: string;
    user_id?: string;
    // underscore, lowercase, and now spaces
    // salary?: string;
    // employment?: string;
    // email?: string;
    // phone?: string;
    // life_insurance?: string;
};

export async function pushEvent(event: Event, data: Record<string, string> = {}) {
    return;
    try {
        const obj = { ...event, ...data };
        console.log('GTM event: ', obj);
        if (!import.meta.env.DEV) {
            (window as any).dataLayer = (window as any).dataLayer || [];
            (window as any).dataLayer.push(obj);
        }
    } catch (err) {
        console.log({ err });
        //
    }
}
