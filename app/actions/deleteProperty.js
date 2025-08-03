'use server';
import cloudinary from '@/config/cloudinary';
import Property from '@/models/Property';
import connectDB from '@/config/database';
import { revalidatePath } from 'next/cache';
import { getSessionUser } from '@/utils/getSessionUser';

const deleteProperty = async (propertyId) => {
	// Check if the user is authenticated
	const sessionUser = await getSessionUser();
	if (!sessionUser || !sessionUser.user.id) {
		throw new Error('Unauthorized');
	}
	// Connect to the database and delete the property
	await connectDB();
	const property = await Property.findById(propertyId);
	if (!property) {
		throw new Error('Property not found');
	}
	// Check if the user is the owner of the property
	if (property.owner.toString() !== sessionUser.user.id) {
		throw new Error('You are not authorized to delete this property');
	}

	// Delete images from Cloudinary
	if (property.images && property.images.length > 0) {
		const publicIds = property.images.map((imageUrl) => {
			const urlParts = imageUrl.split('/');
			const publicId = urlParts.at(-1).split('.').at(0);
			return publicId;
		});

		if (publicIds.length > 0) {
			for (const publicId of publicIds) {
				await cloudinary.uploader.destroy(`propertypulse/${publicId}`);
			}
		}
	}
	await Property.deleteOne({ _id: propertyId });
	revalidatePath('layout', '/');
};

export default deleteProperty;
