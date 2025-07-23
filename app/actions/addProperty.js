'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

const addProperty = async (propertyData) => {
	const amenities = propertyData.getAll('amenities');
	const images = propertyData
		.getAll('images')
		.filter((image) => image.name !== '')
		.map((image) => image.name);

	const sessionUser = await getSessionUser();
	if (!sessionUser) {
		throw new Error('You must be logged in to add a property.');
	}
	const userId = sessionUser.id;
	if (!userId) {
		throw new Error('User ID is not available in the session.');
	}
	const property = {
		owner: userId,
		type: propertyData.get('type'),
		name: propertyData.get('name'),
		description: propertyData.get('description'),
		location: {
			street: propertyData.get('location.street'),
			city: propertyData.get('location.city'),
			state: propertyData.get('location.state'),
			zipcode: propertyData.get('location.zipcode'),
		},
		beds: propertyData.get('beds'),
		baths: propertyData.get('baths'),
		square_feet: propertyData.get('square_feet'),
		rates: {
			nightly: propertyData.get('rates.nightly'),
			weekly: propertyData.get('rates.weekly'),
			monthly: propertyData.get('rates.monthly'),
		},
		seller_info: {
			name: propertyData.get('seller_info.name'),
			email: propertyData.get('seller_info.email'),
			phone: propertyData.get('seller_info.phone'),
		},
		amenities: amenities,
		images: images,
	};
	await connectDB();
	const newProperty = await Property.create(property);
	if (!newProperty) {
		throw new Error('Failed to add property. Please try again.');
	}
	revalidatePath('/', 'layout');
	redirect(`/properties/${newProperty._id}`);
};

export default addProperty;
