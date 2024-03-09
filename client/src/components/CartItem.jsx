export default function CartItem({ item, onCartItemCountSet }) {
    return (
        <div className="cartItem">
            <img src={item.img} />
            <div className="cartItemInfo">
                <h3>{item.title}</h3>
                <p>Price: {item.price}</p>
                <input
                    type="number"
                    value={item.count}
                    onChange={(e) => {
                        onCartItemCountSet(item, e.target.value);
                    }}
                />
            </div>
        </div>
    );
}
