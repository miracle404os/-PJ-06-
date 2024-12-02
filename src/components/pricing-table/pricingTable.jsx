import React from "react";
import { useSelector } from 'react-redux';

import lampIcon from './icon/lampIcon.svg';
import dartIcon from './icon/dartIcon.svg';
import pcIcon from './icon/pcIcon.svg';

const data = [
    { id: 1, 
        icon: lampIcon,
        backgroundColor: '#FFB64F', 
        text_header_h1: 'Beginner', 
        text_header_p: 'Для небольшого иследования', 
        text_main_h1: '799 ₽',
        text_main_del: '1 200 ₽',
        text_main_p: 'или 150 ₽/мес. при рассрочке на 24 мес.',
        text_main_r_h1: 'В тариф входит:',
        text_main_r1_p: '✔️ Безлимитная история запросов',
        text_main_r2_p: '✔️ Безопасная сделка',
        text_main_r3_p: '✔️ Поддержка 24/7', 
    },
    { id: 2, 
        icon: dartIcon,
        backgroundColor: '#7CE3E1', 
        text_header_h1: 'Pro', 
        text_header_p: 'Для HR и фрилансеров', 
        text_main_h1: '1 299 ₽',
        text_main_del: '2 600 ₽',
        text_main_p: 'или 279 ₽/мес. при рассрочке на 24 мес.',
        text_main_r_h1: 'В тариф входит:',
        text_main_r1_p: '✔️ Все пункты тарифа Beginner',
        text_main_r2_p: '✔️ Экспорт истории',
        text_main_r3_p: '✔️ Рекомендации по приоритетам',
    },
    { id: 3, 
        icon: pcIcon,
        backgroundColor: '#000000',
        color: '#fff', 
        text_header_h1: 'Businnes', 
        text_header_p: 'Для корпоративных клиентов', 
        text_main_h1: '2 379 ₽',
        text_main_del: '3 700 ₽',
        text_main_p: ' ',
        text_main_r_h1: 'В тариф входит:',
        text_main_r1_p: '✔️ Все пункты тарифа Pro',
        text_main_r2_p: '✔️ Безлимитное количество запросов',
        text_main_r3_p: '✔️ Приоритетная поддержка',
    },
];

const PricingCard = ({ item }) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const borderStyle = () => {
        if (item.id === 1) {
            return isLoggedIn ? '2px solid #FFB64F' : 'none';
        } else {
            return 'none';
        }
    };
    
    return (
        <div className="pricing-table-container" style={{ border: borderStyle()}}>
            <div className="pricing-header-container" style={{ backgroundColor: item.backgroundColor, borderRadius: '8px 8px 0 0' }}>
                <div className="pricing-header-text-container" style={{ color: item.color }}>
                    <h1 className="header-main-h1">{item.text_header_h1}</h1>
                    <p>{item.text_header_p}</p>
                </div>
                <img src={item.icon} alt="icon" />
            </div>

            <div className="pricing-main-container">
                {item.id === 1 ? (
                    isLoggedIn ? (
                        <button className="current-price">Текущий тариф</button>
                    ) : (
                        <span style={{padding: '6px'}}> </span>
                    )
                ) : (
                    <span style={{padding: '6px'}}> </span>
                )}
                <h1 className="header-main-h1">{item.text_main_h1}&nbsp;&nbsp;&nbsp;<del>{item.text_main_del}</del></h1>
                <p>{item.text_main_p}</p>
                <h1 className="main-r-h1">{item.text_main_r_h1}</h1>
                <ul>
                    <li>{item.text_main_r1_p}</li>
                    <li>{item.text_main_r2_p}</li>
                    <li>{item.text_main_r3_p}</li>
                </ul>
            </div>

            <div className="pricing-footer-container">
                {item.id === 1 ? (
                    isLoggedIn ? (
                        <button className="pricing-button" style={{backgroundColor: '#D2D2D2', color: 'black'}}>Перейти в личный кабинет</button>
                    ) : (
                        <button className="pricing-button">Подробнее</button>
                    )
                ) : (
                    <button className="pricing-button">Подробнее</button>
                )}
            </div>
        </div>
    );
};

const PricingTable = () => {
    return (
        <div className="pricing-tables-container">
            {data.map(item => (
                <PricingCard key={item.id} item={item} />
            ))}
        </div>
    );
};

export default PricingTable;