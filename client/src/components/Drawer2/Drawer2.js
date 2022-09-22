import React, { useState } from 'react'
import { Drawer, IconButton, List, ListItem, ListItemText, ListItemIcon, Divider, MenuItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
const useStyles = makeStyles({
    root: {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        "& .MuiPaper-root": {
            backgroundColor: "#B05CAB",
        }
    },
    nav: {
        width: 250,
    },
    list: {
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: "0 16px 16px 0",
    },
    ListItem: {
        width: "100%",
        textAlign: "center",
    },
    listButton: {
        overflow: "hidden",
        display: "flex",
        width: "80%",
        margin: "0 auto"
    },
    listImg: {
        marginLeft: "auto"
    },
    Inside: {
        padding: "45px 0",
       borderRadius: "6px",
       paddingLeft: "20px"

    },
    listShow: {
        width: "10%",
        marginLeft: "auto",
        transition: "height .4s",
        height: "0"
    }

});

const DraWer2 = () => {
    const classes = useStyles();
    const [drawer, setDrawer] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setDrawer(open);
    };

    const list = (anchor) => (
        <div
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            className={classes.nav}
        >
            <List className={classes.list} >
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text} className={classes.ListItem}>
                        <div className={classes.listButton}>
                            <ListItemIcon className={classes.listImg}>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} className={classes.navLink} />
                            <ArrowForwardIcon />
                            <List className={classes.listShow}>
                                <ListItem className={classes.Inside}>
                                    estoy dentro
                                </ListItem>

                            </List>

                        </div>
                    </ListItem>
                ))}
            </List>

        </div>
    );
    return (
        <>
            <IconButton
                onClick={toggleDrawer(true)}
                edge="start"
                color="inherit"
                aria-label="open drawer"
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                open={drawer}
                onClose={toggleDrawer(true)}
                className={classes.root}
            >
                <div onClick={toggleDrawer(true)}>
                    {list("left")}
                </div>

            </Drawer>
        </>
    );
}

export default DraWer2;