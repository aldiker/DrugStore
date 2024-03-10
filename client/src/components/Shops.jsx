import Shop from './Shop';

export default function Shops({
    shops,
    onChangeShop,
    onNeedAddMedicine,
    activeShop,
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
        </div>
    );
}
