import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { CallbackComponent } from './callback/callback.component';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [
        AuthComponent,
        CallbackComponent
    ],
    imports: [
        AuthRoutingModule
    ]
})
export class AuthModule {}