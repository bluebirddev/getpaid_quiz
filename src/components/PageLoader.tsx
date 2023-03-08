import loadingIcon from './loadingIcon';

export function PageLoader({
  children = 'Checking your answer...',
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-10">{loadingIcon}</div>
      <h2 className="mt-16">{children}</h2>
    </div>
  );
}
