import PropertyDetails from '@/components/properties/PropertyDetails';
import connectDB from '@/config/database';
import Property from '@/models/Property';

const PropertyPage = async ({ params }) => {
	const { id } = await params;
	await connectDB();
	const property = await Property.findById(id).lean();

	return <PropertyDetails property={property} />;
};

export default PropertyPage;
