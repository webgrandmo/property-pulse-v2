import PropertyCard from './PropertyCard';
import Link from 'next/link';
import connectDB from '@/config/database';
import Property from '@/models/Property';

const PropertyRecent = async ({
	heading = 'Recent Properties',
	buttonText = 'View All Properties',
}) => {
	await connectDB();
	const recentProperties = await Property.find({})
		.sort({ createdAt: -1 })
		.limit(3)
		.lean();

	return (
		<>
			<section className="px-4 py-6">
				<div className="container-xl lg:container m-auto px-4 py-6">
					<h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
						{heading}
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{recentProperties.map((property) => (
							<PropertyCard
								property={property}
								key={property._id}
							/>
						))}
					</div>
				</div>
			</section>
			<section className="m-auto my-4 max-w-lg px-6">
				<Link
					href={'/properties'}
					className="block bg-black text-white py-4 px-6 text-center rounded-xl hover:bg-gray-700"
				>
					{buttonText}
				</Link>
			</section>
		</>
	);
};

export default PropertyRecent;
