import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import { createMuiTheme } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        primary: blue,
       
    }
})

const Theme = ({children}) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}

export default Theme;