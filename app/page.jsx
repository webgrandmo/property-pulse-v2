import PropertyRecent from '@/components/properties/PropertyRecent';
import Hero from '@/components/ui/Hero';
import HomeBoxes from '@/components/ui/HomeBoxes';
import connectDB from '@/config/database';
const HomePage = () => {
	connectDB();

	return (
		<>
			<Hero />
			<HomeBoxes />
			<PropertyRecent />
		</>
	);
};

export default HomePage;
