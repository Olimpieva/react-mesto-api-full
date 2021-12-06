
import React, { useRef } from "react";

function PopupWithForm(props) {

    const { name, title, buttonText, isOpen, onClose, onSubmit } = props;
    const overlayRef = useRef(null);

    function onOverlayClick(event) {
        if (event.target === overlayRef.current) {
            onClose()
        }
    }

    return (
        <div className={`popup popup-${name} ${isOpen && 'popup_is-opened'}`} ref={overlayRef} onClick={onOverlayClick}>
            <div className="popup__container">
                <form className={`popup__form popup__form-${name}`} name={`popup-${name}`} onSubmit={onSubmit}>
                    <h2 className="popup__title">{title}</h2>
                    {props.children}
                    <button className="popup__button popup__button_action_save" type="submit">{buttonText}</button>
                </form>
                <button className="popup__button popup__button_action_close"
                    type="button"
                    aria-label="Закрыть окно"
                    onClick={onClose}></button>
            </div>
        </div>
    )
}

export default PopupWithForm;