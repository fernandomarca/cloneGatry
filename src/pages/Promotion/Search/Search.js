import React from 'react';
import PromotionCard from 'components/Promotion/Card/Card';

const promotion = {
    "id": 1,
    "title": "Kit Notebook Acer Aspire 3 + Mochila Green",
    "price": 1799,
    "imageUrl": "https://cdn.gatry.com/gatry-static/promocao/imagem/d21fef6610967f1c2a3a08a518ef9ef4.png",
    "url": "https://amzn.to/2EtsikM",
    "comments": [
        {
            "id": 1,
            "coment": "Tela HD"
        }
    ]
};

const PagesPromotionSearch = () => {
    return (
        <PromotionCard promotion={promotion} />
    )
}

export default PagesPromotionSearch;