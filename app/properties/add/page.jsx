import PropertyAddForm from '@/components/properties/PropertyAddForm';

const AddPropertyPage = () => {
	return (
		<section className="bg-blue-50">
			<div className="container m-auto max-w-2xl py-24">
				<div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md m-4 md:m-0 border border-zinc-200">
					<PropertyAddForm />
				</div>
			</div>
		</section>
	);
};

export default AddPropertyPage;
