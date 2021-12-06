
import React from "react";

import Auth from "./Auth";

function Login({ onLogin }) {

    return (
        <Auth name="login" title="Вход" buttonText="Войти" onSubmit={onLogin} />
    );
};

export default Login;