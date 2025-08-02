import Image from 'next/image';
import profileDefaultImage from '@/assets/images/profile.png';
const UserProfile = ({ user }) => {
	const { name, email, image } = user;
	return (
		<>
			<div className="md:w-1/4 mx-20 mt-10">
				<div className="mb-4">
					<Image
						className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
						src={image ? image : profileDefaultImage}
						alt={name}
						width={192}
						height={192}
					/>
				</div>

				<h2 className="mb-2">
					{name && (
						<>
							<span className="font-bold block">Name:</span>
							{name}
						</>
					)}
				</h2>
				<h2>
					{email && (
						<>
							<span className="font-bold block">Email:</span>
							{email}
						</>
					)}
				</h2>
			</div>
		</>
	);
};

export default UserProfile;
