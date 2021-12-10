
import React, { useState } from "react";
import FormError from "./FormError";
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup(props) {

    const { isOpen, onClose, onAddPlace, formValidate, validationData: { isFormValid, errors } } = props;

    console.log({ isFormValid, errors })

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    const inputList = ['card-name', 'card-link'];

    const handleInputChange = (event) => {
        event.target.name === 'name' ?
            setName(event.target.value)
            :
            setLink(event.target.value);

        formValidate(event.target, inputList);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddPlace({
            name,
            link,
        });
        setName('');
        setLink('');
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
            onSubmit={handleSubmit}
            isButtonEnabled={isFormValid}
        >
            <fieldset className="popup__input-fieldset">
                <input className="popup__input popup__input_type_caption" id="card-name" name="name"
                    type="text"
                    minLength="2"
                    maxLength="30"
                    placeholder="Название"
                    value={name || ''}
                    onChange={handleInputChange}
                    required />
                <FormError isHidden={isFormValid} name="card-name" message={errors['card-name']} />
            </fieldset>
            <fieldset className="popup__input-fieldset">
                <input className="popup__input popup__input_type_link" id="card-link" name="link"
                    type="url"
                    placeholder="Ссылка на картинку"
                    value={link || ''}
                    onChange={handleInputChange}
                    required />
                <FormError isHidden={isFormValid} name="card-link" message={errors['card-link']} />
            </fieldset>
        </PopupWithForm>
    )
}

export default AddPlacePopup;