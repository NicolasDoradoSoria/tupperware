import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Style from "./Style";
const Footer = () => {
    const classes = Style();
    return (
        <footer className={classes.footer} >
            <Box px={{ xs: 3, sm: 10 }} py={{ xs: 5, sm: 10 }} bgcolor="text.secondary" color="white">
                <Container maxWidth="lg">
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>Ayuda</Box>
                            <Box>
                                <Link href="/" color="inherit">Contacto</Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit">Soporte</Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit">Privacidad</Link>
                            </Box>


                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>cuenta</Box>
                            <Box>
                                <Link href="/" color="inherit">Iniciar Seccion</Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit">Registrate</Link>
                            </Box>

                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>mensajes</Box>
                            <Box>
                                <Link href="/" color="inherit">Contacto</Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit">Soporte</Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit">Privacidad</Link>
                            </Box>


                        </Grid>

                    </Grid>
                    <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>TUPPERWARE &reg; {new Date().getFullYear()}</Box>
                </Container>
            </Box>
        </footer>
        
    )
}

export default Footer;