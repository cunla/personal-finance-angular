import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountsListComponent} from "./list/accounts-list.component";
import {NewAccountComponent} from "./new-account/new-account.component";
import {EditAccountComponent} from "./edit-account/edit-account.component";
import {RouterModule, Routes} from "@angular/router";
import {EditUserResolver} from "./edit-account/edit-user.resolver";
import {AvatarDialogComponent} from "./avatar-dialog/avatar-dialog.component";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {MatButtonModule, MatDialogModule, MatInputModule, MatSliderModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: AccountsListComponent},
  {path: 'new-account', component: NewAccountComponent},
  {path: 'details/:id', component: EditAccountComponent, resolve: {data: EditUserResolver}}
];
@NgModule({
  declarations: [
    AccountsListComponent,
    NewAccountComponent,
    EditAccountComponent,
    AvatarDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularFontAwesomeModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AccountsModule {
}
