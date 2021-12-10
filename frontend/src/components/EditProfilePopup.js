
import React, { useContext, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../context/CurrentUserContext';
import FormError from "./FormError";

function EditProfilePopup(props) {

    const { isOpen, onClose, onUpdateUser, formValidate, validationData: { isFormValid, errors } } = props;
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const inputList = ['name', 'description'];

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    const handleInputChange = (event) => {
        event.target.name === 'name' ? setName(event.target.value) : setDescription(event.target.value);
        formValidate(event.target, inputList);
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
            onSubmit={handleSubmit}
            isButtonEnabled={isFormValid}
        >
            <fieldset className="popup__input-fieldset">
                <input className="popup__input popup__input_type_name" id="profile-name" name="name"
                    type="text"
                    minLength="2"
                    maxLength="40"
                    placeholder="Введите имя"
                    value={name || ''}
                    onChange={handleInputChange}
                    required
                />
                <FormError
                    isHidden={isFormValid}
                    name="profile-name"
                    message={errors['profile-name']}
                />
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
                <FormError
                    isHidden={isFormValid}
                    name="profile-caption"
                    message={errors['profile-caption']}
                />
            </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup;