import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import { createTheme } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { grey } from "@material-ui/core/colors";

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: {
            main: grey[900],
        },
    }
})

const Theme = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}

export default Theme;