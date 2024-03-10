export default function Header({ onShoppingCart, onShop, onSortByPrice }) {
    return (
        <div className="header">
            <p className="shoping" onClick={onShop}>
                Shop
            </p>
            <p className="shoppingCart" onClick={onShoppingCart}>
                Shopping Cart
            </p>
            <button onClick={onSortByPrice}>sort by price</button>
        </div>
    );
}
