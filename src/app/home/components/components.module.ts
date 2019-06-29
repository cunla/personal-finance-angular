import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IconPickerComponent} from "./icon-picker/icon-picker.component";
import {MatButtonModule, MatDialogModule, MatInputModule, MatSelectModule, MatSliderModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularFontAwesomeModule} from "angular-font-awesome";

@NgModule({
  declarations: [
    IconPickerComponent,
  ],
  exports: [
    IconPickerComponent
  ],
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ]
})
export class ComponentsModule { }
