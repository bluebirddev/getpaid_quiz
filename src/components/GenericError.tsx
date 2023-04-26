import alreadySignedUp from '~/assets/alreadySignedUp';

export function GenericError() {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-2">{alreadySignedUp}</div>
      <h2 className="my-8">Oops, something went wrong</h2>
    </div>
  );
}
