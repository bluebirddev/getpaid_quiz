import alreadySignedUp from '~/assets/alreadySignedUp';
import { Button } from './Button';

export function EmailError({ onBack }: { onBack: () => void }) {
    return (
        <div className="flex flex-col items-center">
            <div className="mt-2">{alreadySignedUp}</div>
            <h2 className="mt-8">Already signed up</h2>
            <ul className="text-[#FC7B28] list-disc my-8 ml-4">
                <li>This email address has already been used. </li>
                <li>Please check the email address to ensure you have entered it correctly. </li>
                <li>Remember, you cannot sign up more than once. </li>
            </ul>
            <Button onClick={onBack} type="primary" wider>
                Back
            </Button>
        </div>
    );
}
