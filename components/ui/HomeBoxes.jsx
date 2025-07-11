import HomeBox from './HomeBox';
const HomeBoxes = () => {
	return (
		<section>
			<div className='container-xl lg:container m-auto'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
					<HomeBox
						title={'For Renters'}
						text={
							'Find your dream rental property. Bookmark properties and contact owners.'
						}
						buttonInfo={{
							url: '/properties',
							text: 'Browse Properties',
							btnBgColor: 'bg-black',
						}}></HomeBox>
					<HomeBox
						bgColor='bg-blue-100'
						title={'For Property Owners'}
						text={
							'List your properties and reach potential tenants. Rent as an airbnb or long term.'
						}
						buttonInfo={{
							url: '/properties/add',
							text: 'Add Properties',
							btnBgColor: 'bg-blue-500',
						}}></HomeBox>
				</div>
			</div>
		</section>
	);
};

export default HomeBoxes;
