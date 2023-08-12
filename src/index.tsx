import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'jotai';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './styles/global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 5 * 1000,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    {/*<ReactQueryDevtools initialIsOpen={false} />*/}
  </QueryClientProvider>,
  // </React.StrictMode>
);
