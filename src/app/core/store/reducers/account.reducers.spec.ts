import { initialAccountState } from '../state/account.state';
import { accountReducers } from './account.reducers';
import {
  SetLanguage,
  SetLanguageFromStorage,
  SetUserName,
  ClearUserName
} from '../actions/account.actions';

describe('AccountReducers', () => {
  const initialState = { ...initialAccountState };

  it('should set the language', () => {
    const payload = 'test';
    const action = new SetLanguage(payload);
    const state = accountReducers(initialState, action);

    expect(state.lang).toBe(payload);
  });

  it('should set the language from storage', () => {
    const payload = 'test';
    const action = new SetLanguageFromStorage(payload);
    const state = accountReducers(initialState, action);

    expect(state.lang).toBe(payload);
  });

  it('should set the user name', () => {
    const payload = 'test';
    const action = new SetUserName(payload);
    const state = accountReducers(initialState, action);

    expect(state.userName).toBe(payload);
  });

  it('should clear the user name', () => {
    const action = new ClearUserName();
    const state = accountReducers(initialState, action);

    expect(state.userName).toBe(state.userName);
  });
});
