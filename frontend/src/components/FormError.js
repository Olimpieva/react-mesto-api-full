import React from "react";

function FormError(props) {
    const { isHidden, name, message } = props;

    console.log({ isHidden })

    return (
        <span
            className={`popup__input-error ${!isHidden && 'popup__input-error_active'}`}
            id={`${name}-error`}
        >
            {message}
        </span>
    )

}

export default FormError;