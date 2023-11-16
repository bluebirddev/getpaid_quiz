import alreadySignedUp from '~/assets/alreadySignedUp';
import { Button } from './Button';

export function TelError({ onBack }: { onBack: () => void }) {
    return (
        <div className="flex flex-col items-center">
            <div className="mt-2">{alreadySignedUp}</div>
            <h2 className="mt-8">Already signed up</h2>
            <ul className="text-[#FC7B28] list-disc my-8 ml-4">
                <li>This number has already been used. </li>
                <li>Please check the number to ensure you have entered it correctly. </li>
                <li>Remember, you cannot sign up more than once. </li>
            </ul>
            <Button onClick={onBack} type="primary" wider>
                Back
            </Button>
        </div>
    );
}
