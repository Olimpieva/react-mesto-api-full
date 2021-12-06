
import React from "react";
import { Link } from "react-router-dom";

import Auth from "./Auth";

function Register({ onRegister }) {

    return (
        <Auth name="register" title="Регистрация" buttonText="Зарегистрироваться" onSubmit={onRegister}>
            <span className="auth__link">Уже зарегистрированы?
                <Link className="auth__link" to="/sign-in"> Войти</Link>
            </span>
        </Auth>
    );
};

export default Register;