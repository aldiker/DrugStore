const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
	medicines: [
		{
			medicineId: {
				type: Schema.Types.ObjectId,
				ref: 'Medicines',
				required: true,
			},
			count: {
				type: Number,
				required: true,
			},
		},
	],
	user: {
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
	},
	date: {
		type: Date,
		default: Date.now,
	},
})

module.exports = model('Order', orderSchema)