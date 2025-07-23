import { model, models, Schema } from 'mongoose';

const PropertySchema = new Schema(
	{
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		name: {
			type: String,
			required: [true, 'Property name is required'],
		},
		type: {
			type: String,
			required: [true, 'Property type is required'],
		},
		description: {
			type: String,
			required: [true, 'Property description is required'],
			maxlength: [500, 'Description cannot exceed 500 characters'],
		},
		location: {
			street: {
				type: String,
				required: [true, 'Property street is required'],
			},
			city: {
				type: String,
				required: [true, 'Property city is required'],
			},
			state: {
				type: String,
				required: [true, 'Property state is required'],
			},
			zipcode: {
				type: String,
				required: [true, 'Property zipcode is required'],
			},
		},
		beds: {
			type: Number,
			required: true,
		},
		baths: {
			type: Number,
			required: true,
		},
		square_feet: {
			type: Number,
			required: true,
		},
		amenities: [
			{
				type: String,
			},
		],
		rates: {
			nightly: Number,
			weekly: Number,
			monthly: Number,
		},
		seller_info: {
			name: {
				type: String,
				required: [true, 'Property seller name is required'],
			},
			email: {
				type: String,
				required: [true, 'Property seller email is required'],
			},
			phone: {
				type: String,
				required: [true, 'Property seller phone is required'],
			},
		},
		images: [
			{
				type: String,
			},
		],
		is_featured: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const Property = models.Property || model('Property', PropertySchema);

export default Property;
