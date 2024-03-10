import Drug from './Drug'

export default function Medicines({
    medicines,
    onAddToCart,
    onMedicideFavorite,
    cart,
}) {
    return (
        <div className="medicines">
            {medicines.length > 0 ? (
                medicines.map((medicine) => (
                    <Drug
                        medicine={medicine}
                        key={medicine._id}
                        onAddToCart={onAddToCart}
                        onMedicideFavorite={onMedicideFavorite}
                        cart={cart}
                    />
                ))
            ) : (
                <h4 style={{ textAlign: 'center' }}>Choose the Shop ...</h4>
            )}
        </div>
    )
}
