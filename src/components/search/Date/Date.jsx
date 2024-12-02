import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStartDate, setEndDate } from "./dateSlice/dateSlice";

const DateInput = () => {
    const dispatch = useDispatch();
    const startDate = useSelector((state) => state.date.startDate);
    const endDate = useSelector((state) => state.date.endDate);

    const [error, setError] = useState('');
    const [typeStartInput, setTypeStartInput] = useState('text');
    const [typeEndInput, setTypeEndInput] = useState('text');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const validateDate = useCallback(() => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (!startDate || !endDate) {
            // setError('Обязательное поле');
            return '';
        } else if (new Date(startDate) > new Date(endDate)) {
            setError('Введите корректные данные');
        } else if (new Date(startDate) > currentDate || new Date(endDate) > currentDate) {
            setError('Дата не может быть позже текущей даты');
        } else {
            setError('');
        }
    }, [startDate, endDate]);

    useEffect(() => {
        validateDate();
    }, [validateDate]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <label htmlFor="startDate" className="label-text" style={{margin: isMobile ? '20px 0 0 10px' : '40px 0 0 30px'}}>Диапазон поиска<span className={error ? "label-asterisk-error" : "label-asterisk"}>*</span></label>
            <div className="form-date-container">
                <input 
                    type={typeStartInput}
                    onFocus={() => setTypeStartInput('date')}
                    onBlur={() => {
                        validateDate();
                        if (!startDate) setTypeStartInput('text');
                    }}
                    id="startDate"
                    name="startDate"
                    placeholder="Дата начала"
                    value={startDate}
                    onChange={(e) => dispatch(setStartDate(e.target.value))}
                    className={error ? "input-start-date-error" : "input-start-date"}
                />

                <input 
                    type={typeEndInput}
                    onFocus={() => setTypeEndInput('date')}
                    onBlur={() => {
                        validateDate();
                        if (!endDate) setTypeEndInput('text');
                    }}
                    id="endDate"
                    name="endDate"
                    placeholder="Дата конца"
                    value={endDate}
                    onChange={(e) => dispatch(setEndDate(e.target.value))}
                    className={error ? "input-end-date-error" : "input-end-date"}
                />
                <br/>
                {error && <span className="span-input-error">{error}</span>} 
            </div>
        </>
    );
};

export default DateInput;