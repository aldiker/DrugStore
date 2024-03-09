import { useState } from 'react';
import CartItem from './CartItem';

export default function Cart({ cart, onCartItemCountSet }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const total = cart.reduce((acc, item) => item.count * item.price + acc, 0);

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
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="cartItems">
                    {cart.map((item) => (
                        <CartItem
                            item={item}
                            key={item._id}
                            onCartItemCountSet={onCartItemCountSet}
                        />
                    ))}
                </div>
            </div>
            <div className="cartSummary">
                <p>Total price: {total}</p>
                <button>Submit</button>
            </div>
        </div>
    );
}
