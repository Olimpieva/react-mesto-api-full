
import React, { useRef } from "react";
import { ReactComponent as Success } from '../images/icons/success.svg';
import { ReactComponent as Fail } from '../images/icons/fail.svg';

function InfoTooltip(props) {
    const { isOpen, onClose, status } = props;
    const overlayRef = useRef(null);

    function onOverlayClick(event) {
        if (event.target === overlayRef.current) {
            onClose()
        };
    };

    return (
        <div className={`popup popup-info ${isOpen && 'popup_is-opened'}`} ref={overlayRef} onClick={onOverlayClick}>
            <div className="popup-info__container">
                <button className="popup__button popup__button_action_close" type="button" onClick={onClose}></button>
                {status ?
                    (<>
                        <Success className="popup-info__image" />
                        <p className="popup-info__text">Вы успешно зарегистрировались!</p>
                    </>) :
                    (<>
                        <Fail className="popup-info__image" />
                        <p className="popup-info__text">Что-то пошло не так! Попробуйте ещё раз.</p>
                    </>)
                }
            </div>
        </div>
    );
};

export default InfoTooltip;