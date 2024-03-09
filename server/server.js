const express = require('express')
const { mongoose } = require('mongoose')
const cors = require('cors')
const app = express()

const Shops = require('./models/shops')

app.use(cors())

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

function addShop(shop) {
    const newShop = new Shops(shop)
    newShop
        .save()
        .then(() => console.log('Shop created successfully'))
        .catch((err) => console.error(err))
}

// medicines picture
// https://t4.ftcdn.net/jpg/02/81/42/77/360_F_281427785_gfahY8bX4VYCGo6jlfO8St38wS9cJQop.jpg

function addShop(shop) {
    const newShop = new Shops(shop)
    newShop
        .save()
        .then(() => console.log('Shop created successfully'))
        .catch((err) => console.error(err))
}

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
