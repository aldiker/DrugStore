export default function Drug({ medicine, onAddToCart }) {
    return (
        <div className="drug">
            <img src={medicine.img} alt={medicine.title} />
            <h4 className="medicineName">{medicine.title}</h4>

            <div className="medicinePrice">
                <p>
                    Price: <span>{medicine.price} $</span>
                </p>
                <button onClick={() => onAddToCart(medicine)}>
                    add to Cart
                </button>
            </div>
        </div>
    );
}
