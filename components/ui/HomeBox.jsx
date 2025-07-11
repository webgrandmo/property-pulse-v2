import Link from 'next/link';
const HomeBox = ({
	title,
	text,
	buttonInfo,
	bgColor = 'bg-gray-100',
	textColor = 'text-gray-800',
}) => {
	return (
		<div className={`${bgColor} p-6 rounded-lg shadow-md`}>
			<h2 className={`${textColor} text-2xl font-bold`}>{title}</h2>
			<p className={`${textColor} mt-2 mb-4`}>{text}</p>
			<Link
				href={`${buttonInfo.url}`}
				className={`${buttonInfo.btnBgColor} inline-block  text-white rounded-lg px-4 py-2 hover:bg-gray-700`}>
				{buttonInfo.text}
			</Link>
		</div>
	);
};

export default HomeBox;
