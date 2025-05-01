import {FC, useContext, useState} from "react";
import {Button, Image} from "react-bootstrap";

import {GlobalContext} from "../../contexts/shared/GlobalContext.tsx";
import {FaEdit, FaTrash} from "react-icons/fa";

const Footer: FC = () => {
    const globalContext = useContext(GlobalContext)!;

    const {isAdmin, OnShowModal} = globalContext;

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className='footer-container'>
            {groupSocials.map((social, index) => (
                <div
                    key={index}
                    className='footer-container__item'
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <a href={social.url} target="_blank" rel="noopener noreferrer" className='footer-container__link'>
                        <Image src={social.photo} className='footer-container__link-photo'/>
                    </a>

                    {isAdmin && hoveredIndex === index && (
                        <div className='group-socials-admin-buttons-container'>
                            <Button
                                className="group-socials-admin-buttons-container__edit"
                            >
                                <FaEdit/>
                            </Button>
                            <Button
                                className="group-socials-admin-buttons-container__delete"
                            >
                                <FaTrash/>
                            </Button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export {Footer};