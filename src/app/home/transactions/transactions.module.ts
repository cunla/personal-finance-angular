import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransactionsListComponent} from './list/transactions-list.component';
import {TransactionDetailsComponent} from './details/transaction-details.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {ComponentsModule} from "../components/components.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSliderModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {TransactionsService} from "./transactions.service";
import {TransactionResolver} from "./details/transaction-resolver.service";

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: TransactionsListComponent},
  {path: 'new-transaction', component: TransactionDetailsComponent, resolve: {data: TransactionResolver}},
  {path: 'details/:id', component: TransactionDetailsComponent, resolve: {data: TransactionResolver}}
];

@NgModule({
  declarations: [
    TransactionsListComponent,
    TransactionDetailsComponent,
  ],
  imports: [
    InfiniteScrollModule,
    CommonModule,
    ComponentsModule,
    FontAwesomeModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    TransactionsService,
    TransactionResolver,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ]
})
export class TransactionsModule {
}
