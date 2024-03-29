

const initialState = {
  user: {
    id: "",
    perfils_id: "",
    nome: "",
    razao_social :"",
    email: ''
  },
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,       
        user: action.data,
      };
     
    default:
      return state;
  }
};