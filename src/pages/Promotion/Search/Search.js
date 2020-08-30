import React, { useEffect, useState } from 'react';
import PromotionCard from 'components/Promotion/Card/Card';
import Axios from 'axios';

const PagesPromotionSearch = () => {

    const [promotions, setPromotions] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3333/promotions?_embed=comments')
            .then((res) => {
                setPromotions(res.data);
            });
    }, []);

    return (
        <div>
            {promotions.map((promotion) => {
                return (
                    <PromotionCard key={promotion.id} promotion={promotion} />
                )
            })}
        </div>
    )
}

export default PagesPromotionSearch;