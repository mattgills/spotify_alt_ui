import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  // authSub: Subscription;
  // isLoading: boolean = false;
  // error: string = null;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    // this.authSub = this.store.select('auth').subscribe(authState => {
    //   this.isLoading = authState.loading;
    //   this.error = authState.authError;
    //   //if (this.error) this.showErrorAlert(this.error);
    // });
    this.store.dispatch(new AuthActions.AutoLogin());    
  }
}
