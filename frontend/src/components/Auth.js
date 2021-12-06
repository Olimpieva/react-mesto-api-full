
import React, { useState } from "react";

function Auth(props) {
    const { name, title, buttonText, onSubmit } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleInputChange = (event) => {
        event.target.name === 'email' ? setEmail(event.target.value) : setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({
            email,
            password
        });
    }

    return (
        <section className={`auth content__auth auth-${name}`}>
            <form className={`auth__form auth__form-${name}`} name={`auth-${name}`} onSubmit={handleSubmit}>
                <h2 className="auth__title">{title}</h2>
                <input className="auth__input auth__input_type_email" id={`${name}-email`} name="email"
                    type="email"
                    minLength="3"
                    value={email}
                    onChange={handleInputChange}
                    required
                />
                <input className="auth__input auth__input_type_password" id={`${name}-password`} name="password"
                    type="password"
                    minLength="8"
                    value={password}
                    onChange={handleInputChange}
                    required
                />
                <button className="auth__button auth__button_action_save" type="submit">{buttonText}</button>
            </form>
            {props.children}
        </section>
    )
};

export default Auth;