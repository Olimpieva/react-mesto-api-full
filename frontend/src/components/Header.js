
import { Link } from "react-router-dom";

import logo from '../images/logo.svg';


function Header({ location, email, onLogout }) {
    const headerData = location === '/sign-in' ?
        {
            link: "/sign-up",
            title: "Регистрация",
        } :
        {
            link: "/sign-in",
            title: "Вход"
        }
    return (
        <header className="header">
            <img src={logo} alt="Логотип" className="header__logo" />
            {location === '/' ? (
                <div className="header__container">
                    <span className="header__title">{email}</span>
                    <Link className="header__link" to={"/sign-in"} onClick={onLogout}>Выйти</Link>
                </div>
            ) : (
                <Link className="header__link" to={headerData.link}>{headerData.title}</Link>
            )}

        </header>

    );
}

export default Header;