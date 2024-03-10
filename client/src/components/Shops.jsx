import Shop from './Shop';

export default function Shops({
    shops,
    onChangeShop,
    onNeedAddMedicine,
    activeShop,
    onSortByPrice,
}) {
    return (
        <div className="shops">
            {shops.map((shop) => (
                <Shop
                    shop={shop}
                    key={shop._id}
                    onChangeShop={onChangeShop}
                    onNeedAddMedicine={onNeedAddMedicine}
                    activeShop={activeShop}
                />
            ))}
            <button onClick={onSortByPrice}>sort by price</button>
        </div>
    );
}
