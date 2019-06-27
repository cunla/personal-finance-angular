import {Routes} from '@angular/router';
import {AccountsListComponent} from './home/accounts/list/accounts-list.component';
import {NewAccountComponent} from './home/accounts/new-account/new-account.component';
import {EditAccountComponent} from './home/accounts/edit-account/edit-account.component';
import {EditUserResolver} from './home/accounts/edit-account/edit-user.resolver';

export const rootRouterConfig: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {path: 'home', loadChildren: './home/home.module#HomeModule'},
];
