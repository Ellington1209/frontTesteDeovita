import { actionTypes } from "../actions/consultation.action";

const initialState = {
  idConsultation: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SET_ID_CONSULTATION:
      return {
        ...state,
        idConsultation: action.payload.idConsultation,
      };
    default:
      return state;
  }
};
