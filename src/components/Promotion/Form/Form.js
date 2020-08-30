import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

import './form.css';

const initialValue = {
    title: '',
    url: '',
    imageUrl: '',
    price: 0
}

const PromotionForm = () => {

    const [values, setValues] = useState(initialValue);

    const history = useHistory();

    function onChange(ev) {
        const { name, value } = ev.target;

        setValues({ ...values, [name]: value });
    }

    function onSubmit(ev) {
        ev.preventDefault();

        Axios.post('http://localhost:3333/promotions', values)
            .then((response) => {
                history.push('/');
            });
    }

    return (
        <dir>
            <h1>Promo Show</h1>
            <h2>Nova Promoção</h2>

            <form onSubmit={onSubmit}>
                <div className="promotion-form__group">
                    <label htmlFor="title">Título</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        onChange={onChange}
                    />
                </div>
                <div className="promotion-form__group">
                    <label htmlFor="url">Link</label>
                    <input
                        id="url"
                        name="url"
                        type="text"
                        onChange={onChange}
                    />
                </div>
                <div className="promotion-form__group">
                    <label htmlFor="imageUrl">Imagem (URL)</label>
                    <input
                        id="imageUrl"
                        name="imageUrl"
                        type="text"
                        onChange={onChange}
                    />
                </div>
                <div className="promotion-form__group">
                    <label htmlFor="price">Preço</label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        onChange={onChange}
                    />
                </div>
                <div>
                    <button type="submit">
                        Salvar
                    </button>
                </div>
            </form>
        </dir>
    )
}

export default PromotionForm;