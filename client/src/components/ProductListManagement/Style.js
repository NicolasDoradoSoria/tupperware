import { makeStyles, lighten } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  root: {
    marginTop: "3rem",
    width: "85%",
    margin: "auto",
  },
  column: {
    paddingLeft: 0,
  },
  title: {
    marginTop: "1rem",
    textAlign: "center",
    marginBottom: "2rem",
  },
  removeIcon: {
    marginRight: "1rem",
  },
  actionBox: {
    textAlign: "center",
    paddingRight: 0,
  },
  columnAction: {
    width: "25%",
  },
  enhancedTableToolbarRoot: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  enhancedTableToolbarRootTitle: {
    flex: "1 1 100%",
  },

  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  
  divider: {
    height: 28,
    margin: 4,
  },
  rootSearch: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "80%",
    margin: "auto",
    marginTop: "2rem"
  },
  rootBox: {
    marginBottom: "3rem"
  }
}));
