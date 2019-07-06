import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AccountsModule} from "./accounts/accounts.module";
import {CategoriesModule} from "./categories/categories.module";

const routes: Routes = [
  {path: '', redirectTo: 'accounts', pathMatch: 'full'},
  {path: 'accounts', loadChildren: './accounts/accounts.module#AccountsModule'},
  {path: 'categories', loadChildren: './categories/categories.module#CategoriesModule'},

];

@NgModule({
  declarations: [],
  imports: [
    AccountsModule,
    CategoriesModule,
    RouterModule.forChild(routes),
  ]
})
export class HomeModule {
}
