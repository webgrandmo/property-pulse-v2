import '@/assets/styles/globals.css';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import AuthProvider from '@/components/provider/AuthProvider';

export const metadata = {
	title: 'Property Pulse',
	keywords: 'rental, real-estate',
};

const MainLayout = ({ children }) => {
	return (
		<AuthProvider>
			<html lang="en-US">
				<body>
					<Navbar />
					<main>{children}</main>
					<Footer />
				</body>
			</html>
		</AuthProvider>
	);
};

export default MainLayout;
