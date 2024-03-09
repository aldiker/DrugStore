const { Schema, model } = require('mongoose')

const medicines = new Schema({
	title: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	enabled: {
		type: Boolean,
		required: false,
	},
	img: String,
	shopId: {
		type: Schema.Types.ObjectId,
		ref: 'Shops',
	},
})

module.exports = model('Medicines', medicines)
