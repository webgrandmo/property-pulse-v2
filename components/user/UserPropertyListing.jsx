'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// import User from '@/models/User';
const UserPropertyListing = ({ properties: initialProperties }) => {
	const [properties, setProperties] = useState(initialProperties);
	return (
		<>
			{properties.length === 0 ? (
				<p className="text-gray-500">No properties found.</p>
			) : (
				properties.map((property) => (
					<div className="mb-10" key={property._id}>
						<Link href={`properties/${property._id}`}>
							<Image
								className="h-32 w-full rounded-md object-cover"
								src={property.images[0]}
								alt={property.name}
								width={800}
								height={300}
								loading="lazy"
							/>
						</Link>
						<div className="mt-2">
							{property.name && (
								<p className="text-lg font-semibold">
									{property.name}
								</p>
							)}
							{property.location && property.location.street && (
								<p className="text-gray-600">
									<span className="font-bold">Address:</span>{' '}
									{property.location.street}{' '}
									{property.location.city},{' '}
									{property.location.state}
								</p>
							)}
						</div>
						<div className="mt-2">
							<a
								href="/add-property.html"
								className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
							>
								Edit
							</a>
							<button
								className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
								type="button"
							>
								Delete
							</button>
						</div>
					</div>
				))
			)}
		</>
	);
};

export default UserPropertyListing;
