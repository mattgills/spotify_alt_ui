import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';

export class LoginStart implements Action {
    readonly type = LOGIN_START;

    //constructor(public payload: string) {}  // payload will be state string (security param)
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export class AuthenticateSuccess implements Action {
    readonly type = AUTHENTICATE_SUCCESS;

    constructor(
        public payload: {
            token: string;
            tokenType: string;
            expirationDate: Date;
        }
    ) {}
}

export type AuthActions =
    | LoginStart
    | AutoLogin
    | AuthenticateSuccess