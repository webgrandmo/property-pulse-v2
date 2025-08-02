import PropertyDetails from '@/components/properties/PropertyDetails';
import PropertyImages from '@/components/properties/PropertyImages';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializableObject } from '@/utils/convertToObject';

const PropertyPage = async ({ params }) => {
	const { id } = await params;
	await connectDB();
	const propertyDoc = await Property.findById(id).lean();
	const property = convertToSerializableObject(propertyDoc);
	if (!property) {
		return (
			<h1 className="text-red-500 mt-10 font-bold text-center text-2xl">
				Property not found.
			</h1>
		);
	}
	return (
		<>
			<PropertyDetails property={property} />
			<PropertyImages property={property} />
		</>
	);
};

export default PropertyPage;
