import React from "react";
import { useSelector, useDispatch } from 'react-redux';

import logoImg from './img/logo.svg';
import logoFooter from './img/logoFooter.svg';
import Carousel from "../carousel/carousel";
import mainImg from './img/mainImg.svg';
import mainTwoImg from './img/mainTwoImg.svg';
import PricingTable from '../pricing-table/pricingTable';
import InfoEvent from "../info/infoUserEvent";
import avatarImg from '../info/img/avatar.svg';
import { logout } from "../authorization/slice/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Main = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const toggleMenu = () => {
        const menu = document.getElementById('menuMobile');
        if (menu.style.display === 'none' || menu.style.display === '') {
            menu.style.display = 'block';
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
                <section>
                    <nav className="main-container">
                        <nav className="left-text-main-container">
                            <h1>СЕРВИС ПО ПОИСКУ ПУБЛИКАЦИЙ<br/>О КОМПАНИИ<br/>ПО ЕГО ИНН</h1>
                            <p>Комплексный анализ публикаций, получение данных<br/>в формате PDF на электронную почту.</p>
                            {isLoggedIn ? (
                                <button className="left-text-button" onClick={() => navigate('/search')}>Запросить данные</button>
                            ) : (
                                <h1> </h1>
                            )}
                        </nav>

                        <nav className="right-img-container">
                            <img src={mainImg} alt="mainImg" />
                        </nav>
                    </nav>
                </section>    

                <section>
                    <h1 className="carousel-h1">ПОЧЕМУ ИМЕННО МЫ</h1>
                    <Carousel />
                </section>

                <section>
                    <nav className="main-two-container">
                        <img src={mainTwoImg} alt="mainTwoImg" />
                    </nav>
                </section>

                <section>
                    <h1 className="pricing-table-h1">НАШИ ТАРИФЫ</h1>
                    <PricingTable />
                </section>
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

export default Main;
