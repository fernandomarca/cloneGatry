import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import './search.css';
import PromotionList from 'pages/Promotion/List/List';

const PromotionSearch = () => {

    const [promotions, setPromotions] = useState([]);

    const [search, setSearch] = useState([]);

    useEffect(() => {
        const params = {};

        if (search) {
            params.title_like = search;
        }

        Axios.get('http://localhost:3333/promotions?_embed=comments', { params })
            .then((res) => {
                setPromotions(res.data);
            });
    }, [search]);

    return (
        <div className="promotion-search">
            <header className="promotion-search__header">
                <h1>Promo Show</h1>
                <Link to="/create">Nova Promoção</Link>
            </header>
            <input
                type="search"
                className="promotion-search__input"
                placeholder="buscar"
                value={search}
                onChange={(ev) => setSearch(ev.target.value)}
            />

            <PromotionList promotions={promotions} loading={!promotions.length} />
        </div>
    )

}

export default PromotionSearch;