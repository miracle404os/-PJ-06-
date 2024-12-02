import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { checkAuth, logout } from "../authorization/slice/authSlice";

import logoImg from '../main/img/logo.svg';
import logoFooter from '../main/img/logoFooter.svg';
import InfoEvent from "../info/infoUserEvent";
import avatarImg from '../info/img/avatar.svg';
import docImg from './img/docImg.svg';
import folderImg from './img/folderImg.svg';
import formImg from './img/formImg.svg';

import CheckBox from "./CheckBox/CheckBox";
import Document from "./DocumentCount/Document";
import Date from "./Date/Date";
import InnCompany from "./InnCompany/InnCompany";
import Tonality from "./Tonality/Tonality";


const Search = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validInn = useSelector((state) => state.inn.value);
    const validDoc = useSelector((state) => state.document.value);
    const validDateStart = useSelector((state) => state.date.startDate);
    const validDateEnd = useSelector((state) => state.date.endDate);

    useEffect(() => {
        const checkUserAuth = async () => {
            const result = await dispatch(checkAuth());

            if (!result.payload) {
                navigate('/');
            }
        };
        
        checkUserAuth();
    }, [dispatch, navigate]);
    
    const toggleMenu = () => {
        const menu = document.getElementById('menuMobile');
        if (menu.style.display === 'none' || menu.style.display === '') {
            menu.style.display = 'block';
            menu.style.zIndex = '1';
        } else {
            menu.style.display = 'none';
        }
    }

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenExpire');
    }

    const isFormValid = () => {
        return validInn.trim() !== '' && validDoc.trim() !== '' && validDateStart.trim() !== '' && validDateEnd.trim() !== '';
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isFormValid) {
            navigate('/search-result');
        } else {
            alert('Форма не валидна, перенаправление не выполнено!');
        }
    };

    return (
        <>
            <header>
                <nav className="header-main-container">
                    <nav className="logo-main-container">
                        <img src={logoImg} alt="logo" />
                    </nav>

                    <ul>
                        <li>Главная</li>
                        <li>Тарифы</li>
                        <li>FAQ</li>
                    </ul>

                    {isLoggedIn ? (
                        <InfoEvent />
                    ) : (
                        <nav className="login-container">
                            <span className="color-grey">Зарегистрироваться</span>
                            <nav className="separator"></nav>
                            <button className="login-button"><Link to='/auth'>Войти</Link></button>
                        </nav>
                    )}

                    <nav className="sidenav">
                        <span className="sidenav-line" onClick={toggleMenu}>&#9776;</span>
                        <nav className="menu-content" id="menuMobile">
                            <nav className="header-menu">
                                <img src={logoFooter} alt="logoFooter" />
                                <span className="sidenav-close" onClick={toggleMenu}>&#10005;</span>
                            </nav>

                            <nav className="main-menu">
                                <a href="/">Главная</a>
                                <a href="/">Тарифы</a>
                                <a href="/">FAQ</a>
                            </nav>

                            {isLoggedIn ? (
                                <nav className="footer-menu" style={{ gap: '0' }}>
                                    <img src={avatarImg} alt="avatar" className="event-mobile-img" />
                                    <p>Алексей А.</p>
                                    <button className="footer-menu-button" onClick={handleLogout}>Выйти</button>
                                </nav>
                            ) : (
                                <nav className="footer-menu">
                                    <span className="color-mobile-menu">Зарегистрироваться</span>
                                    <button className="footer-menu-button"><Link to='/auth'>Войти</Link></button>
                                </nav>
                            )}
                        </nav>
                    </nav>
                </nav>
            </header>

            <main>
                <div className="search-page">
                    <div className="left-side">
                        <h1>Найдите необходимые<br />данные в пару кликов.
                            <img src={docImg} alt="document" className="document-mobile" />
                        </h1>
                        <p>Задайте параметры поиска.<br />Чем больше заполните, тем точнее поиск</p>
                        <form onSubmit={handleSubmit} className="form-search-container">
                            <div className="form-left-side">
                                <InnCompany />
                                <Tonality />
                                <Document />
                                <Date />
                                <button className="form-button-right-side-mobile" type="submit" disabled={!isFormValid()}>Поиск</button>
                                <span className="span-form-under-button-mobile">* Обязательные к заполнению поля</span>
                            </div>

                            <div className="form-right-side">
                                <CheckBox />
                                <button className="form-button-right-side" type="submit" disabled={!isFormValid()}>Поиск</button>
                                <br/>
                                <span className="span-form-under-button">* Обязательные к заполнению поля</span>
                            </div>
                        </form>
                    </div>

                    <div className="right-side">
                        <div className="img-search-container">
                            <img src={docImg} alt="document" className="document" />
                            <img src={folderImg} alt="folder" className="folder" />
                        </div>
                        <img src={formImg} alt="form" className="form-img" />
                    </div>
                </div>
            </main>

            <footer>
                <nav className="footer-main-container">
                    <nav className="footer-main-container">
                        <img src={logoFooter} alt="logoFooter" />
                    </nav>

                    <nav className="footer-right-container">
                        <p>г. Москва, Цветочный б-р, 40<br/>+7 495 771 21 11<br/>info@skan.ru<br/><br/>Copyright. 2022</p>
                    </nav>
                </nav>
            </footer>
        </>
    );
};

export default Search;