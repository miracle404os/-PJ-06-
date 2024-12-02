import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import headerPubImg from './img/headerPubImg.svg';
import headerPubMobile from './img/headerPubMobile.svg';
import PublicationCard from './PublicationCard/PublicationCard';

const PublicationCards = () => {
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

    const [error, setError] = useState(null);
    const [documentsData, setDocumentsData] = useState(null);
    const [publication, setPublication] = useState([]);
    const [showPublication, setShowPublication] = useState(10);

    const fetchPiblicationCards = useCallback(async () => {
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
            const responsePubIds = await axios.post('https://gateway.scan-interfax.ru/api/v1/objectsearch', searchParams, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': String(`Bearer ${localStorage.getItem('accessToken')}`),
                },
            });

            if (responsePubIds && responsePubIds.data && Array.isArray(responsePubIds.data.items)) {
                const publicationsIds = responsePubIds.data.items.map(item => item.encodedId);
    
                const responseDocuments = await axios.post('https://gateway.scan-interfax.ru/api/v1/documents', 
                    JSON.stringify({ids: publicationsIds}), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
    
                setDocumentsData(responseDocuments.data);
            } else {
                console.error("Получен неожиданный ответ от API:", responsePubIds);
            }
        } catch (error) {
            setError(error);
            console.error("Error fetching publications:", error);
        }
    }, [startDate, endDate, innCompany, maxCompleteness, mainRole, tonality, riskFactorsOnly, includeMarketNews, includeAnnouncements, includeNewsSummaries, documentCount]);

    useEffect(() => {
        fetchPiblicationCards();
    }, [fetchPiblicationCards]);

    useEffect(() => {
        if (documentsData && Array.isArray(documentsData)) {
            const transformPub = documentsData.map(document => ({
                date: new Date(document.ok.issueDate).toLocaleDateString("ru-RU"),
                url: document.ok.url,
                sourceName: document.ok.source.name,
                isTechNews: document.ok.attributes.isTechNews,
                isAnnouncement: document.ok.attributes.isAnnouncement,
                isDigest: document.ok.attributes.isDigest,
                title: document.ok.title.text,
                content: document.ok.content.markup,
                wordCount: document.ok.attributes.wordCount,
                picture: window.innerWidth < 768 ? headerPubMobile : headerPubImg,
            }));

            setPublication(transformPub);
        }
    }, [documentsData]);

    const showMorePublications = () => {
        setShowPublication(prev => prev + 10);
    };
    
    return (
        <>
            <h1 className="publication-h1">Список документов</h1>
            {error ? (
                <p style={{
                    color: 'red', 
                    fontSize: '18px', 
                    fontFamily: 'Inter, sans-serif', 
                    fontStyle: 'normal', fontWeight: 
                    '400', marginLeft: window.innerWidth < 768 ? '10px' : '60px'
                }}>Ошибка сервера. Попробуйте чуть позже или форма поиска не валидна!</p>
            ) : (
                <>
                    <div className="publication-main-container">
                        {publication.slice(0, showPublication).map((pub, index) => (
                            <PublicationCard key={index} {...pub} />
                        ))}
                    </div>
                    {showPublication < publication.length && (
                        <div className="publication-button-container">
                            <button onClick={showMorePublications}>Показать больше</button>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default PublicationCards;