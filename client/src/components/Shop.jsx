export default function Shop({
    shop,
    onChangeShop,
    onNeedAddMedicine,
    activeShop,
}) {
    return (
        <div
            className={`shop ${activeShop._id === shop._id ? 'active' : ''}`}
            onClick={() => onChangeShop(shop)}
            onDoubleClick={() => onNeedAddMedicine()}
        >
            {shop.title}
        </div>
    );
}
