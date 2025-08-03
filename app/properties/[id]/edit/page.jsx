import PropertyEditForm from '@/components/properties/PropertyEditForm';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializableObject } from '@/utils/convertToObject';

const EditPropertyPage = async ({ params }) => {
	const { id } = await params;

	if (!id) {
		throw new Error('Property ID is required');
	}

	// Connect to the database
	await connectDB();

	// Fetch the property document by ID
	const propertyDoc = await Property.findById(id).lean();
	const property = convertToSerializableObject(propertyDoc);

	if (!property) {
		throw new Error('Property not found');
	}

	return (
		<section className="bg-blue-50">
			<div className="container m-auto max-w-2xl py-24">
				<div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md m-4 md:m-0 border border-zinc-200">
					<PropertyEditForm property={property} />
				</div>
			</div>
		</section>
	);
};

export default EditPropertyPage;
