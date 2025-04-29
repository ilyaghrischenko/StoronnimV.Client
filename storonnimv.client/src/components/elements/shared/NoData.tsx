import {FC} from "react";

import NoDataImage from '../../../assets/no-data.svg?react';

interface INoDataProps {
    className?: string;
    message?: string;
}

const NoData: FC<INoDataProps> = ({className, message = "Даних немає"}) => {
    return (
        <div className={`${className} empty-data-container`}>
            <NoDataImage className='empty-data-container__image' />
            <h1 className='empty-data-container__text main-text big-shadow'>{message}</h1>
        </div>
    );
};

export {NoData};