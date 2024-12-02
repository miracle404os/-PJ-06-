import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import spinnerIcon from './icon/spinner.svg';

const GeneralSummary = () => {
    const startDate = useSelector((state) => state.date.startDate);
    const endDate = useSelector((state) => state.date.endDate);
    const innCompany = useSelector((state) => state.inn.value);
    const maxCompleteness = useSelector((state) => state.checkboxes.maxCompleteness);
    const mainRole = useSelector((state) => state.checkboxes.mainRole);
    const tonality = useSelector((state) => state.tonality.selectedTonality);
    const riskFactorsOnly = useSelector((state) => state.checkboxes.riskFactorsOnly);
    const includeMarketNews = useSelector((state) => state.checkboxes.includeMarketNews);
    const includeAnnouncements = useSelector((state) => state.checkboxes.includeAnnouncements);
    const includeNewsSummaries = useSelector((state) => state.checkboxes.includeNewsSummaries);
    const documentCount = useSelector((state) => state.document.value);

    const [histogram, setHistogram] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchHistogram = useCallback(async () => {
        const searchParams = {
            "issueDateInterval": {
                "startDate": `${startDate}T00:00:00+03:00`,
                "endDate": `${endDate}T23:59:59+03:00`
            },
            "searchContext": {
                "targetSearchEntitiesContext": {
                    "targetSearchEntities": [
                        {
                            "type": "company",
                            "sparkId": null,
                            "entityId": null,
                            "inn": innCompany,
                            "maxFullness": maxCompleteness,
                            "inBusinessNews": null
                        }
                    ],
                    "onlyMainRole": mainRole,
                    "tonality": tonality,
                    "onlyWithRiskFactors": riskFactorsOnly,
                    "riskFactors": {
                        "and": [],
                        "or": [],
                        "not": []
                    },
                    "themes": {
                        "and": [],
                        "or": [],
                        "not": []
                    }
                },
                "themesFilter": {
                    "and": [],
                    "or": [],
                    "not": []
                }
            },
            "searchArea": {
                "includedSources": [],
                "excludedSources": [],
                "includedSourceGroups": [],
                "excludedSourceGroups": []
            },
            "attributeFilters": {
                "excludeTechNews": includeMarketNews,
                "excludeAnnouncements": includeAnnouncements,
                "excludeDigests": includeNewsSummaries
            },
            "similarMode": "duplicates",
            "limit": Number(documentCount),
            "sortType": "sourceInfluence",
            "sortDirectionType": "desc",
            "intervalType": "month",
            "histogramTypes": [
                "totalDocuments",
                "riskFactors"
            ]
        };
        
        try {
            const response = await axios.post('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', searchParams, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': String(`Bearer ${localStorage.getItem('accessToken')}`),
                },
            });

            setHistogram(response.data);
        } catch (error) {
            setError(error);
        }
    }, [startDate, endDate, innCompany, maxCompleteness, mainRole, tonality, riskFactorsOnly, includeMarketNews, includeAnnouncements, includeNewsSummaries, documentCount]);

    useEffect(() => {
        fetchHistogram();
    }, [fetchHistogram]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ru-RU", {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const getDatesInRange = (startDate, endDate) => {
        const dates = [];
        let currentDate = new Date(startDate);
        const end = new Date(endDate);
        
        while (currentDate <= end) {
            dates.push(currentDate.toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        return dates;
    };

    const combinedData = {};
      
    const totalDocumentsData = histogram?.data?.find(item => item.histogramType === 'totalDocuments')?.data || [];
    const riskFactorsData = histogram?.data?.find(item => item.histogramType === 'riskFactors')?.data || [];
    const totalDataCount = Array.isArray(totalDocumentsData) ? totalDocumentsData.reduce((acc, item) => acc + item.value, 0) : 0;
    
    totalDocumentsData.forEach(item => {
        const dateKey = item.date.split('T')[0];
        if (!combinedData[dateKey]) {
            combinedData[dateKey] = { period: formatDate(dateKey), total: 0, risks: 0 };
        }
        combinedData[dateKey].total += item.value;
    });
    
    riskFactorsData.forEach(item => {
        const dateKey = item.date.split('T')[0];
        if (!combinedData[dateKey]) {
            combinedData[dateKey] = { period: formatDate(dateKey), total: 0, risks: 0 };
        }
        combinedData[dateKey].risks += item.value;
    });
    
    const datesInRange = getDatesInRange(startDate, endDate);
    
    const combinedDatas = datesInRange.map(date => ({
        date: date,
        period: formatDate(date),
        total: combinedData[date]?.total || 0,
        risks: combinedData[date]?.risks || 0,
    }));

    const itemsPerPageLarge = 8;
    const itemsPerPageSmall = 1;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(
        window.innerWidth < 768 ? itemsPerPageSmall : itemsPerPageLarge
    );

    const handleNext = () => {
        if (currentIndex + itemsPerPage < combinedDatas.length) {
            setCurrentIndex(currentIndex + itemsPerPage);
        }
    };

    const handlePrev = () => {
        if (currentIndex - itemsPerPage >= 0) {
            setCurrentIndex(currentIndex - itemsPerPage);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(window.innerWidth < 768 ? itemsPerPageSmall : itemsPerPageLarge);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const currentItems = combinedDatas.slice(currentIndex, currentIndex + itemsPerPage);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const [screenClass, setScreenClass] = useState(window.innerWidth < 768 ? 'carousel-items' : 'summary-load-container');

    useEffect(() => {
        const handleScreenResize = () => {
            setScreenClass(window.innerWidth < 768 ? 'carousel-items' : 'summary-load-container')
        };

        window.addEventListener('resize', handleScreenResize);

        return () => {
            window.removeEventListener('resize', handleScreenResize);
        };
    }, []);
    
    return (
        <>
            <h1 className="general-summary-h1">Общая Сводка</h1>
            <p className="general-summary-p">Найдено {totalDataCount} вариантов</p>
            <div className="carousel-wrapper">
                <button className="carousel-button left" onClick={handlePrev}>&#10094;</button>
                <div className="general-summary-container">
                    <div className="general-summary-container-left">
                        <p>Период</p>
                        <p>Всего</p>
                        <p>Риски</p>
                    </div>

                    <div className="general-summary-container-right">
                        <div className="carousel">
                            <div className="carousel-items">
                                {loading ? (
                                    <>
                                        <div className={screenClass}>
                                            <div className="spinner" style={{ 
                                                width: window.innerWidth < 768 ? '36px' : '50px', 
                                                height: window.innerWidth < 768 ? '36px' : '50px', 
                                                marginLeft: window.innerWidth < 768 ? '135px' : '50px',
                                                marginTop: '10px' 
                                            }}>
                                                <img src={spinnerIcon} alt="spinner" />
                                            </div>
                                            <p className="spinner-text">Загружаем данные</p>
                                        </div>
                                    </>
                                ) : error ? (
                                    <>
                                        <div className="carousel-items">
                                            <p style={{ 
                                                color: 'red', 
                                                fontSize: window.innerWidth < 768 ? '14px' : '18px', 
                                                fontFamily: 'Inter, sans-serif', 
                                                fontStyle: 'normal', 
                                                fontWeight: '400',
                                                textAlign: 'center',
                                                marginLeft: window.innerWidth < 768 ? '0' : '190px', 
                                            }}>Ошибка сервера. Попробуйте чуть позже или форма поиска не валидна!</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {currentItems.map((item, index) => (
                                            <div key={index} className="carousel-item">
                                                <p>{item.period}</p>
                                                <p>{item.total}</p>
                                                <p>{item.risks}</p>
                                                <div className="vertical-line"></div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>  
                    </div>
                </div>
                <button className="carousel-button right" onClick={handleNext}>&#10095;</button>
            </div>
        </>
    );
};

export default GeneralSummary;