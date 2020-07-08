import { initialAccountState } from "../state/account.state";
import { AccountActions, EAccountActions } from "../actions/account.actions";
import * as fromModels from '../../models';

export const accountReducers = (
  state: fromModels.IAccountState = initialAccountState,
  action: AccountActions
): fromModels.IAccountState => {
  switch(action.type) {
    case EAccountActions.SetLanguage: {
      return { ...state, lang: action.payload };
    }
    default:
      return state;
  }
}
