import { blue } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import {
  whiteColor,
  blackColor,
  defaultFont,
  hexToRgb,
  infoColor,
  grayColor
} from "./material-dashboard-react";
export default makeStyles({
    fullList: {
      width: 'auto',
    },
    paper: {
      background: "#101746",
    },
    sidebarWrapper: {
      width: "260px",
    },
    itemLink: {
      
      width: "auto",
      transition: "all 300ms linear",
      margin: "10px 15px 0",
      borderRadius: "3px",
      position: "relative",
      display: "block",
      padding: "10px 15px",
      backgroundColor: "transparent",
      ...defaultFont,
      "&:hover": {
        backgroundColor: "#B23A17",
        textDecoration:"none",
      }
    },
   
    logoName:{
     color: "white",
     fontSize: "20px",
     textAlign:"center"
    },

    itemIcon: {
      width: "24px",
      height: "30px",
      fontSize: "24px",
      lineHeight: "30px",
      float: "left",
      marginRight: "15px",
      textAlign: "center",
      verticalAlign: "middle",
      color: "rgba(" + hexToRgb(whiteColor) + ", 0.8)"
    },
    itemText: {
      ...defaultFont,
      margin: "0",
      lineHeight: "30px",
      fontSize: "18px",
      color: whiteColor
    },
    logo: {
      position: "relative",
      padding: "15px 15px",
      zIndex: "4",
      "&:after": {
        content: '""',
        position: "absolute",
        bottom: "0",
  
        height: "1px",
        right: "15px",
        width: "calc(100% - 30px)",
        backgroundColor: "rgba(" + hexToRgb(grayColor[6]) + ", 0.3)"
      }
    },
    logoLink: {
      ...defaultFont,
      textTransform: "uppercase",
      padding: "5px 0",
      display: "block",
      fontSize: "18px",
      textAlign: "center",
      fontWeight: "400",
      lineHeight: "30px",
      textDecoration: "none",
      backgroundColor: "transparent",
      "&,&:hover": {
        color: whiteColor
      }
    },
    logoImage: {
      width: "30px",
      display: "inline-block",
      maxHeight: "30px",
      marginLeft: "10px",
      marginRight: "15px"
    },

    img: {
      width: "35px",
      top: "22px",
      position: "absolute",
      verticalAlign: "middle",
      border: "0"
    },
    
    blue: {
      backgroundColor: infoColor[0],
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(infoColor[0]) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(blackColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(infoColor[0]) +
        ",.2)",
      "&:hover,&:focus": {
        backgroundColor: infoColor[0],
        boxShadow:
          "0 12px 20px -10px rgba(" +
          hexToRgb(infoColor[0]) +
          ",.28), 0 4px 20px 0 rgba(" +
          hexToRgb(blackColor) +
          ",.12), 0 7px 8px -5px rgba(" +
          hexToRgb(infoColor[0]) +
          ",.2)"
      }
    },
  });