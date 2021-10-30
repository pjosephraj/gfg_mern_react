export interface IActionLogin {
  type: string; payload: boolean
}

export const loginReducer = (state = false, action: IActionLogin) => {
  switch (action.type) {
    case 'isLoggedIn':
      return action.payload;
    default:
      return false;
  }
}