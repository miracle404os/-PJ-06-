import React from "react";
import { Card } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../../theme/Cards/Cards";

const CustomCard = (props) => {
    let { children, ...others } = props;
    return (
        <ThemeProvider theme={theme}>
            <Card variant={"outlined"} {...others}>
                {children}
            </Card>
        </ThemeProvider>
    );
};

export { CustomCard };
