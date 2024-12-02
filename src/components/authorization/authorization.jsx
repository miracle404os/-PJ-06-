import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { login, checkAuth } from './slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";

import charactersImgMobile from './img/characters.svg';
import charactersImg from './img/characters.svg';
import logoFooter from '../main/img/logoFooter.svg';
import logoImg from '../main/img/logo.svg';
import googleImg from './img/google.svg';
import lockImg from './img/lock.svg';
import yandexImg from './img/yandex.svg';
import facebookImg from './img/facebook.svg';

const Authorization = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
          navigate('/');
        }
        dispatch(checkAuth());
    }, [isLoggedIn, navigate, dispatch]);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://gateway.scan-interfax.ru/api/v1/account/login', {
                login: username,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
    
            const data = response.data;
    
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('tokenExpire', data.expire);
            dispatch(login({ accessToken: data.accessToken, expire: data.expire }));
            navigate('/');
        } catch (error) {
            console.error('Ошибка аутентификации:', error.response ? error.response.data.message : error.message);
            setUsernameError(true);
            setPasswordError(true);
        }
    };

    const validateUsername = (input) => {
        setUsernameError(false);
    };

    const validatePassword = (input) => {
        setPasswordError(false);
    };

    const handleUsernameChange = (e) => {
        const input = e.target.value;
        setUsername(input);
        validateUsername(input);
    };

    const handlePasswordChange = (e) => {
        const input = e.target.value;
        setPassword(input);
        validatePassword(input);
    };
    
    const toggleMenu = () => {
        const menu = document.getElementById('menuMobile');
        if (menu.style.display === 'none' || menu.style.display === '') {
            menu.style.display = 'block';
        } else {
            menu.style.display = 'none';
        }
    }
    
    return (
        <div>
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

                    <nav className="login-container">
                        <span className="color-grey">Зарегистрироваться</span>
                        <nav className="separator"></nav>
                        <button className="login-button">Войти</button>
                    </nav>

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

                            <nav className="footer-menu">
                                <span className="color-mobile-menu">Зарегистрироваться</span>
                                <button className="footer-menu-button">Войти</button>
                            </nav>
                        </nav>
                    </nav>
                </nav>
            </header>

            <main>
                <div className="auth-container">
                    <div className="auth-left-container">
                        <h1>Для оформления подписки<br/>на тариф, необходимо<br/>авторизоваться.</h1>
                        <img src={charactersImg} alt="characters" />
                    </div>

                    <div className="auth-right-container">
                        <img src={lockImg} alt="lock" />
                        <div className="auth-form">
                            <div className="tabs">
                                <div className="tab active">Войти</div>
                                <div className="tab"><a className="inactive" href="/">Зарегистрироваться</a></div>
                            </div>

                            <form onSubmit={handleLogin}>
                                <div className="input">
                                    <label htmlFor="username">Логин или номер телефона:</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        required
                                        style={{ boxShadow: usernameError ? '0px 0px 10px 0px red' : '', borderColor: usernameError ? 'red' : '' }}
                                    />
                                    {usernameError && <div className="auth-form-error">Введите корректные данные</div>}
                                </div>

                                <div className="input">
                                    <label htmlFor="password">Пароль:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        autoComplete="current-password" 
                                        required
                                        style={{ boxShadow: usernameError ? '0px 0px 10px 0px red' : '', borderColor: passwordError ? 'red' : '' }}
                                    />
                                    {passwordError && <div className="auth-form-error">Введите правильный пароль</div>}
                                </div>  

                                <div className="auth-button-div">
                                    <button className="button auth-button" type="submit" disabled={!username || !password}>Войти</button>
                                </div>  

                                <a href="/" className="reset-password">Восстановить пароль</a>
                            </form>
                            <div className="auth-social-media">
                                <p className="enter-with">Войти через:</p>
                                <div className="social-buttons">
                                    <button><img src={googleImg} alt="Google" /></button>
                                    <button><img src={facebookImg} alt="Facebook" /></button>
                                    <button><img src={yandexImg} alt="Yandex" /></button>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <div className='mobile-auth-left-container'>
                        <img src={charactersImgMobile} alt="characters" />
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
        </div>
    );
};

export default Authorization;
