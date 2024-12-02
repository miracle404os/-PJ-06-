import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth, logout } from "../authorization/slice/authSlice";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

import logoImg from '../main/img/logo.svg';
import logoFooter from '../main/img/logoFooter.svg';
import InfoEvent from "../info/infoUserEvent";
import avatarImg from '../info/img/avatar.svg';
import reslutMainImg from './img/resultMainImg.svg';

import PublicationCards from "./PublicationCards/PublicationCards";
import GeneralSummary from "./general_summary_result/generalSummary";

const SearchResult = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                <div className="main-search-result-container">
                    <div className="main-search-result-left-container">
                        <h1>Ищем. Скоро<br/>будут результаты</h1>
                        <p>Поиск может занять некоторое время,<br/>просим сохранять терпение.</p>
                    </div>

                    <div className="main-search-result-right-container">
                        <img src={reslutMainImg} alt='resultImg' />
                    </div>
                </div>

                <GeneralSummary />
                <PublicationCards />
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

export default SearchResult;