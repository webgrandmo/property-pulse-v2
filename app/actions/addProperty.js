'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import cloudinary from '@/config/cloudinary';

const addProperty = async (propertyData) => {
	const amenities = propertyData.getAll('amenities');
	const images = propertyData
		.getAll('images')
		.filter((image) => image.name !== '');

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
		amenities,
	};
	const imageUrls = [];
	for (const imageFile of images) {
		const imageBuffer = await imageFile.arrayBuffer();
		const imageArray = Array.from(new Uint8Array(imageBuffer));
		const imageData = Buffer.from(imageArray);

		// Convert image to base64
		const base64Image = imageData.toString('base64');
		const cloudinaryResponse = await cloudinary.uploader.upload(
			`data:${imageFile.type};base64,${base64Image}`,
			{
				folder: 'propertypulse',
				allowed_formats: ['jpg', 'jpeg', 'png'],
				use_filename: true,
				unique_filename: false,
			}
		);
		if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
			throw new Error('Failed to upload image to Cloudinary.');
		}
		if (!property.images) {
			property.images = [];
		}
		imageUrls.push(cloudinaryResponse.secure_url);
	}
	property.images = imageUrls;
	await connectDB();
	const newProperty = await Property.create(property);
	if (!newProperty) {
		throw new Error('Failed to add property. Please try again.');
	}
	revalidatePath('/', 'layout');
	redirect(`/properties/${newProperty._id}`);
};

export default addProperty;
