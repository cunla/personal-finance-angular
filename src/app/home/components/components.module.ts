import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IconPickerComponent} from "./icon-picker/icon-picker.component";
import {MatButtonModule, MatDialogModule, MatInputModule, MatSelectModule, MatSliderModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from "@fortawesome/free-brands-svg-icons";
import {ColorPickerModule} from "ngx-color-picker";

@NgModule({
  declarations: [
    IconPickerComponent,
  ],
  exports: [
    IconPickerComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    ColorPickerModule,
  ]
})
export class ComponentsModule {
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(fas, far, fab);
  }
}
