import GoogleProvider from 'next-auth/providers/google';
import connectDB from '@/config/database';
import User from '@/models/User';

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
		// ...add more providers here
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		// Invoked on successful login
		async signIn({ profile }) {
			// 1. Connect to DB
			await connectDB();
			// 2. Check if user exists
			const userExists = await User.findOne({ email: profile.email });
			// 3. If not - create one
			const username = profile.name.slice(0, 20);
			if (!userExists) {
				await User.create({
					email: profile.email,
					username,
					image: profile.picture,
				});
			}
			// 4. Return "true" to allow sign-in
			return true;
		},
		// Session function that modifies session object
		async session({ session }) {
			// 1. Get user from the database
			const user = await User.findOne({ email: session.user.email });
			// 2. Assign user id from the session
			session.user.id = await user._id.toString();
			// 3. Return session
			return session;
		},
	},
};
