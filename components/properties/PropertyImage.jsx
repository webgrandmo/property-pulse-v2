import Image from 'next/image';

const PropertyImage = ({ image }) => {
	return (
		<Image
			src={image}
			alt={`Property Image ${image}`}
			className="object-cover h-[400px] w-full rounded-xl cursor-pointer"
			width={0}
			height={0}
			sizes="100vw"
		/>
	);
};

export default PropertyImage;
