import Drug from './Drug';

export default function Medicines({ medicines, onAddToCart }) {
    return (
        <div className="medicines">
            {medicines.length > 0 ? (
                medicines.map((medicine) => (
                    <Drug
                        medicine={medicine}
                        key={medicine._id}
                        onAddToCart={onAddToCart}
                    />
                ))
            ) : (
                <h4>Choose the Shop ...</h4>
            )}
        </div>
    );
}
