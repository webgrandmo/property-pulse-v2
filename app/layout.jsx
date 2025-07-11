import '@/assets/styles/globals.css';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

export const metadata = {
	title: 'Property Pulse',
	keywords: 'rental, real-estate',
};

const MainLayout = ({ children }) => {
	return (
		<html lang={'en-US'}>
			<body>
				<Navbar />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
};

export default MainLayout;
