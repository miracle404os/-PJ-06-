import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDocumentCount } from "./documentSlice/documentSlice";

const Document = () => {
    const dispatch = useDispatch();
    const documentCount = useSelector((state) => state.document.value);
    const [error, setError] = useState('');

    const validateDocumentCount = useCallback(() => {
        const count = parseInt(documentCount, 10);

        if (!documentCount) {
            // setError('Обязательное поле');
            return '';
        } else if (isNaN(count) || count < 1) {
            setError('Введите корректные данные');
        } else if (count > 1000) {
            setError('Введите корректные данные');
        } else {
            setError('');
        }
    }, [documentCount]);

    useEffect(() => {
        validateDocumentCount();
    }, [validateDocumentCount]);

    const handleChange = (e) => {
        dispatch(setDocumentCount(e.target.value));
    };

    return (
        <>
            <label htmlFor="documentCount" className="label-text">Количество документов в выдаче<span className={error ? "label-asterisk-error" : "label-asterisk"}>*</span></label>
            <input
                type="number"
                id="documentCount"
                name="documentCount"
                className={error ? "input-label-text-error" : "input-label-text"}
                value={documentCount}
                onChange={handleChange}
                onBlur={validateDocumentCount}
                placeholder="от 1 до 1000"
            />
            {error && <span className="span-input-error">{error}</span>}
        </>
    );
};

export default Document;