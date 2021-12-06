
import React, { useContext, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../context/CurrentUserContext';

function EditProfilePopup(props) {

    const { isOpen, onClose, onUpdateUser } = props;
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    const handleInputChange = (event) => {
        event.target.name === 'name' ? setName(event.target.value) : setDescription(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateUser({
            name,
            about: description,
        })
    }

    return (
        <PopupWithForm name="profile"
            title="Редактировать профиль"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit} >
            <fieldset className="popup__input-fieldset">
                <input className="popup__input popup__input_type_name" id="profile-name" name="name"
                    type="text"
                    minLength="2"
                    maxLength="40"
                    placeholder="Введите имя"
                    value={name || ''}
                    onChange={handleInputChange}
                    required />
                <span className="popup__input-error" id="profile-name-error"></span>
            </fieldset>
            <fieldset className="popup__input-fieldset">
                <input className="popup__input popup__input_type_caption" id="profile-caption" name="description"
                    type="text"
                    minLength="2"
                    maxLength="200"
                    placeholder="Введите описание"
                    value={description || ''}
                    onChange={handleInputChange}
                    required />
                <span className="popup__input-error" id="profile-caption-error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup;