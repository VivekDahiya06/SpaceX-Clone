import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Loader, MantineProvider } from '@mantine/core';
import { theme } from './theme';
import './App.scss';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

export default function App() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
			<Suspense fallback={
				<main className='loader'>
					<Loader color="#848eff" size="xl" />
				</main>
			}>
				<Header />
				<Outlet />
				<Footer />
			</Suspense>
		</MantineProvider>
	);
}
