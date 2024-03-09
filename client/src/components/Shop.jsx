export default function Shop({ shop, onChangeShop, onNeedAddMedicine }) {
    return (
        <div
            className="shop"
            onClick={() => onChangeShop(shop)}
            onDoubleClick={() => onNeedAddMedicine()}
        >
            {shop.title}
        </div>
    );
}
