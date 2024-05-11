import { Http } from "../../api";
import { changeloading } from "./loading.action";
import { changeNotify } from "./notify.actions";

export const actionTypes = {
  GET_TOKEN: "GET_TOKEN",
  SET_USER: "SET_USER",
  LOGOUT: "LOGOUT",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  CHANGE: "CHANGE",
};

export const getToken = (token) => ({
  type: actionTypes.GET_TOKEN,
  token,
});
export const setUser = (user) => ({
  type: actionTypes.SET_USER,
  user,
});

export const removeToken = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({
    type: actionTypes.LOGOUT,
  });
};

export const loginSuccess = (bool) => ({
  type: actionTypes.SUCCESS,
  bool,
});
export const loginError = (error) => ({
  type: actionTypes.ERROR,
  error,
});
export const changeValue = (payload) => ({
  type: actionTypes.CHANGE,
  payload,
});
export const loading = (bool, msg = null) => ({
  type: actionTypes.LOADING,
  isLoading: {
    active: bool,
    msg: msg,
  },
});
export const getUserToken = () => (dispatch) => {
  dispatch(loading(true));
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // Adiciona esta linha
  dispatch(loading(false));

  if (token) {
    dispatch(getToken(token));
  }

  if (user) {
    dispatch(setUser(user));
  }
};
export const showWelcomeMessage = () => {
  return {
    type: "SHOW_WELCOME_MESSAGE",
    message: "Bem-vindo!",
  };
};

export const setUserToken = (token, user) => (dispatch) => {
  localStorage.setItem("token", token);

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(setUser(user));
  }

  dispatch(loading(false));
  dispatch(loginSuccess(true));
};

export const login = (credentials) => {
  return (dispatch) => {
    dispatch(changeloading({ open: true, msg: "Autenticando usuário..." }));

    return Http.post("/login", {
      name_user: credentials.name_user,
      password: credentials.password,
    })
      .then((res) => {
        dispatch(changeloading({ open: false, msg: "Autenticando ..." }));
        if (typeof res !== "undefined") {
          dispatch(setUserToken(res.data.token, res.data.user));
        }
        dispatch(
          changeNotify({
            open: true,
            class: "success",
            msg: "Seja Bem Vindo.",
          })
        );
      })
      .catch((error) => {
        dispatch(changeloading({ open: false }));
        if (error.response && error.response.status) {
          if (error.response.status === 401 || error.response.status === 400) {
            dispatch(
              changeNotify({
                open: true,
                class: "error",
                msg: "Erro de autenticação. Email ou senha invalidos .",
              })
            );
          } else if (error.response.status === 500) {
            dispatch(
              changeNotify({
                open: true,
                class: "error",
                msg: "Erro interno do servidor. Tente novamente mais tarde.",
              })
            );
          } else {
            dispatch(
              changeNotify({
                open: true,
                class: "error",
                msg: `Erro: ${error.message}`,
              })
            );
          }
        } else {
          dispatch(
            changeNotify({
              open: true,
              class: "error",
              msg: "Erro ao se conectar ao servidor. Verifique sua conexão com a internet.",
            })
          );
        }
      });
  };
};
