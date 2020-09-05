import { Action } from '@ngrx/store';

export enum EAccountActions {
  SetLanguage = '[Account] Set language',
  SetLanguageFromStorage = '[Account] Set language from storage',
  GetUserName = '[Account] Get User name',
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

export class GetUserName implements Action {
  public readonly type = EAccountActions.GetUserName;
  constructor(public payload: string) {}
}

export class ClearUserName implements Action {
  public readonly type = EAccountActions.ClearUserName;
}

export type AccountActions =
  SetLanguage |
  SetLanguageFromStorage |
  GetUserName |
  ClearUserName;
