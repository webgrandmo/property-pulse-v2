import '@/assets/styles/globals.css';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
					<ToastContainer
						position="top-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
					/>
				</body>
			</html>
		</AuthProvider>
	);
};

export default MainLayout;
