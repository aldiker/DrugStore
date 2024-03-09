import Drug from './Drug';

export default function Medicines({ medicines, onAddToCart }) {
    return (
        <div className="medicines">
            {medicines.map((medicine) => (
                <Drug
                    medicine={medicine}
                    key={medicine._id}
                    onAddToCart={onAddToCart}
                />
            ))}
        </div>
    );
}
