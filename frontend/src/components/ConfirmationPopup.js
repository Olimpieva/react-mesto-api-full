
import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup(props) {

    const { data, onClose, onSubmit } = props;

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(data);
    }

    return (
        <PopupWithForm name="confirmation"
            title="Вы уверены?"
            buttonText="Да"
            isOpen={data}
            onClose={onClose}
            onSubmit={handleSubmit}>
        </PopupWithForm>
    )
}

export default ConfirmationPopup;