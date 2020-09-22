import { Action } from '@ngrx/store';

export enum EAccountActions {
  SetLanguage = '[Account] Set language',
  SetLanguageFromStorage = '[Account] Set language from storage',
  SetUserName = '[Account] Set User name',
  ClearUserName = '[Account] Clear User name',
}

export class SetLanguage implements Action {
  public readonly type = EAccountActions.SetLanguage;
  constructor(public payload: string) {}
}

export class SetLanguageFromStorage implements Action {
  public readonly type = EAccountActions.SetLanguageFromStorage;
  constructor(public payload: string) {}
}

export class SetUserName implements Action {
  public readonly type = EAccountActions.SetUserName;
  constructor(public payload: string) {}
}

export class ClearUserName implements Action {
  public readonly type = EAccountActions.ClearUserName;
}

export type AccountActions =
  SetLanguage |
  SetLanguageFromStorage |
  SetUserName |
  ClearUserName;
