import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AccountsModule} from "./accounts/accounts.module";
import {CategoriesModule} from "./categories/categories.module";
import {TransactionsModule} from "./transactions/transactions.module";

const routes: Routes = [
  {path: '', redirectTo: 'accounts', pathMatch: 'full'},
  {path: 'accounts', loadChildren: './accounts/accounts.module#AccountsModule'},
  {path: 'categories', loadChildren: './categories/categories.module#CategoriesModule'},
  {path: 'transactions', loadChildren: './transactions/transactions.module#TransactionsModule'},
];

@NgModule({
  declarations: [],
  imports: [
    AccountsModule,
    CategoriesModule,
    TransactionsModule,
    RouterModule.forChild(routes),
  ]
})
export class HomeModule {
}
