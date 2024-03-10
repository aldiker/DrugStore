import Shop from './Shop'

export default function Shops({
    shops,
    onChangeShop,
    onNeedAddMedicine,
    activeShop,
    onSortByPrice,
    onSortByFavorite,
}) {
    return (
        <div className="shopsPanel">
            <div>
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
            <div className="sortButtons">
                <button onClick={onSortByFavorite}>sort by favorite</button>
                <button onClick={onSortByPrice}>sort by price</button>
            </div>
        </div>
    )
}
