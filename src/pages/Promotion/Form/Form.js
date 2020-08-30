import React from 'react';
import { useParams } from 'react-router-dom';
import PromotionForm from 'components/Promotion/Form/Form';
import UIContainer from 'components/UI/Container';

const PagesPromotionForm = () => {

    const { id } = useParams();

    return (
        <div>
            <UIContainer>
                <PromotionForm />
            </UIContainer>
        </div>
    )
}

export default PagesPromotionForm;