
import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

    const { isOpen, onClose, onUpdateAvatar } = props;
    const [link, setLink] = useState();

    const handleInputChange = (event) => {
        setLink(event.target.value);
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
            onSubmit={handleSubmit}>
            <fieldset className="popup__input-fieldset">
                <input className="popup__input popup__input_type_link" id="avatar-link" name="avatar"
                    type="url"
                    placeholder="Ссылка на картинку"
                    value={link || ''}
                    onChange={handleInputChange}
                    required />
                <span className="popup__input-error"
                    id="avatar-link-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;