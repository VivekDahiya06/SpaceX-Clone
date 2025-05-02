import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import Landing from './pages/landing/Landing';
import Capsule from './pages/capsule/Capsule';
import Company from './pages/company/Company';
import Not_Found from './pages/not_found/Not_FoundPage';

export const routes = [
	{
		path: '/',
		element: <App />,
		errorElement: <Not_Found />,
		children: [
			{
				path: '/',
				element: <Landing />
			},
			{
				path: '/capsule',
				element: <Capsule />
			},
			{
				path: '/company',
				element: <Company />
			}
		]
	}
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			cacheTime: 1000 * 60 * 15
		}
	}
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>
);
