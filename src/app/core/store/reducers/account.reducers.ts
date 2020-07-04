import { initialAccountState } from "../state/account.state";
import { AccountActions, EAccountActions } from "../actions/account.actions";
import { IAccountState } from "../../models/IAccountState";

export const accountReducers = (
  state: IAccountState = initialAccountState,
    action: AccountActions
): IAccountState => {
  switch(action.type) {
    case EAccountActions.SetLanguage: {
      return {
        ...state,
        lang: action.payload
      };
    }
    default:
      return state;
  }
}
