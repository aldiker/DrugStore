import { useState } from 'react';
import CartItem from './CartItem';
import axios from 'axios';

export default function Cart({ cart, onCartItemCountSet, onRemoveIntoCart }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const total = cart.reduce((acc, item) => item.count * item.price + acc, 0);

    function handleSubmit() {
        const formData = {
            name,
            email,
            phone,
            address,
            cart,
            total,
        };

        if (name && email && phone && address && total) {
            axios
                .post('http://localhost:3000/api/cart', formData)
                .then((response) => {
                    console.log('Data submitted successfully:', response.data);
                })
                .catch((error) => {
                    console.error('Error submitting data:', error);
                });
        } else {
            console.log('Not enough information to save this cart ...');
        }
    }

    return (
        <div className="mainCart">
            <div className="cart">
                <div className="cartForm">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="enter your name ..."
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="enter your e-mail ..."
                    />
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="enter your phone ..."
                    />
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="enter your address ..."
                    />
                </div>
                <div className="cartItems">
                    {cart.map((item) => (
                        <CartItem
                            item={item}
                            key={item._id}
                            onCartItemCountSet={onCartItemCountSet}
                            onRemoveIntoCart={onRemoveIntoCart}
                        />
                    ))}
                </div>
            </div>
            <div className="cartSummary">
                <p>Total price: {total}</p>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}
