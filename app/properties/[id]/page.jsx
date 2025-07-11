const PropertyPage = async ({ params }) => {
    const { id } = await params;
    return <div>Property page with id: {id}</div>;
};

export default PropertyPage;
