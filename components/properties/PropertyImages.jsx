import PropertyImage from './PropertyImage';
const PropertyImages = ({ property }) => {
	return (
		<section className="bg-blue-50 p-4">
			<div className="container mx-auto">
				<div className="grid grid-cols-2 gap-4">
					{property.images && property.images.length > 0 ? (
						property.images.map((image, index) => (
							<div
								className={`${
									property.images.length === 3 && index === 2
										? 'col-span-2'
										: 'col-span-1'
								}`}
								key={image}
							>
								<PropertyImage image={image} />
							</div>
						))
					) : (
						<p>No images available for this property.</p>
					)}
				</div>
			</div>
		</section>
	);
};

export default PropertyImages;
