import {
  UPLOADER_MULTIPPLE_IMAGES,
  DELETE_IMAGE,
  UPLOADER_MULTIPPLE_POST_IMAGES
  } from "../../types";
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default (state, action) => {
    switch (action.type) {
      case UPLOADER_MULTIPPLE_IMAGES:
        return {
          ...state,
          images: action.payload,
        }

        case DELETE_IMAGE:
          return {
            ...state,
            images: action.payload.data.products,
          };
        case UPLOADER_MULTIPPLE_POST_IMAGES:
          return {
            ...state,
            postImage: action.payload,
          }
      default:
        return state
    }
  
  
  }