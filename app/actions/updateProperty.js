'use server';

import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const updateProperty = async (id, formData) => {
	// Connect to the database
	await connectDB();

	const sessionUser = await getSessionUser();
	if (!sessionUser) {
		throw new Error('You must be logged in to add a property.');
	}
	const userId = sessionUser.id;
	if (!userId) {
		throw new Error('User ID is not available in the session.');
	}
	const propertyData = {
		owner: userId,
		type: formData.get('type'),
		name: formData.get('name'),
		description: formData.get('description'),
		location: {
			street: formData.get('location.street'),
			city: formData.get('location.city'),
			state: formData.get('location.state'),
			zipcode: formData.get('location.zipcode'),
		},
		beds: formData.get('beds'),
		baths: formData.get('baths'),
		square_feet: formData.get('square_feet'),
		rates: {
			nightly: formData.get('rates.nightly'),
			weekly: formData.get('rates.weekly'),
			monthly: formData.get('rates.monthly'),
		},
		seller_info: {
			name: formData.get('seller_info.name'),
			email: formData.get('seller_info.email'),
			phone: formData.get('seller_info.phone'),
		},
		amenities: formData.getAll('amenities'),
	};

	const existingProperty = await Property.findById(id);
	console.log('existingProperty', existingProperty);

	if (!existingProperty) {
		throw new Error('Property not found');
	}
	if (existingProperty.owner.toString() !== userId) {
		throw new Error('You do not have permission to update this property');
	}

	const updatedProperty = await Property.findByIdAndUpdate(id, propertyData, {
		new: true,
		runValidators: true,
	});
	revalidatePath(`/properties/${id}/edit`, '/', 'layout');
	redirect(`/properties/${id}`);
};
