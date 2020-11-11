import React, { useReducer } from "react";
import ProductReducer from "./ProductReducer";
import ProductContext from "./ProductContext";
import {GET_PRODUCTS
} from '../../types'
const productsP = [
    {
      id: 1,
      name: "pampersG",
      descripcion:
        "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like",
      date: "11/02/2019",
      urlImg:
        "https://http2.mlstatic.com/D_NQ_NP_2X_989772-MLA40644774902_022020-F.webp",
    },
    {
      id: 2,
      name: "pampersXL",
      descripcion:
        "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like",
      date: "11/02/2019",
      urlImg:
        "https://http2.mlstatic.com/D_NQ_NP_2X_989772-MLA40644774902_022020-F.webp",
    },
    {
      id: 3,
      name: "pampersXX",
      descripcion:
        "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like",
      date: "11/02/2019",
      urlImg:
        "https://http2.mlstatic.com/D_NQ_NP_2X_989772-MLA40644774902_022020-F.webp",
    },
    {
      id: 4,
      name: "ComodinG",
      descripcion:
        "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like",
      date: "11/02/2019",
      urlImg:
        "https://http2.mlstatic.com/D_NQ_NP_2X_989772-MLA40644774902_022020-F.webp",
    },
    {
      id: 5,
      name: "comodionXG",
      descripcion:
        "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like",
      date: "11/02/2019",
      urlImg:
        "https://http2.mlstatic.com/D_NQ_NP_2X_989772-MLA40644774902_022020-F.webp",
    },
    {
      id: 6,
      name: "Estrella",
      descripcion:
        "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like",
      date: "11/02/2019",
      urlImg:
        "https://http2.mlstatic.com/D_NQ_NP_2X_989772-MLA40644774902_022020-F.webp",
    },
    {
      id: 7,
      name: "sarasa",
      descripcion:
        "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like",
      date: "11/02/2019",
      urlImg:
        "https://http2.mlstatic.com/D_NQ_NP_2X_989772-MLA40644774902_022020-F.webp",
    },
    {
      id: 8,
      name: "otroPanial",
      descripcion:
        "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like",
      date: "11/02/2019",
      urlImg:
        "https://http2.mlstatic.com/D_NQ_NP_2X_989772-MLA40644774902_022020-F.webp",
    },
    {
      id: 9,
      name: "algo",
      descripcion:
        "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like",
      date: "11/02/2019",
      urlImg:
        "https://http2.mlstatic.com/D_NQ_NP_2X_989772-MLA40644774902_022020-F.webp",
    },
    {
      id: 10,
      name: "nose",
      descripcion:
        "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like",
      date: "11/02/2019",
      urlImg:
        "https://http2.mlstatic.com/D_NQ_NP_2X_989772-MLA40644774902_022020-F.webp",
    },
    {
      id: 11,
      name: "queseyo",
      descripcion:
        "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like",
      date: "11/02/2019",
      urlImg:
        "https://http2.mlstatic.com/D_NQ_NP_2X_989772-MLA40644774902_022020-F.webp",
    },
    {
      id: 12,
      name: "XXX",
      descripcion:
        "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like",
      date: "11/02/2019",
      urlImg:
        "https://http2.mlstatic.com/D_NQ_NP_2X_989772-MLA40644774902_022020-F.webp",
    },
  ];
  

const ProductState = (props) => {
  const initialState = {
    products: [],
    errorProducts: false,
  };

  const [state, dispatch] = useReducer(ProductReducer, initialState);

  const getProducts = () =>{
      dispatch({
        type: GET_PRODUCTS,
        payload: productsP
      })
  }
  return (
    <ProductContext.Provider value={{
        products: state.products,
        getProducts
    }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
