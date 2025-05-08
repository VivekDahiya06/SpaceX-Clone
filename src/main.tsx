import { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import Not_Found from './pages/not_found/Not_FoundPage';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Crew from './pages/crew/Crew';
import Rockets from './pages/rockets/Rockets';
import Launches from './pages/launches/Launches';
import StarLink from './pages/starlink/StarLink';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import ProtectedRoute from './components/auth/ProtectedRoute';

export const routes = [
	{
		path: '/',
		element: <App />,
		errorElement: <Not_Found />,
		children: [
			{
				path: '/',
				element: <Home />
			},
			{
				path: '/about',
				element: <ProtectedRoute><About /></ProtectedRoute>
			},
			{
				path: '/crew',
				element: <ProtectedRoute><Crew /></ProtectedRoute>
			},
			{
				path: '/rockets',
				element: <ProtectedRoute><Rockets /></ProtectedRoute>
			},
			{
				path: '/launches',
				element: <ProtectedRoute><Launches /></ProtectedRoute>
			},
			{
				path: '/starlink',
				element: <ProtectedRoute><StarLink /></ProtectedRoute>
			}
		]
	},
	{
		path: '/login',
		element: <Login />,
		errorElement: <Not_Found />
	},
	{
		path: '/signup',
		element: <Signup />,
		errorElement: <Not_Found />
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
