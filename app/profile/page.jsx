import { getSessionUser } from '@/utils/getSessionUser';
import { convertToSerializableObject } from '@/utils/convertToObject';
import connectDB from '@/config/database';
import Property from '@/models/Property';

import UserProfile from '@/components/user/UserProfile';
import UserPropertyListing from '@/components/user/UserPropertyListing';
const ProfilePage = async () => {
	await connectDB();

	// Fetch user data from session
	const sessionUser = await getSessionUser();
	const user = sessionUser?.user || {};

	if (!sessionUser) {
		throw new Error('You must be logged in to view your profile.');
	}

	if (!user.id) {
		throw new Error('User ID is not available in the session.');
	}

	const propertiesDocs = await Property.find({ owner: user.id }).lean();

	const properties = propertiesDocs.map(convertToSerializableObject);

	return (
		<section className="bg-blue-50">
			<div className="container m-auto py-24 px-6">
				<div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border-zinc-200 m-4 md:m-0">
					<h1 className="text-3xl font-bold mb-4">Your Profile</h1>
					<div className="flex flex-col md:flex-row">
						<UserProfile user={user} />

						<div className="md:w-3/4 md:pl-4">
							<h2 className="text-xl font-semibold mb-4">
								Your Listings
							</h2>
							<UserPropertyListing properties={properties} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProfilePage;
