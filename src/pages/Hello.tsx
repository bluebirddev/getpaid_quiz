import logo from '~/assets/logo';
import { Button } from '~/components/Button';

export function Hello() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#FC7B28] to-[#FCBE2B] flex justify-center md:items-center">
      <div className="max-w-[405px] mx-5 w-full text-body flex flex-col flex-1 md:mt-0 mt-16">
        {logo}
        <h1 className="mt-4 text-[40px] leading-[48px] font-bold">Hey, welcome to Get Paid</h1>
        <ol className="list-disc space-y-4 mt-8 ml-4 mb-16">
          <li>It takes about 3 minutes to complete</li>
          <li>After you sign up, you will receive an SMS when you are selected to be called.</li>
          <li>
            In order to qualify for the voucher, you must listen to the agent’s competitive quote.
          </li>
          <li>
            {' '}
            We will send you your voucher via SMS, two working days after you received the call.
          </li>
        </ol>
        <Button>Start</Button>
        <div className="mt-auto md:mt-20 mb-5 text-[10px] leading-[12px] flex justify-between">
          <span>© Get Paid. All Rights Reserved.</span>
          <a href="https://get-paid.co.za/privacy-cookie-policy" target="_blank" rel="noreferrer">
            Privacy & Cookie Policy
          </a>
        </div>
      </div>
    </div>
  );
}
