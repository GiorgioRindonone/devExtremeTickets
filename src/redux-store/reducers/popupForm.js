import React from 'react'



//! creo la ref del Form per poterlo usare nel reducer

export const formRefSide = React.createRef();

export const getFormSide = () => {
  return formRef.current.instance;
};


export const formRef = React.createRef();

export const getForm = () => {
  return formRef.current.instance;
};

//! oggetto con stato iniziale del reducer del popup
export const initPopupState = {
  formData: {},
  popupVisible: false,
  popupMode: ""
};

//! funzione reducer del popup 
export function popupReducer(state, action) {
  //? gli passo action come argomento perchè poi nello switch lui lo usa e sa cosa fare
  switch (action.type) {
    case "openGridPopup":
      return {
        ...state,
        popupVisible: true,
      };
    case "updateFormData":
      return {
        ...state, 
        formData: action.data //update form data
      };
    case "initPopup":
      return {
        formData: action.data,
        popupVisible: true,
        popupMode: action.popupMode
      };
    case "hidePopup":
      return {
        popupVisible: false
      };
    default:
      break;
  }
};
