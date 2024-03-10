import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Medicines from './components/Medicines';
import Shops from './components/Shops';
import AddMedicine from './components/AddMedicine';
import Cart from './components/Cart';

function sortMedicines(a, b) {
    // Помещаем элементы с enabled = true в начало списка
    if (a.enabled && !b.enabled) {
        return -1;
    } else if (!a.enabled && b.enabled) {
        return 1;
    } else {
        return 0;
    }
}

export default function App() {
    // '', 'addingMedicine', 'shoppingCart'
    const [status, setStatus] = useState('');

    const [shops, setShops] = useState([]);
    const [activeShop, setActiveShop] = useState({});
    const [medicines, setMedicines] = useState([]);
    const [cart, setCart] = useState(() =>
        JSON.parse(localStorage.getItem('elifTechCart'))
    );

    // console.log('card');
    // console.log(cart);

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
        if (activeShop._id) {
            axios
                .get(`http://localhost:3000/api/medicines/${activeShop._id}`)
                .then((response) => {
                    const allMedicines = response.data;
                    const sortedMedicines = allMedicines.sort((a, b) =>
                        sortMedicines(a, b)
                    );

                    // console.log(response.data);
                    setMedicines(sortedMedicines);
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
            const cartItem = { ...medicine, count: 1 };
            if (!currentCart) return [cartItem];

            const existingItemIndex = currentCart.findIndex(
                (item) => item._id === medicine._id
            );
            if (existingItemIndex !== -1) {
                const updatedCart = [...currentCart];
                const existingItem = updatedCart[existingItemIndex];
                updatedCart[existingItemIndex] = {
                    ...existingItem,
                    count: existingItem.count + 1,
                };
                return updatedCart;
            }

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

    function handleSortByPrice() {
        setMedicines((currentMedicines) => {
            const sortedMedicines = [...currentMedicines];
            sortedMedicines.sort((a, b) => a.price - b.price);
            return sortedMedicines;
        });
    }

    function handleMedicineFavorite(medicine) {
        console.log(medicine);
        const updatedMedicineForServer = {
            _id: medicine._id,
            enabled: !medicine.enabled,
        };

        setMedicines((currentMedicines) => {
            const updatedMedicines = currentMedicines.map((med) => {
                if (med._id === medicine._id) {
                    return { ...med, enabled: !med.enabled };
                }
                return med;
            });

            axios
                .post(
                    'http://localhost:3000/api/updateMedicine',
                    updatedMedicineForServer
                )
                .then((response) => {
                    console.log('Data updated successfully:', response.data);
                })
                .catch((error) => {
                    console.error('Error updating data:', error);
                });

            return updatedMedicines;
        });
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
                            activeShop={activeShop}
                            onSortByPrice={handleSortByPrice}
                        />
                        <Medicines
                            medicines={medicines}
                            onAddToCart={handleAddToCart}
                            onMedicideFavorite={handleMedicineFavorite}
                        />
                    </Main>
                </>
            )}
        </div>
    );
}
