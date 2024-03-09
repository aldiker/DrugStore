const { Schema, model } = require('mongoose')

const shops = new Schema({
    title: {
        type: String,
        required: true,
    },
    enabled: {
        type: Boolean,
        required: false,
    },
    img: String,
})

module.exports = model('Shops', shops)
