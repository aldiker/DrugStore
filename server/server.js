const express = require('express')
const { mongoose } = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

const Shops = require('./models/shops')
const Medicines = require('./models/medicines')
const Order = require('./models/order')

app.use(bodyParser.json())
app.use(cors())

// -------------------------------------------------------------------------

// const tempShops = [
//     {
//         title: 'Drug 24',
//         enabled: true,
//         img: '',
//     },
//     {
//         title: 'Pharmacy',
//         enabled: false,
//         img: '',
//     },
// ]

// function addShop(shop) {
// 	const newShop = new Shops(shop)
// 	newShop
// 		.save()
// 		.then(() => console.log('Shop created successfully'))
// 		.catch((err) => console.error(err))
// }

// medicines picture
// https://t4.ftcdn.net/jpg/02/81/42/77/360_F_281427785_gfahY8bX4VYCGo6jlfO8St38wS9cJQop.jpg

// const tempMedicine = {
// 	title: 'Medicine_1',
// 	price: 1,
// 	enabled: true,
// 	img: '',
// }

function addMedicine(medicine) {
	const tempMedicine = { ...medicine, img: 'https://t4.ftcdn.net/jpg/02/81/42/77/360_F_281427785_gfahY8bX4VYCGo6jlfO8St38wS9cJQop.jpg' }
	const newMedicine = new Medicines(tempMedicine)
	newMedicine
		.save()
		.then(() => console.log('Medicine created successfully'))
		.catch((err) => console.error(err))
}

// -------------------------------------------------------------------------

app.get('/', (req, res) => {
	res.send("I'm NodeJS-Express server")
})

app.get('/api/shops', async (req, res) => {
	try {
		const shops = await Shops.find()
		res.send(shops)
	} catch (error) {
		console.error(error)
		res.status(500).send('Server Error')
	}
})

app.post('/api/medicines', async (req, res) => {
	try {
		const medicine = req.body
		console.log(medicine)

		// Создаем новое лекарство
		await addMedicine(medicine)


		// Отправляем ответ клиенту об успешном создании лекарства
		res.status(201).json({ success: true, message: 'Medicine created successfully', newMedicine: medicine })
	} catch (error) {
		console.error('Error creating medicine:', error)
		res.status(500).json({ success: false, message: 'Server Error' })
	}
})

app.get('/api/medicines/:shopId', async (req, res) => {
	try {
		const shopId = req.params.shopId
		// console.log(`shopId = ${shopId}`)

		const medicines = await Medicines.find({ shopId: shopId })
		// console.log(medicines)
		res.json(medicines)

	} catch (error) {
		console.error('Error fetching medicines:', error)
		res.status(500).json({ success: false, message: 'Server Error' })
	}
})

app.post('/api/cart', async (req, res) => {
	try {
		const formData = req.body
		// console.log(formData)
		const newOrder = new Order({
			medicines: formData.cart.map((item) => ({
				medicineId: item._id,
				count: item.count
			})),
			user: {
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				address: formData.address,
			}
		})
		console.log(newOrder)

		const savedOrder = await newOrder.save()
		res.status(201).json({ success: true, message: 'Order saved successfully', order: savedOrder })
	} catch (error) {
		console.error('Error saving the cart:', error)
		res.status(500).json({ success: false, message: 'Server Error' })
	}
})

app.post('/api/updateMedicine', async (req, res) => {
	try {
		const updatedMedicine = req.body
		console.log(updatedMedicine)
		console.log('This element should be updated in the database, but this has not happened yet.')

		const updatedMedicineFromDB = await Medicines.findByIdAndUpdate(
			updatedMedicine._id,
			{ enabled: updatedMedicine.enabled },
			{ new: true }
		)

		if (!updatedMedicineFromDB) {
			return res.status(404).json({ success: false, message: 'Medicine not found' })
		}

		res.status(201).json({ success: true, message: 'Medicine updated successfully', medicine: updatedMedicineFromDB })
	} catch (error) {
		console.error('Error updating Medicine:', error)
		res.status(500).json({ success: false, message: 'Server Error' })
	}
})

async function start() {
	try {
		// MongoDB
		const password = 'V2nPbNm30EvUNxfH'
		const url = `mongodb+srv://aldiker:${password}@cluster0.lygokm6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

		await mongoose.connect(url, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
		})

		const PORT = process.env.PORT || 3000

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT} ...`)
		})
	} catch (error) {
		console.log(error)
	}
}

start()
