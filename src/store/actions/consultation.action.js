export const actionTypes = {
  CHANGE_SET_ID_CONSULTATION: "SET_ID_CONSULTATION",
};
export const changeIdConsultation = (idConsultation) => {
  return {
    type: actionTypes.CHANGE_SET_ID_CONSULTATION,
    payload: { idConsultation },
  };
};
