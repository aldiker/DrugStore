export default function Drug({
    medicine,
    onAddToCart,
    onMedicideFavorite,
    cart,
}) {
    const index = cart.findIndex((item) => item._id === medicine._id)
    const isInCart = index !== -1

    return (
        <div className="drug">
            <img src={medicine.img} alt={medicine.title} />
            <h4 className="medicineName">{medicine.title}</h4>

            <div className="medicinePrice">
                <p>
                    Price: <span>{medicine.price} $</span>
                </p>
                <p
                    className="drug_favorite"
                    onClick={() => onMedicideFavorite(medicine)}
                >
                    {medicine?.enabled ? '💝' : '♡'}
                </p>
                <button
                    onClick={() => onAddToCart(medicine)}
                    className={isInCart ? 'inCart' : ''}
                >
                    add to Cart
                </button>
            </div>
        </div>
    )
}
