import React, { useEffect, useState } from "react";
import "./AuthForm.css";
import lock from "./auth_lock.svg";
import face from "./face.svg";
import goog from "./Goog.svg";
import yand from "./Yand.svg";
import ComponentImage from "../../CustomComponents/ComponentImage/ComponentImage";
import ComponentText from "../../CustomComponents/ComponentText/ComponentText";
import { CustomButton } from "../../CustomComponents/CustomButton/CustomButton";
import { CustomCard } from "../../CustomComponents/CustomCard/CustomCard";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "../../../store/Slicers/AuthSlicer";
import { useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const AuthForm = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const [submitEnabled, setSubmitEnabled] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const data = useSelector((state) => state.login);

    useEffect(() => {
        if (data.is_Auth) {
            navigate("/");
        }
    }, [navigate, data.is_Auth]);

    const submit = () => {
        const loginInput = document.getElementById("login_input").value;
        const passwordInput = document.getElementById("password_input").value;
        dispatch(UserLogin({ login: loginInput, password: passwordInput }));
    };
    
    const checkInputs = () => {
        const loginInput = document.getElementById("login_input").value;
        const passwordInput = document.getElementById("password_input").value;
        loginInput.length > 3 && passwordInput
            ? setSubmitEnabled(false)
            : setSubmitEnabled(true);
    };

    return (
        <CustomCard
            style={{
                minWidth: "330px",
                overflow: "visible",
                position: "relative",
                padding: matches ? "10px 15px" : "10px 25px",
                maxHeight: "520px",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    left: matches ? "100px" : "-50px",
                    top: matches ? "-80px" : "-70px",
                }}
            >
                <ComponentImage source={lock} width="75px" height="92px" />
            </div>

            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        columnGap: "20px",
                    }}
                >
                    <CustomButton
                        className="login_btn"
                        variant="blue"
                        style={{
                            backgroundColor: "transparent",
                            color: "#029491",
                            fontSize: matches ? "14px" : "16px",
                            minWidth: "auto",
                            padding: "8px 20px",
                            borderBottom: "2px solid #029491",
                            borderRadius: 0,
                        }}
                    >
                        Войти
                    </CustomButton>
                    <CustomButton
                        className="auth_btn"
                        variant="blue"
                        style={{
                            backgroundColor: "transparent",
                            color: "#c7c7c7",
                            fontSize: matches ? "14px" : "16px",
                            minWidth: "auto",
                            padding: "8px 20px",
                            borderBottom: "2px solid #c7c7c7",
                            borderRadius: 0,
                        }}
                    >
                        Зарегистрироваться
                    </CustomButton>
                </div>

                <label
                    style={{
                        textAlign: "left",
                        fontFamily: "Inter",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "20px",
                        color: "#949494",
                        margin: "30px 0 15px",
                    }}
                >
                    Логин или номер телефона:
                </label>
                <input
                    id="login_input"
                    onChange={() => {
                        checkInputs();
                    }}
                    type="text"
                    style={{
                        padding: "10px",
                        border: "1px solid #c7c7c7",
                        borderRadius: "5px",
                    }}
                    required
                />

                <label
                    style={{
                        textAlign: "left",
                        fontFamily: "Inter",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "20px",
                        color: "#949494",
                        margin: "15px 0",
                    }}
                >
                    Пароль:
                </label>

                <input
                    onChange={() => {
                        checkInputs();
                    }}
                    id="password_input"
                    type="password"
                    style={{
                        padding: "10px",
                        border: "1px solid #c7c7c7",
                        borderRadius: "5px",
                    }}
                    required
                />
                <p
                    style={{
                        padding: 0,
                        margin: 0,
                        textAlign: "left",
                        color: "red",
                        visibility: data.error ? "visible" : "hidden",
                    }}
                >
                    {data.error}
                </p>

                <CustomButton
                    onClick={() => {
                        submit();
                    }}
                    variant="blue"
                    style={{ marginTop: "10px" }}
                    disabled={submitEnabled}
                >
                    {data.loading ? <CircularProgress sx={{color: "#ffffff"}}/> : "Войти"}
                </CustomButton>
                <br />
                <a href="#">Восстановить пароль</a>
                <ComponentText
                    style={{
                        textAlign: "left",
                        marginTop: "30px",
                        marginBottom: "15px",
                        color: "#949494",
                    }}
                >
                    Войти через:
                </ComponentText>
                <div className="logos">
                    <button style={{ paddingLeft: 0 }}>
                        <img src={goog} />
                    </button>
                    <button className="mr">
                        <img src={face} />
                    </button>
                    <button>
                        <img src={yand} />
                    </button>
                </div>
            </form>
        </CustomCard>
    );
};

export default AuthForm;
