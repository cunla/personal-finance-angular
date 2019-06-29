import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountsListComponent} from "./list/accounts-list.component";
import {NewAccountComponent} from "./new-account/new-account.component";
import {AccountDetailsComponent} from "./account-details/account-details.component";
import {RouterModule, Routes} from "@angular/router";
import {EditAccountResolver} from "./account-details/edit-account-resolver.service";
import {MatButtonModule, MatDialogModule, MatInputModule, MatSliderModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AccountsService} from "./accounts.service";
import {ComponentsModule} from "../components/components.module";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: AccountsListComponent},
  {path: 'new-account', component: NewAccountComponent},
  {path: 'details/:id', component: AccountDetailsComponent, resolve: {data: EditAccountResolver}}
];

@NgModule({
  declarations: [
    AccountsListComponent,
    NewAccountComponent,
    AccountDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    FontAwesomeModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    EditAccountResolver,
    AccountsService,
  ],
})
export class AccountsModule {
}
