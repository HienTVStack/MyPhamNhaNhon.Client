// React
import { useMemo } from "react";
// Material
import { CssBaseline } from "@mui/material";
import {
    ThemeProvider as MUIThemeProvider,
    createTheme,
    StyledEngineProvider,
} from "@mui/material/styles";
// theme
import palette from "./palette";
import typography from "./typography";
import shadows, { customShadows } from "./shadows";

export default function ThemeProvider({ children }) {
    const themeOptions = useMemo(
        () => ({
            palette,
            shape: { borderRadius: 8 },
            typography,
            shadows,
            customShadows,
        }),
        []
    );

    const theme = createTheme(themeOptions);

    return (
        <StyledEngineProvider injectFirst>
            <MUIThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MUIThemeProvider>
        </StyledEngineProvider>
    );
}
