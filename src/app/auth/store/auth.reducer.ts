import * as AuthActions from './auth.actions';

export interface State {
    authData: {
        token: string;
        tokenType: string;
        expirationDate: Date;
    };
    authError: string;
    loading: boolean;
}

const initialState = {
    authData: null,
    authError: null,
    loading: false
}

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.LOGIN_START:
            return {
                ...state,
                authError: null,
                loading: true
            }
        case AuthActions.AUTHENTICATE_SUCCESS:
            return {
                ...state,
                authData: { ...action.payload },
                authError: null,
                loading: false
            }
        default:
            return state;
    }
}