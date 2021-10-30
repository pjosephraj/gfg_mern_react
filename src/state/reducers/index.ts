import {combineReducers} from 'redux';
import { loginReducer } from './login.reducer';

export const reducers = combineReducers({
	isLoggedIn: loginReducer
});

