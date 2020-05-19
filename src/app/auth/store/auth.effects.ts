import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthEffects {
    @Effect({dispatch: false})
    authLoginStart = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        tap(() => {
            console.log(this.spotifyUrl)
            window.open(this.spotifyUrl, '_self')
        })
    )

    @Effect()
    authAutoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            console.log('hi')
            const spotifyAuthData: {
                token: string,
                tokenType: string,
                tokenExpirationDate: string
            } = JSON.parse(localStorage.getItem('spotifyAuthData'));
    
            if (!spotifyAuthData) {
                return new AuthActions.LoginStart();
            }
    
            if (spotifyAuthData.token) {
                const expirationDuration = new Date(spotifyAuthData.tokenExpirationDate).getTime() - new Date().getTime();
                // this.authService.setLogoutTimer(expirationDuration);
                return new AuthActions.AuthenticateSuccess({
                    token: spotifyAuthData.token,
                    tokenType: spotifyAuthData.tokenType,
                    expirationDate: new Date(spotifyAuthData.tokenExpirationDate),
                })
            }
            return new AuthActions.LoginStart();
        })
    )

    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
            // if (authSuccessAction.payload.redirect) {
            //     this.router.navigate(['/']);
            // }
            console.log(authSuccessAction)
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient
    ) {}

    private scopes: string = 'user-read-private user-read-email';
    private spotifyUrl = 'https://accounts.spotify.com/authorize' +
        '?response_type=token' +
        '&client_id=' + environment.SPOTIFY_CLIENT_ID +
        (this.scopes ? '&scope=' + encodeURIComponent(this.scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(environment.SPOTIFY_REDIRECT_URL);
}