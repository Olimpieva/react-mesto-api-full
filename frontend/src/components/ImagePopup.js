
import React, { useRef } from "react";

function ImagePopup({ card, onClose }) {

    const overlayRef = useRef(null);

    function onOverlayClick(event) {
        if (event.target === overlayRef.current) {
            onClose()
        }
    }

    return (
        <div className={`popup popup-image ${card.link && 'popup_is-opened'}`} ref={overlayRef} onClick={onOverlayClick}>
            <div className="popup-image__container">
                <button className="popup__button popup__button_action_close" type="button" onClick={onClose}></button>
                <img className="popup-image__image" src={card.link} alt={card.name} />
                <h2 className="popup-image__title">{card.name}</h2>
            </div>
        </div>
    )

}

export default ImagePopup;