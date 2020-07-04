import { Action } from "@ngrx/store";

export enum EAccountActions {
  SetLanguage = '[Account] Set Language'
}

export class SetLanguage implements Action {
  public readonly type = EAccountActions.SetLanguage
  constructor(public payload: string) {}
}

export type AccountActions = SetLanguage;
