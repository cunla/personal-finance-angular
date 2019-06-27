import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AccountsModule} from "./accounts/accounts.module";

const routes: Routes = [
  {path: '', redirectTo: 'accounts', pathMatch: 'full'},
  {path: 'accounts', loadChildren: './accounts/accounts.module#AccountsModule'},

];

@NgModule({
  declarations: [],
  imports: [
    AccountsModule,
    RouterModule.forChild(routes),
  ]
})
export class HomeModule {
}
