import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CategoryDetailsComponent} from './category-details/category-details.component';
import {CategoryListComponent} from './list/category-list.component';
import {ComponentsModule} from "../components/components.module";
import {CategoryResolver} from "./category-details/category-resolver.service";
import {CategoryService} from "./categories.service";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatButtonModule, MatDialogModule, MatInputModule, MatSelectModule, MatSliderModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: CategoryListComponent},
  {path: 'new-category', component: CategoryDetailsComponent, resolve: {data: CategoryResolver}},
  {path: 'details/:id', component: CategoryDetailsComponent, resolve: {data: CategoryResolver}}
];

@NgModule({
  declarations: [
    CategoryDetailsComponent,
    CategoryListComponent,
  ],
  imports: [
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
  ],
  providers: [
    CategoryService,
    CategoryResolver,
  ]
})
export class CategoriesModule {
}
