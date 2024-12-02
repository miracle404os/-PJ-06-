import React, { useCallback, useEffect, useState } from "react";

const PublicationCard = (props) => {
    const [cleanContent, setCleanContent] = useState('');
    
    const decodeHtml = (html) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    const pubContentClean = useCallback((content) => {
        const replaceHtml = decodeHtml(content);
        const cleanedContent = replaceHtml.replace(/(<([^>]+)>)/gi, "");
        return cleanedContent;
    }, []);

    useEffect(() => {
        setCleanContent(pubContentClean(props.content));
    }, [pubContentClean, props.content]);

     const tagsName = props.isTechNews ? 'Технические новости' : props.isAnnouncement ? 'Анонсы и события' : 'Сводка новостей';

    return (
        <div className="publication-card-container">
            <div className="publication-card-date-url">
                <span>{props.date}</span>
                <a href={props.url}>{props.sourceName}</a>
            </div>

            <h3 className="publication-h3">{props.title}</h3>
            <span className="publication-tag">{tagsName}</span>
            <img src={props.picture} alt="Publication" className="publication-img" />
            <p className="publication-text-content">{cleanContent}</p>

            <div className="publication-card-footer">
                <a href={props.url}>Читать в источнике</a>
                <span>{props.wordCount} слова</span>
            </div>
        </div>
    );
};

export default PublicationCard;