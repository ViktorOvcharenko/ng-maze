import { initialAccountState } from '../state/account.state';
import { initialAppState } from '../state/app.state';
import { getAccountLang, getUserName } from './account.selectors';

describe('AccountSelectors', () => {
  const appState = { ...initialAppState };
  const initialState = { ...initialAccountState };

  it('should get the lang', () => {
    expect(getAccountLang(appState)).toBe(initialState.lang);
  });

  it('should get the userName', () => {
    expect(getUserName(appState)).toBe(initialState.userName);
  });
});
