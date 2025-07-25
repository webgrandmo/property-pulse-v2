import PropertyCard from '@/components/properties/PropertyCard';
import connectDB from '@/config/database';
import Property from '@/models/Property';

const PropertiesPage = async () => {
	await connectDB();
	const properties = await Property.find({}).lean();
	return (
		<section className="px-4 py-6">
			<div className="container-xl lg:container m-auto px-4 py-6">
				{!properties && (
					<p className="text-2xl text-center">No Properties Found</p>
				)}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{properties.map((property) => (
						<PropertyCard property={property} key={property._id} />
					))}
				</div>
			</div>
		</section>
	);
};

export default PropertiesPage;
