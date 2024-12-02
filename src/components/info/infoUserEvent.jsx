import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';

import avatarImg from './img/avatar.svg';
import loadIcon from './icon/load.svg';
import { logout } from "../authorization/slice/authSlice";

const InfoEvent = () => {
    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState();
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const fetchEvent = async () => {
        try {
            const response = await axios.get('https://gateway.scan-interfax.ru/api/v1/account/info', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            setEvent(response.data.eventFiltersInfo);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchEvent();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (error) {
        return <div className="info-event-container">
            <p>Ошибка: {error.message}</p>
        </div>;
    }

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenExpire');
    }
    
    return (
        <>
            <div className="info-event-container">
                {loading ? (
                    <div className="spinner">
                        <img src={loadIcon} alt="load" />
                    </div>
                ) : (
                    <>
                        <p>Использовано компаний <span className="span-event-company">{event.usedCompanyCount}</span></p>
                        <p>Лимит по компаниям <span className="span-event-limit">{event.companyLimit}</span></p>
                    </>
                )}
            </div>

            <div className="event-login-container">
                <div className="event-login-left">
                    <p>Алексей А.</p>
                    <button onClick={handleLogout}>Выйти</button>
                </div>

                <div className="event-login-right">
                    <img src={avatarImg} alt="avatar" />
                </div>
            </div>
        </>
    );
}

export default InfoEvent;