import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setInn } from "./innSlice/innSlice";

const InnCompany = () => {
    const dispatch = useDispatch();
    const [innCompany, setInnCompany] = useState('');
    const [error, setError] = useState('');

    const validateInn = (inn) => {
        let errorObj = { code: 0, message: '' };
        let result = false;

        if (typeof inn === 'number') {
          inn = inn.toString();
        } else if (typeof inn !== 'string') {
          errorObj.code = 2;
          errorObj.message = 'Введите корректные данные';
          setError(errorObj.message);
          return false;
        }

        if (!inn.length) {
          errorObj.code = 1;
          // errorObj.message = 'Обязательное поле';
        } else if (/[^0-9]/.test(inn)) {
          errorObj.code = 2;
          errorObj.message = 'Введите корректные данные';
        } else if ([10, 12].indexOf(inn.length) === -1) {
          errorObj.code = 3;
          errorObj.message = 'Введите корректные данные';
        } else {
          const checkDigit = (inn, coefficients) => {
            let n = 0;
            for (let i = 0; i < coefficients.length; i++) {
              n += coefficients[i] * inn[i];
            }
            return parseInt(n % 11 % 10, 10);
          };

          switch (inn.length) {
            case 10:
              const n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
              result = (n10 === parseInt(inn[9], 10));
              break;
            case 12:
              const n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
              const n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
              result = (n11 === parseInt(inn[10], 10)) && (n12 === parseInt(inn[11], 10));
              break;
            default:
              result = false;  
          }

          if (!result) {
            errorObj.code = 4;
            errorObj.message = 'Введите корректные данные';
          }
        }
        setError(errorObj.message);
        return result;
    };

    useEffect(() => {
        if (validateInn(innCompany)) {
            dispatch(setInn(innCompany));
            setError('');
        }
    }, [dispatch, innCompany]);

    return(
        <>
          <label htmlFor="innComapny" className="label-text">ИНН компании<span className={error ? "label-asterisk-error" : "label-asterisk"}>*</span></label>
          <input 
              type="text"
              id="innCompany"
              name="innCompany"
              className={error ? "input-label-text-error" : "input-label-text"}
              value={innCompany}
              onChange={(e) => setInnCompany(e.target.value)}
              onBlur={() => validateInn(innCompany)}
              placeholder="10 цифр"
          />
          {error && <span className="span-input-error">{error}</span>} 
        </>
    );
};

export default InnCompany;