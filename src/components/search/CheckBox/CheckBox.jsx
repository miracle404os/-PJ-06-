import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCheckbox } from './checkboxSlice/checkboxSlice';

const CheckBox = () => {
    const dispatch = useDispatch();
    const checkboxStates = useSelector((state) => state.checkboxes);

    const labels = {
        maxCompleteness: "Признак максимальной полноты",
        businessMentions: "Упоминания в бизнес-контексте",
        mainRole: "Главная роль в публикации",
        riskFactorsOnly: "Публикации только с риск-факторами",
        includeMarketNews: "Включать технические новости рынков",
        includeAnnouncements: "Включать анонсы и календари",
        includeNewsSummaries: "Включать сводки новостей",
    };

    const handleCheckboxChange = (e) => {
        const checkboxName = e.target.name;
        dispatch(toggleCheckbox({ checkboxName }));
    };

    return (
        <div className="right-side-checkbox-block">
          {Object.keys(checkboxStates).map((key) => (
            <div key={key} className="checkbox-container">
              <input
                type="checkbox"
                id={`checkbox-${key}`}
                name={key}
                checked={checkboxStates[key]}
                onChange={handleCheckboxChange}
                className="hidden-checkbox"
              />
              <label htmlFor={`checkbox-${key}`} className={checkboxStates[key] ? "checked-label" : ""}>
                <span className="custom-checkbox"></span>
                <span className="label-text-checkbox">{labels[key]}</span>
              </label>
            </div>
          ))}
        </div>
    );
};

export default CheckBox;