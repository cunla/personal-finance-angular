import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {RouterModule} from '@angular/router';
import {rootRouterConfig} from './app.routes';

import {AppComponent} from './app.component';
import {AvatarDialogComponent} from './home/accounts/avatar-dialog/avatar-dialog.component';
import {EditAccountComponent} from './home/accounts/edit-account/edit-account.component';
import {EditUserResolver} from './home/accounts/edit-account/edit-user.resolver';
import {NewAccountComponent} from './home/accounts/new-account/new-account.component';
import {AccountsListComponent} from './home/accounts/list/accounts-list.component';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {FirebaseService} from './services/firebase.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatDialogModule, MatInputModule, MatSliderModule} from '@angular/material';
import {AuthModule} from "./auth/auth.module";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {HomeModule} from "./home/home.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [AvatarDialogComponent],
  imports: [
    HomeModule,
    AuthModule,
    BrowserModule,
    RouterModule.forRoot(rootRouterConfig, {useHash: false}),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
  ],
  providers: [FirebaseService, EditUserResolver],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {
}
