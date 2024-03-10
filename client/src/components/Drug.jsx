export default function Drug({ medicine, onAddToCart, onMedicideFavorite }) {
    return (
        <div className="drug">
            <img src={medicine.img} alt={medicine.title} />
            <h4 className="medicineName">{medicine.title}</h4>

            <div className="medicinePrice">
                <p>
                    Price: <span>{medicine.price} $</span>
                </p>
                {/* <p>{medicine.enabled ? 💝 : ''}</p> */}
                <p
                    className="drug_favorite"
                    onClick={() => onMedicideFavorite(medicine)}
                >
                    {medicine.enabled ? '💝' : '♡'}
                </p>
                <button onClick={() => onAddToCart(medicine)}>
                    add to Cart
                </button>
            </div>
        </div>
    );
}
