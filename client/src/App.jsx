import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Medicines from './components/Medicines';
import Shops from './components/Shops';
import AddMedicine from './components/AddMedicine';
import Cart from './components/Cart';

export default function App() {
    // '', 'addingMedicine', 'shoppingCart'
    const [status, setStatus] = useState('');

    const [shops, setShops] = useState([]);
    const [activeShop, setActiveShop] = useState({});
    const [medicines, setMedicines] = useState([]);
    const [cart, setCart] = useState(() =>
        JSON.parse(localStorage.getItem('elifTechCart'))
    );

    console.log('card');
    console.log(cart);

    useEffect(() => {
        axios
            .get('http://localhost:3000/api/shops')
            .then((response) => {
                // console.log('shops');
                // console.log(response.data);
                setShops(response.data);
            })
            .catch((error) => {
                console.error('Error fetching shops:', error);
            });
    }, []);

    useEffect(() => {
        // console.log('activeShop');
        // console.log(activeShop);
        if (activeShop._id) {
            axios
                .get(`http://localhost:3000/api/medicines/${activeShop._id}`)
                .then((response) => {
                    // console.log(response.data);
                    setMedicines(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching medicines:', error);
                });
        }
    }, [activeShop]);

    useEffect(() => {
        localStorage.setItem('elifTechCart', JSON.stringify(cart));
    }, [cart]);

    function handleChangeShop(shop) {
        // console.log(shop);
        setActiveShop(shop);
    }

    function handleStatusAddMedicine() {
        setStatus('addingMedicine');
    }

    function handleStatusShoppingCart() {
        setStatus('shoppingCart');
    }

    function handleStatusReset() {
        setStatus('');
    }

    function handleAddToCart(medicine) {
        setCart((currentCart) => {
            if (!currentCart) return [medicine];
            const cartItem = { ...medicine, count: 1 };
            return [...currentCart, cartItem];
        });
    }

    function handleRemoveIntoCart(medicine) {
        console.log('medicine - remove into cart:');
        console.log(medicine);
        setCart((currentCart) =>
            currentCart.filter((item) => item._id !== medicine._id)
        );
    }

    function handleCartItemCountSet(itemToUpdate, count) {
        console.log(itemToUpdate);
        console.log(count);
        setCart((currentCart) =>
            currentCart.map((item) => {
                if (item._id === itemToUpdate._id) {
                    return { ...item, count: count ? count : 0 };
                }
                return item;
            })
        );
    }

    return (
        <div className="App">
            <Header
                onShop={handleStatusReset}
                onShoppingCart={handleStatusShoppingCart}
            />
            {status === 'addingMedicine' ? (
                <AddMedicine
                    onStatusReset={handleStatusReset}
                    activeShop={activeShop}
                />
            ) : status === 'shoppingCart' ? (
                <Cart
                    cart={cart}
                    onCartItemCountSet={handleCartItemCountSet}
                    onRemoveIntoCart={handleRemoveIntoCart}
                />
            ) : (
                <>
                    <Main>
                        <Shops
                            shops={shops}
                            onChangeShop={handleChangeShop}
                            onNeedAddMedicine={handleStatusAddMedicine}
                            onStatusReset={handleStatusReset}
                        />
                        <Medicines
                            medicines={medicines}
                            onAddToCart={handleAddToCart}
                        />
                    </Main>
                </>
            )}
        </div>
    );
}
