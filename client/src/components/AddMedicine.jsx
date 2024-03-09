import { useState } from 'react';
import axios from 'axios';

export default function AddMedicine({ onStatusReset, activeShop }) {
    const [medName, setMedName] = useState('');
    const [price, setPrice] = useState(0);

    function handleSubmit(event) {
        event.preventDefault();
        const newMedicine = {
            shopId: activeShop._id,
            title: medName,
            price,
            enable: true,
            img: '',
        };
        console.log(newMedicine);

        // Отправляем данные нового лекарства на сервер
        axios
            .post('http://localhost:3000/api/medicines', newMedicine)
            .then((response) => {
                console.log('Medicine added successfully:', response.data);

                // setMedName('');
                // setPrice(0);
            })
            .catch((error) => {
                console.error('Error adding medicine:', error);
                // Здесь можно добавить обработку ошибки, если это необходимо
            });
    }

    return (
        <div className="addMedicine">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={medName}
                    onChange={(e) => setMedName(e.target.value)}
                ></input>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                ></input>
                <button type="submit">Add</button>
                <button onClick={() => onStatusReset()}>Cancel</button>
            </form>
        </div>
    );
}
