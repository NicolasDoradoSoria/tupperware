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
}));
