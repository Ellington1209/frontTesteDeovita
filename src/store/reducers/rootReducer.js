import { combineReducers } from "redux";
import loadingReducer from "./loading.reducer";
import notifyReducer from "./notify.reducer";
import alertReducer from "./alert.reducer";
import consultationReducer from "./consultation.reducer";

const rootReducer = combineReducers({
  loadingReducer,
  notifyReducer,
  alertReducer,
  consultationReducer,
});

export default rootReducer;
