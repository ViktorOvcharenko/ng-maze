import { initialAppState } from '../state/app.state';
import { initialAccountState } from '../state/account.state';
import { getAccountLang, getUserName } from './account.selectors';

describe('AccountSelectors', () => {
  const initialState = { ...initialAccountState };
  const appState = { ...initialAppState };

  it('should get the lang', () => {
    expect(getAccountLang(appState)).toBe(initialState.lang);
  });

  it('should get the userName', () => {
    expect(getUserName(appState)).toBe(initialState.lang);
  });
});
