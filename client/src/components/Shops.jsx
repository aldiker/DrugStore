import Shop from './Shop';

export default function Shops({ shops, onChangeShop, onNeedAddMedicine }) {
    return (
        <div className="shops">
            {shops.map((shop) => (
                <Shop
                    shop={shop}
                    key={shop._id}
                    onChangeShop={onChangeShop}
                    onNeedAddMedicine={onNeedAddMedicine}
                />
            ))}
        </div>
    );
}
