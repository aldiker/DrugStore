export default function Header({ onShoppingCart, onShop }) {
    return (
        <div className="header">
            <p className="shoping" onClick={onShop}>
                Shop
            </p>
            <p className="shoppingCart" onClick={onShoppingCart}>
                Shopping Cart
            </p>
        </div>
    );
}
