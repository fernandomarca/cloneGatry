import React, { useState, useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';

import './search.css';
import PromotionList from 'pages/Promotion/List/List';
import useApi from 'components/utils/useApi';

const PromotionSearch = () => {

    const mountRef = useRef(null);

    const [search, setSearch] = useState([]);

    const [load, loadInfo] = useApi({
        deBounceDelay: 300,
        url: '/promotions',
        method: 'get',
        params: {
            _embed: 'comments',
            _order: 'desc',
            _sort: 'id',
            title_like: search || undefined
        }
    });

    useEffect(() => {

        load({
            debounced: mountRef.current
        });

        if (!mountRef.current) {
            mountRef.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

            <PromotionList
                promotions={loadInfo.data}
                loading={loadInfo.loading}
                error={loadInfo.error}
            />
        </div>
    )

}

export default PromotionSearch;