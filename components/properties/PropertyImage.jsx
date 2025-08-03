import Image from 'next/image';

const PropertyImage = ({ image }) => {
	return (
		<Image
			src={image}
			alt={`Property Image ${image}`}
			className="object-cover h-[400px] w-full rounded-xl cursor-pointer"
			width={1000}
			height={400}
		/>
	);
};

export default PropertyImage;
