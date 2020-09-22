import { initialAccountState } from '../state/account.state';
import { SetLanguage } from '../actions/account.actions';

describe('AccountReducers', () => {
  const state = { ...initialAccountState };

  xit('should set language', () => {
    const expected = 'ru';
    const action = new SetLanguage(expected);

    expect(state.lang).toBe(expected);
  });
});
