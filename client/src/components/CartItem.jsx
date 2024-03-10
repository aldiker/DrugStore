export default function CartItem({
    item,
    onCartItemCountSet,
    onRemoveIntoCart,
}) {
    return (
        <div className="cartItem">
            <img src={item.img} />
            <div className="cartItemInfo">
                <h3>{item.title}</h3>
                <p>Price: {item.price}</p>
                <div className="cartItemInfo_count">
                    <input
                        type="number"
                        value={item.count}
                        onChange={(e) => {
                            onCartItemCountSet(item, e.target.value);
                        }}
                    />
                    <button onClick={() => onRemoveIntoCart(item)}>
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}
