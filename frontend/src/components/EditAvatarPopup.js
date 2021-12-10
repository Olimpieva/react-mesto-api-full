
import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import FormError from "./FormError";

function EditAvatarPopup(props) {

    const { isOpen, onClose, onUpdateAvatar, formValidate, validationData: { isFormValid, errors } } = props;
    const [link, setLink] = useState();
    const inputList = [link];

    const handleInputChange = (event) => {
        setLink(event.target.value);
        formValidate(event.target, inputList);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateAvatar({
            avatar: link,
        })
    }

    const handleOnClose = () => {
        onClose();
        setLink('');
    }

    return (
        <PopupWithForm name="avatar"
            title="Обновить аватар"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={handleOnClose}
            onSubmit={handleSubmit}
            isButtonEnabled={isFormValid}
        >
            <fieldset className="popup__input-fieldset">
                <input className="popup__input popup__input_type_link" id="avatar-link" name="avatar"
                    type="url"
                    placeholder="Ссылка на картинку"
                    value={link || ''}
                    onChange={handleInputChange}
                    required
                />
                <FormError
                    isHidden={isFormValid}
                    name="avatar-link"
                    message={errors['avatar-link']}
                />
            </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;