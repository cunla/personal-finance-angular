import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountsListComponent} from "./list/accounts-list.component";
import {NewAccountComponent} from "./new-account/new-account.component";
import {EditAccountComponent} from "./edit-account/edit-account.component";
import {RouterModule, Routes} from "@angular/router";
import {EditAccountResolver} from "./edit-account/edit-account-resolver.service";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {MatButtonModule, MatDialogModule, MatInputModule, MatSelectModule, MatSliderModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AccountsService} from "./accounts.service";
import {ComponentsModule} from "../components/components.module";

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: AccountsListComponent},
  {path: 'new-account', component: NewAccountComponent},
  {path: 'details/:id', component: EditAccountComponent, resolve: {data: EditAccountResolver}}
];

@NgModule({
  declarations: [
    AccountsListComponent,
    NewAccountComponent,
    EditAccountComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    AngularFontAwesomeModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  providers: [
    EditAccountResolver,
    AccountsService,
  ],
})
export class AccountsModule {
}
