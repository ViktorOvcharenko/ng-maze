import { Action } from '@ngrx/store';

export enum EAccountActions {
  SetLanguage = '[Account] Set language',
  SetStorageLanguage = '[Account] Set storage language',
  GetUserName = '[Account] Get User name',
  ClearUserName = '[Account] Clear User name',
}

export class SetLanguage implements Action {
  public readonly type = EAccountActions.SetLanguage;
  constructor(public payload: string) {}
}

export class SetStorageLanguage implements Action {
  public readonly type = EAccountActions.SetStorageLanguage;
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
  SetStorageLanguage |
  GetUserName |
  ClearUserName;
