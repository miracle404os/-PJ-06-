import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTonality } from "./tonalitySlice/tonalitySlice";

const Tonality = () => {
    const dispatch = useDispatch();
    const selectedTonality = useSelector((state) => state.tonality.selectedTonality);

    const handleSelectChange = (event) => {
        dispatch(setTonality(event.target.value));
    };

    return (
        <>
            <label htmlFor="tonality" className="label-text">Тональность</label>
            <select id="tonality" name="tonality" className="select-label-text" value={selectedTonality} onChange={handleSelectChange}>
                <option value="any">Любая</option>
                <option value="positive">Позитивная</option>
                <option value="negative">Негативная</option>
            </select>
        </>
    );
};

export default Tonality;