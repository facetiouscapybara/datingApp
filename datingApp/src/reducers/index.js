import { combineReducers } from 'redux';
import UsersReducer from 'reducerUsers';

const rootReducer = combineReducers({
	users: UsersReducer
})

export default rootReducer;