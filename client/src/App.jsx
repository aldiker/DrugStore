import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Medicines from './components/Medicines'
import Shops from './components/Shops'

export default function App() {
    const [shops, setShops] = useState([])
    const [medicines, setMedicines] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/api/shops').then((response) => {
            console.log(response.data)
            setShops(response.data)
        })
    }, [])

    return (
        <div className="App">
            <Header />
            <Main>
                <Shops />
                <Medicines />
            </Main>
        </div>
    )
}
