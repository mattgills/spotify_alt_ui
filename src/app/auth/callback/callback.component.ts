import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  loginError: string;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.fragment
      .pipe(
        map(fragment => new URLSearchParams(fragment)),
        map(params => {
          return {
            token: params.get('access_token'),
            tokenType: params.get('token_type'),
            expirationDate: new Date(new Date().getTime() + (+params.get('expires_in') * 1000))
          }
        })
      )
      .subscribe(authData => {
        this.store
          .dispatch(
            new AuthActions.AuthenticateSuccess({
              token: authData.token,
              tokenType: authData.tokenType,
              expirationDate: authData.expirationDate
            })
          )
      });
  }

}
