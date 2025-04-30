import {FC, useContext} from "react";
import {Image} from "react-bootstrap";

import groupSocials from '../../../group-socials.json';
import {GlobalContext} from "../../contexts/shared/GlobalContext.tsx";

const Footer: FC = () => {
    const globalContext = useContext(GlobalContext)!;

    const {isAdmin, OnShowModal} = globalContext;
    //TODO

    return (
        <div className='footer-container'>
            {groupSocials.map((social, index) => (
                <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className='footer-container__link'>
                    <Image src={social.photo} className='footer-container__link-photo' />
                </a>
            ))}
        </div>
    );
};

export {Footer};