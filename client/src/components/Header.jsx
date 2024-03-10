export default function Header({ onShoppingCart, onShop, cart }) {
    console.log('cart')
    console.log(cart)
    return (
        <div className="header">
            <p className="shoping" onClick={onShop}>
                Shop
            </p>
            <p className="shoppingCart" onClick={onShoppingCart}>
                Shopping Cart {cart.length ? `(${cart.length})` : ''}
            </p>
        </div>
    )
}
