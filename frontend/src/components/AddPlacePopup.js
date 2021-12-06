
import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const { isOpen, onClose, onAddPlace } = props;

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    const handleInputChange = (event) => {
        event.target.name === 'name' ? setName(event.target.value) : setLink(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddPlace({
            name,
            link,
        })
    }

    const handleOnClose = () => {
        onClose();
        setName('');
        setLink('');
    }

    return (
        <PopupWithForm name="card" title="Новое место" buttonText="Создать"
            isOpen={isOpen}
            onClose={handleOnClose}
            onSubmit={handleSubmit}>
            <fieldset className="popup__input-fieldset">
                <input className="popup__input popup__input_type_caption" id="card-name" name="name"
                    type="text"
                    minLength="2"
                    maxLength="30"
                    placeholder="Название"
                    value={name || ''}
                    onChange={handleInputChange}
                    required />
                <span className="popup__input-error" id="card-name-error"></span>
            </fieldset>
            <fieldset className="popup__input-fieldset">
                <input className="popup__input popup__input_type_link" id="card-link" name="link"
                    type="url"
                    placeholder="Ссылка на картинку"
                    value={link || ''}
                    onChange={handleInputChange}
                    required />
                <span className="popup__input-error" id="card-link-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default AddPlacePopup;