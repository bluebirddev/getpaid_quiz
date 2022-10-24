import '../src/index.css';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (story) => <QueryClientProvider client={queryClient}>{story()}</QueryClientProvider>,
];
