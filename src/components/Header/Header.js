import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, NavLink, Route} from 'react-router-dom';
import logo from '../../images/logo.svg';
import menuLogo from '../../images/burger.svg';
import './Header.css';
import '../../vendor/hover.css';

function Header({ loggedIn }) {
  const [activeBurger, setActiveBurger] = useState(false);
  const location = useLocation();

  function handleActiveBurger() {
    setActiveBurger(!activeBurger);
  }

  useEffect(() => {
    setActiveBurger(false);
  }, [location.pathname]);

  return (
    <header className="header">
      <Route exact path="/">
        {!loggedIn && (
          <>
            <Link to="/">
              <img className="header__logo" src={logo} alt="логотип" />
            </Link>
            <ul className="header__links">
              <li className="header__link-item">
                <Link to="/signup" className="header__link hover">
                  Регистрация
                </Link>
              </li>
              <li className="header__link-item header__link-item_login">
                <Link to="/signin" className="header__link header__link_dark hover">
                  Войти
                </Link>
              </li>
            </ul>
          </>
        )}
      </Route>

      <Route path={['/movies', '/saved-movies', '/profile', '/']}>
        {loggedIn && (
          <>
            <Link to="/">
              <img className="header__logo" src={logo} alt="логотип" />
            </Link>
            <nav className="header__links-movies">
              <NavLink exact to="/movies" className="header__link header__link_auth hover" activeClassName="header__link_active">
                Фильмы
              </NavLink>

              <NavLink exact to="/saved-movies" className="header__link header__link_auth hover" activeClassName="header__link_active">
                Сохраненные фильмы
              </NavLink>
            </nav>

            <Link to="/profile" className="profile-button-wraper">
              <button className="profile-button hover">Аккаунт</button>
            </Link>

            <img className="header__menu-icon hover" src={menuLogo} alt="Иконка меню" onClick={handleActiveBurger}/>
          </>
        )}

        {activeBurger && (
          <section className="burger-menu-section">
            <div className="burger-menu">
              <button
                onClick={handleActiveBurger}
                type="button"
                className="burger-menu__button-close"
              ></button>
              <nav className="burger-menu__container">
                <ul className="burger-menu__list">
                  <li className="burger-menu__list-item">
                    <NavLink exact to="/" className="burger-menu__link hover" activeClassName="burger-menu__link-active">
                      Главная
                    </NavLink>
                  </li>

                  <li className="burger-menu__list-item">
                    <NavLink exact to="/movies" className="burger-menu__link hover" activeClassName="burger-menu__link-active">
                      Фильмы
                    </NavLink>
                  </li>

                  <li className="burger-menu__list-item">
                    <NavLink exact to="/saved-movies" className="burger-menu__link hover" activeClassName="burger-menu__link-active">
                      Сохранённые фильмы
                    </NavLink>
                  </li>
                </ul>
              </nav>
              <Link className="profile-button-wraper-burger" to="/profile">
                <button className="profile-button hover" onClick={handleActiveBurger}>
                  Аккаунт
                </button>
              </Link>
            </div>
          </section>
        )}
      </Route>
    </header>
  );
}

export default Header;