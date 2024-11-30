import React, { useEffect, useState } from "react";
import "./SearchForm.modules.css";
import { CustomButton } from "../../CustomComponents/CustomButton/CustomButton";
import { CustomCard } from "../../CustomComponents/CustomCard/CustomCard";
import { HistogramsSearchBody } from "./HistogramsSearchBody";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Histograms } from "../../../store/Slicers/HistogramsSlicer";
import { requestBody } from "../../../store/Slicers/HistogramsSlicer";
import { loadMore } from "../../../store/Slicers/DocumentsSlicer";
import SearchPageMediaImage from "../SearchPageMediaImage/SearchPageMediaImage";
import { useMediaQuery, useTheme } from "@mui/material";

const SearchForm = () => {
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem("accessToken");
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("lg"));

    const navigate = useNavigate();
    const histograms = useSelector((state) => state.histograms);

    useEffect(() => {
        if (histograms.success && histograms.histograms.data) {
            if (histograms.histograms.data.length === 0) {
                setError("ИНН компании не найден");
            } else if (histograms.histograms.data.length > 0) {
                setError("");
                navigate("/result");
            }
        }
    }, [histograms]);

    const checkFormAndRequest = () => {
        const inn = document.querySelector("#inn").value;
        const tonality = document.querySelector("#tonality").value;
        const count = document.querySelector("#count").value;
        const startDate = document.querySelector("#startDate").value;
        const endDate = document.querySelector("#endDate").value;
        const body = () => {
            dispatch(
                requestBody(
                    HistogramsSearchBody(
                        inn,
                        tonality,
                        count,
                        startDate,
                        endDate
                    )
                )
            );
            dispatch(loadMore(count));
            return HistogramsSearchBody(
                inn,
                tonality,
                count,
                startDate,
                endDate
            );
        };

        if (
            Date.parse(startDate) > Date.parse(endDate) ||
            Date.parse(endDate) > Date.now()
        ) {
            setError("Некорректный диапазон поиска");
        } else if (
            inn === "" ||
            tonality === "" ||
            count === "" ||
            startDate === "" ||
            endDate === ""
        ) {
            setError("Заполните все поля");
        } else if (!histograms.succes) {
            dispatch(
                Histograms({
                    accessToken: accessToken,
                    body: body(),
                })
            );
        }
    };

    return (
        <div style={{display: "flex", flexDirection: matches ? "column" : "row", position: "relative"}} className="customCard" >
            <CustomCard style={{ marginTop: "20px", padding: "35px" }}>
                <form>
                    <div style={{ display: "flex" }}>
                        <div style={{ textAlign: "left", flex: matches ? "1" : "0.8" }}>
                            <div>
                                <label
                                    style={{
                                        display: "block",
                                        textAlign: "left",
                                        marginBottom: "30px",
                                    }}
                                >
                                    ИНН компании*
                                    <input
                                        style={{
                                            marginTop: "10px",
                                            maxWidth: matches ? "100%" : "240px",
                                        }}
                                        type="number"
                                        id="inn"
                                        required="required"
                                        placeholder="10 цифр"
                                    />
                                </label>
                            </div>
                            <div>
                                <label
                                    style={{
                                        display: "block",
                                        textAlign: "left",
                                        marginBottom: "30px",
                                    }}
                                >
                                    Тональность
                                    <div
                                        style={{
                                            marginTop: "10px",
                                        }}
                                    >
                                        <select
                                            className="tonality"
                                            id="tonality"
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: 400,
                                                padding: "13px 22px",
                                                borderRadius: "5px",
                                                borderColor: "#c7c7c7",
                                                width: matches ? "100%" : "240px"
                                            }}
                                        >
                                            <option value="any">Любая</option>
                                            <option value="positive">
                                                Позитивная
                                            </option>
                                            <option value="negative">
                                                Негативная
                                            </option>
                                        </select>
                                    </div>
                                </label>
                            </div>
                            <label
                                style={{
                                    display: "block",
                                    textAlign: "left",
                                    marginBottom: "30px",
                                }}
                            >
                                Количество документов в выдаче*
                                <input
                                    style={{
                                        maxWidth: matches ? "100%" : "240px",
                                        marginTop: "10px",
                                    }}
                                    type="number"
                                    id="count"
                                    required="required"
                                    placeholder="от 1 до 1000"
                                    maxLength="10"
                                />
                            </label>

                            <label
                                style={{
                                    display: "block",
                                    textAlign: "left",
                                    marginBottom: "30px",
                                }}
                            >
                                Диапазон поиска*
                                <div
                                    style={{
                                        display: "flex",
                                        columnGap: "10px",
                                        marginTop: "10px",
                                    }}
                                >
                                    <input
                                        style={{ maxWidth: "175px" }}
                                        type="date"
                                        id="startDate"
                                        required="required"
                                        placeholder="Дата начала"
                                    />
                                    <input
                                        style={{ maxWidth: "175px" }}
                                        type="date"
                                        id="endDate"
                                        required="required"
                                        placeholder="Дата конца"
                                    />
                                </div>
                            </label>
                            <div
                                className="btn"
                                style={{
                                    position: "relative",
                                    marginTop: "20px",
                                    display: matches ? "block" : "none"
                                }}
                            >
                                <CustomButton style={{width: "100%"}}
                                    variant="blue"
                                    id="submit"
                                    onClick={() => {
                                        checkFormAndRequest();
                                    }}
                                >
                                    Поиск
                                </CustomButton>

                                <p>* Обязательные к заполнению поля</p>
                                <span
                                    id="error"
                                    style={{
                                        position: "absolute",
                                        left: 0,
                                        bottom: 0,
                                        fontSize: "18px",
                                        color: "red",
                                    }}
                                >
                                    {error}
                                </span>
                            </div>
                        </div>

                        <div
                            style={{
                                display: matches ? "none" : "flex",
                                flexDirection: "column",
                                flex: "1.1",
                            }}
                        >
                            <div className="checkbox_block">
                                <input
                                    type="checkbox"
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        verticalAlign: "bottom",
                                    }}
                                />
                                <span className="checkbox_span">
                                    Признак максимальной полноты
                                </span>
                            </div>
                            <div className="checkbox_block">
                                <input
                                    type="checkbox"
                                    value="test"
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        verticalAlign: "bottom",
                                    }}
                                />
                                <span className="checkbox_span">
                                    Упоминания в бизнес-контенте
                                </span>
                            </div>
                            <div className="checkbox_block">
                                <input
                                    type="checkbox"
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        verticalAlign: "bottom",
                                    }}
                                />
                                <span className="checkbox_span">
                                    Главная роль в публикации
                                </span>
                            </div>
                            <div className="checkbox_block">
                                <input
                                    type="checkbox"
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        verticalAlign: "bottom",
                                    }}
                                />
                                <span className="checkbox_span">
                                    Публикации только с риск-факторами
                                </span>
                            </div>
                            <div className="checkbox_block">
                                <input
                                    type="checkbox"
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        verticalAlign: "bottom",
                                    }}
                                />
                                <span className="checkbox_span">
                                    Включать технические новости рынков
                                </span>
                            </div>
                            <div className="checkbox_block">
                                <input
                                    type="checkbox"
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        verticalAlign: "bottom",
                                    }}
                                />
                                <span className="checkbox_span">
                                    Включать анонсы и календари
                                </span>
                            </div>
                            <div className="checkbox_block">
                                <input
                                    type="checkbox"
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        verticalAlign: "bottom",
                                    }}
                                />
                                <span className="checkbox_span">
                                    Включать сводки новостей
                                </span>
                            </div>

                            <div
                                className="btn"
                                style={{
                                    position: "relative",
                                    textAlign: "right",
                                    marginTop: "60px",
                                }}
                            >
                                <CustomButton
                                    variant="blue"
                                    id="submit"
                                    onClick={() => {
                                        checkFormAndRequest();
                                    }}
                                >
                                    Поиск
                                </CustomButton>

                                <p>* Обязательные к заполнению поля</p>
                                <span
                                    id="error"
                                    style={{
                                        position: "absolute",
                                        left: 0,
                                        bottom: 0,
                                        fontSize: "18px",
                                        color: "red",
                                    }}
                                >
                                    {error}
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
            </CustomCard>
      
        </div>
    );
};

export default SearchForm;
