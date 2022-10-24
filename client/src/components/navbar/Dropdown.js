import { List, ListItem, ListItemText } from "@material-ui/core";
import { useState } from "react"
import { Link } from "react-router-dom";
import "./Style.css";
import Style from "./Style";


const Dropdown = ({ path }) => {
  const classes = Style();
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <List style={{ position: "absolute" }}
        onClick={handleClick}
        className={click ? 'dropdown-menus clicked' : 'dropdown-menus'}
      >
        {path.map((item, index) => {
          return (
            <ListItem key={index} button className={classes.dropdownItem} component={Link} to={item.path}>
              <ListItemText className={item.cName} onClick={() => setClick(false)} primary={item.name} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

export default Dropdown