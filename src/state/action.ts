import { Dispatch } from "react"
import { IActionLogin } from "./reducers/login.reducer"


export const setUserLoggedIn = (isLoggedIn: boolean) => {
  return ((dispatch: Dispatch<IActionLogin>) => {
    return dispatch({
      type: 'isLoggedIn',
      payload: isLoggedIn
    });
  })
}