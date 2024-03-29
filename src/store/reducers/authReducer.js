import { actionTypes } from '../actions/auth.actions';
import initialState from './initialState';


const authReducer = (state = initialState.auth, action) => {
    switch (action.type) {
        case actionTypes.CHANGE:
            return {
                ...state,
                credentials: {
                    ...state.credentials,
                    ...action.payload
                }
            }
        case actionTypes.GET_TOKEN:
            return { ...state, token: action.token };

        case actionTypes.SUCCESS:
            return { ...state, success: action };

        case actionTypes.SET_USER:
            return { ...state, user: action.user };

        case actionTypes.LOGOUT:
            return {
                ...state,
                token: null,
                user: null,
            };

        default:
            return state;
    }
}
export default authReducer;