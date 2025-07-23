import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';

export const getSessionUser = async () => {
	try {
		const session = await getServerSession(authOptions);
		if (!session || !session.user) {
			return null;
		}
		return {
			user: session?.user,
			// Assuming session.user has an id field
			id: session?.user?.id,
		};
	} catch (error) {
		console.error('Error fetching session user:', error);
		return null;
	}
};
